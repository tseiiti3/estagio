from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [ "id", "username", "password", "email", "first_name", "last_name", "groups" ]
    extra_kwargs = { "password": { "write_only": True }, "groups": { "read_only": True } }

  # def create(self, validated_data):
  #   user = User.objects.create_user(**validated_data)
  #   group = Group.objects.filter(name="Guest").first()
  #   if group: user.groups.add(group)
  #     # user.save()
  #   print("*****************")
  #   return user

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user