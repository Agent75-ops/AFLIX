from django.db import models
from authentication.models import User

# omdb key : b6661a6a

class Directors(models.Model):
    name= models.CharField(max_length=256, null=True)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=256)
    def __str__(self):
        return self.name

class Movie(models.Model) :
    title = models.CharField(max_length=256)
    poster = models.URLField()
    rating = models.DecimalField(max_digits=3,decimal_places=1)
    released = models.CharField(max_length=256)
    genre = models.ManyToManyField(Genre)
    plot = models.TextField()
    rated = models.CharField(max_length=256)
    director = models.ForeignKey(Directors, null=True,on_delete=models.SET_NULL,related_name='director')
    
    def __str__(self):
        return self.title +"("+ self.released +")"

class Favorite(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='favorites')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE,related_name='favorites')
    def __str__(self):
        return self.movie +" (Favorite)"
