from django.urls import path
from . import views

urlpatterns = [
    path('articles/<int:pk>/admin/', views.ArticleApproveChangeAPIView.as_view()),
    path('admin/', views.ArticleApproveListAPIView.as_view()),
    # PUT and DELETE request for authenticated user
    path('user/articles/<int:pk>/', views.UserArticleDetailAPIView.as_view(), name="article_detail"),
    # POST request for authenticated user
    path('user/articles/', views.UserArticleListAPIView.as_view(), name="user_article_list"),
    path('articles/', views.ArticleListAPIView.as_view(), name="article_list"),
]
