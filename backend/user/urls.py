from django.urls import path
from .views import CreateUserView, DataView

urlpatterns = [
  path("register/", CreateUserView.as_view(), name="register"),
  path("data/", DataView.as_view(), name="data"), 
]
