from django.urls import path
from .views import CreateUserView, UserView

urlpatterns = [
  path("", CreateUserView.as_view(), name="create"), 
  path("<int:pk>/", UserView.as_view(), name="teste"), 
]
