from django.urls import path,include
from .views import UserViewSet, LoginViewSet,LogoutViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users',UserViewSet, basename="users")
router.register(r'login', LoginViewSet, basename="login")
router.register(r'logout', LogoutViewSet, basename="logout")
urlpatterns =[
    path('', include(router.urls)),
]