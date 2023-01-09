from rest_framework import serializers
from .models import Movie, Directors, Genre
from datetime import datetime, date
from django.core.exceptions import ValidationError

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"
    def to_representation(self, obj):
        data = super().to_representation(obj)
        data["genre"]= [Genre.objects.get(pk=id).name for id in data['genre']]
        data["director"]= Directors.objects.get(pk=data["director"]).name
        return data
    def to_internal_value(self, data):
        try: 
            releasedd= datetime.strptime(data["released"].replace(",",""),"%d %b %Y")
            releasedd = releasedd.date()
            data["released"] = releasedd
            print(data["released"])
        except ValueError:
            print(data["title"])
            print(data["released"])
            data['released'] = None
            print("fuck")
        return super().to_internal_value(data)

class DirectorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directors
        fields ="__all__"

class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model= Genre
        fields ="__all__"