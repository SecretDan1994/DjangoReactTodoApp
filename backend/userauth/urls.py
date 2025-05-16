from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"signup", views.UserApiView, basename="signup")

urlpatterns = [
    # Authentication
    path('', include(router.urls), name="userauth"),
]
