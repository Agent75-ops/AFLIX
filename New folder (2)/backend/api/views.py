from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
import requests
from .serializers import DirectorsSerializer, MoviesSerializer, GenresSerializer
from .models import Directors , Movie, Genre
from django.core.exceptions import ObjectDoesNotExist
import random
from datetime import date
# Create your views here.

def SaveData(Apidata):
    url = f"http://www.omdbapi.com/?apikey=b6661a6a&i={Apidata['id']}"
    omdbCall = requests.get(url).json()
    if omdbCall['Response'] == 'False':
        omdbCall["Director"] ='N/A'
        omdbCall["Runtime"] ='N/A'
        omdbCall["Plot"] ='N/A'
        omdbCall["Runtime"] ='N/A'
        omdbCall["Released"] ='N/A'
  
    if 'crew' in Apidata :
        dir = Apidata["crew"].split(",")[0].replace("(dir.)",'')
    else :
        dir = Apidata["directors"] 

    if dir == None:
        dir = omdbCall["Director"]
    print(dir)
    director, created = Directors.objects.get_or_create(name=dir)
    genreList = []
    if "genres" in Apidata:
        response_genre =  Apidata["genres"].split(", ")
    else:
        try :
            response_genre = omdbCall["Genre"].split(", ")
        except:
            response_genre = []
    for genre in response_genre:
        try :
            Genre.objects.get(name=genre)
        except ObjectDoesNotExist:
            genreList += [{"name":genre}]

    if len(genreList) >0 :
        genres = GenresSerializer(data= genreList,many=True)
        if genres.is_valid():
            genres.save()

    try :
        print(Apidata["title"])
        Movie.objects.get(title = Apidata["title"])
    except :
        genres_ = Genre.objects.filter(name__in =response_genre)
        director = Directors.objects.get(name=dir)
        genres_id = [genre.id for genre in genres_]

        if "metacriticRating" in Apidata :
            meta = Apidata["metacriticRating"]
        else :
            meta = omdbCall["Metascore"]
        if meta == None:
            meta = "N/A"

        print(Apidata)
        if  "plot" not in Apidata or Apidata["plot"] == None:
            plot = omdbCall["Plot"]
        else: 
            plot = Apidata["plot"]
        if len(plot) ==0 :
            plot="N/A"
        if "runtimeMins" not in Apidata or Apidata["runtimeMins"] == None:
            duration= omdbCall["Runtime"]
        else :
            duration = Apidata["runtimeMins"]
        duration= duration.split(' ')[0]
        try:
            int(duration)
        except ValueError:
            duration=0
        if "releaseState" not in Apidata or Apidata["releaseState"] == None:
            released = omdbCall["Released"]
        else :
            released = Apidata["releaseState"]
        print(Apidata)
        if "contentRating" not in Apidata :
            rating = omdbCall["Rated"]
        else:
            rating=Apidata["contentRating"]
        data = {"title":Apidata["title"],"poster":Apidata["image"],"ratings":{"imdb":Apidata["imDbRating"],"metacritics":meta},"plot":plot,"contentRate":rating,"duration":duration,"released":released,"genre":genres_id  ,"director":director.pk}
        
        movieSer = MoviesSerializer(data=data)
        if movieSer.is_valid():
            print("donne")
            movieSer.save()
        else:
            print("errr")
            print(movieSer.errors)
            


class MoviesView(APIView):
    def get(self, request):
            r = requests.get("https://imdb-api.com/en/API/InTheaters/k_3r33snes").json()
            for item in r["items"] :
                SaveData(item)
            try : 
                movies_names= ["Avatar: The Way of Water","Babylon (I)","Strange World","The Fabelmans", 
                                "The Whale","The Menu","Violent Night","The Banshees of Inisherin","Black Panther: Wakanda Forever"]
                movies_set = Movie.objects.filter(title__in=movies_names)
                MoviesSer = MoviesSerializer(movies_set,many=True) 
                return Response(MoviesSer.data,status=status.HTTP_200_OK)
            except : 
                if MoviesSer.is_valid():
                    return Response(MoviesSer.errors,status=status.HTTP_404_NOT_FOUND)


class TrendingView(APIView):
    def get(self, request):
        
        imdburl = "https://imdb-api.com/en/API/MostPopularMovies/k_3r33snes"
        imdbApi = requests.get(imdburl).json()
        if imdbApi['errorMessage'] != '' :
            today = date.today()
            today_date = today.isoformat()
            movies = Movie.objects.all().filter(released__lt=today_date)
            moviess = set()
            try :
                while len(moviess)<13 :
                    moviess.add(movies[random.randrange(0,30)] )
                return Response((MoviesSerializer(moviess,many=True).data,),status=status.HTTP_206_PARTIAL_CONTENT)
            except IndexError: 
                movies = Movie.objects.all()
                return Response(MoviesSerializer(movies,many=True).data,status=status.HTTP_404_NOT_FOUND)
        movies_names = []
        movies_names =[]
        for item in imdbApi["items"] : 
            SaveData(item)
            movies_names +=item["title"]
        try : 
            movies = Movie.objects.filter(title__in = movies_names)
            moviesSet = set()
            while len(moviesSet) < 13 :
                    moviesSet.add(movies[random.randrange(0,len(movies))])
            movieSer= MoviesSerializer(moviesSet, many=True)
            return Response(movieSer.data, status= status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error" : "Not Found"}, status= status.HTTP_404_NOT_FOUND)

class LatestView(APIView):
    def get(self,request):
        try: 
            today = date.today()
            date_string = today.isoformat()
            Movies = MoviesSerializer(Movie.objects.all().order_by("-released").filter(released__lte=date_string)[:13], many=True)
            return Response(Movies.data,status=status.HTTP_200_OK)
        except :
            if Movies.is_valid():
                return Response(Movies.errors, status=status.HTTP_404_NOT_FOUND)

class UpcomingView(APIView):
    def get(self,request):
        try :
            url = "https://imdb-api.com/en/API/ComingSoon/k_3r33snes"
            r = requests.get(url).json()
        except :
            print("failed")
            try :
                today = date.today()
                date_string = today.isoformat()
                print(today)
                Movies = MoviesSerializer(Movie.objects.all().order_by("-released").filter(released__gt=date_string), many=True)
                return Response(Movies.data,status=status.HTTP_200_OK)
            except :
                if Movies.is_valid():
                    return Response(Movies.errors, status=status.HTTP_404_NOT_FOUND)

        for item in r["items"]:
            print(item["releaseState"])
            print("saved")
            SaveData(item)
        try :
            today = date.today()
            print("rot")
            date_string = today.isoformat()
            print(date_string)
            movies_instances = Movie.objects.all().filter(released = None)
            Movies = MoviesSerializer(movies_instances, many=True)
            return Response(Movies.data,status=status.HTTP_200_OK)
        except :
            if Movies.is_valid():
                return Response(Movies.errors, status=status.HTTP_404_NOT_FOUND)

class allMovies(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MoviesSerializer