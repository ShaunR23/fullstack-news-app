from django.urls import path
from .views import ArticleListAPIView, ArticleDetailAPIView

urlpatterns = [
    path('<int:pk>', ArticleDetailAPIView.as_view()),
    path('', ArticleListAPIView.as_view()),
]