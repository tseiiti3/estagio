from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer

from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [ AllowAny ]

class UserView(APIView):
  permission_classes = [ AllowAny ]
  def get(self, request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer_class = UserSerializer(user)
    return Response(serializer_class.data["groups"])