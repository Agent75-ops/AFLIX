from django.db import models
from authentication.models import User

# omdb key : b6661a6a
#multiple movies to one director , but each movie has a sing
class Directors(models.Model):
    name= models.CharField(max_length=256, null=True,unique=True)
    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=256, unique=True)
    def __str__(self):
        return self.name

class Movie(models.Model) :
    title = models.CharField(max_length=700, blank=False,null=False,unique=True)
    poster = models.URLField()
    ratings = models.JSONField()
    released = models.DateField(max_length=256,null=True)
    genre = models.ManyToManyField(Genre)
    plot = models.TextField()
    contentRate = models.CharField(max_length=256,blank=True,null=True)
    director = models.ForeignKey(Directors, null=True,on_delete=models.SET_NULL,related_name='movies')
    duration = models.IntegerField()
    def __str__(self):
        return self.title +"("+ self.released +")"

class Favorite(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='favorites')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE,related_name='favorites')
    def __str__(self):
        return self.movie +" (Favorite)"
    