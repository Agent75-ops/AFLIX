from rest_framework.response import Response
from rest_framework import viewsets,status
from django.views.decorators.csrf import csrf_exempt
from .models import User
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import login,logout,authenticate

class UserViewSet(viewsets.ViewSet):
    def list(self, request):
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
            login(request,user)
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
