from django.contrib import admin
from django.urls import path, include
from user.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
  path('admin/', admin.site.urls),
  path("api/token/", TokenObtainPairView.as_view(), name="token"),
  path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
  path("api/user/", include("user.urls")),
]
