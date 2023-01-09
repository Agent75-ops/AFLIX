from django.urls import path
from .views import *

urlpatterns =[
    path("", MoviesView.as_view(), name="index"),
    path("trending/", TrendingView.as_view(), name="trendingMoives"),
    path("latest/", LatestView.as_view(), name="latestMovies"),
    path("upcoming/", UpcomingView.as_view(), name="upcomingMovies"),
    path("moviecollection/", allMovies.as_view(),name="moviesCollection")
]