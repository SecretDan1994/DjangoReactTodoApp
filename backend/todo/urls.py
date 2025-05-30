from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"todo-list", views.TodoViewSet, basename="todo-list")

urlpatterns = [
    path("", include(router.urls), name="todo"),
]