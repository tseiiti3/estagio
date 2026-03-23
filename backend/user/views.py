from django.contrib.auth.models import User, Group
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CreateUserView(APIView):
  permission_classes = [ AllowAny ]

  def post(self, request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    group = Group.objects.filter(name="Guest").first()
    if group: 
      user.groups.add(group)
      user.save()

    return Response(serializer.data, status=status.HTTP_201_CREATED)

class DataView(APIView):
  def get(self, request):
    user = self.request.user
    serializer_class = UserSerializer(user)
    return Response(serializer_class.data)