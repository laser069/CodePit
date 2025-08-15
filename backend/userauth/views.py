from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response 
from rest_framework.views import APIView

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        return Response({
            "username":user.username,
            "email":user.email
        })


