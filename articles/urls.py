from django.urls import path
from .views import ArticleListAPIView, ArticleDetailAPIView

urlpatterns = [
    path('articles/<int:pk>/user', ArticleDetailAPIView.as_view()),
    path('', ArticleListAPIView.as_view()),
]