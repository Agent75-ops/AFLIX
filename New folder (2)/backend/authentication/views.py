from rest_framework.response import Response
from rest_framework import viewsets,status
from django.views.decorators.csrf import csrf_exempt
from .models import User
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated
class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        print(request.user)
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many =True)
        return Response(serializer.data)

    def create(self ,request):
        new_user = request.data
        if User.objects.filter(email = new_user['email']).exists():
            return Response("Email already used", status=status.HTTP_403_FORBIDDEN)
        user =User.objects.create_user(username = new_user["username"], email=new_user["email"], password = new_user["password"])
        token = Token.objects.create(user = user)
        print(token)
        authuser = authenticate(email = new_user['email'], password =new_user['password'])
        if authuser is not None :
            return Response({"user" : UserSerializer(user).data, "token" : token.key}, status=status.HTTP_201_CREATED)
        else : 
            return Response("Can't register , check your credentials !", status = status.HTTP_400_BAD_REQUEST)


    def retrieve(self, request, pk =None):
        try :
            user = User.objects.get(pk = pk)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except :
            return Response("Not Found" , status= status.HTTP_404_NOT_FOUND)


class LoginViewSet(viewsets.ViewSet):
    def create(self , request):
        email = request.data["email"]
        password = request.data["password"]
        try :
            user = User.objects.get(email = email)
        except :
            return Response("Wrong email or password !", status= status.HTTP_404_NOT_FOUND)
        if not check_password(password, user.password) :
            return Response("Wrong email or password !", status= status.HTTP_404_NOT_FOUND)
        token = Token.objects.get_or_create(user = user)[0]
        print(token)
        print(UserSerializer(user).data)
        print(request.user)
        return Response({"user" :UserSerializer(user).data, "token" : token.key},status=status.HTTP_302_FOUND)

class LogoutViewSet(viewsets.ViewSet):
    permission_classes =[IsAuthenticated]
    
    def create(self, request):
        print(request.user)
        print(request.user.auth_token)
        request.user.auth_token.delete()
        return Response("user logged out")