from django.urls import path
from .views import ArticleListAPIView, ArticleDetailAPIView,  ArticleAuthorListAPIView, ArticleApproveListAPIView, ArticleApproveChangeAPIView

urlpatterns = [
    path('articles/<int:pk>/user', ArticleDetailAPIView.as_view()),
    path('articles/<int:pk>/admin/', ArticleApproveChangeAPIView.as_view()),
    path('articles/user/', ArticleAuthorListAPIView.as_view()),
    path('articles/admin/', ArticleApproveListAPIView.as_view()),
    path('', ArticleListAPIView.as_view()),
]