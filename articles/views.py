from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from .models import Article
from .serializers import ArticleSerializer, ArticleAuthorSerializer, ArticleAdminSerializer
from rest_framework import generics
from .permissions import IsAuthorOrReadOnly


class ArticleListAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Article.objects.all() 

class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = ArticleAuthorSerializer

    def get_queryset(self):
        user = self.request.user

        return Article.objects.filter(author=user)
class ArticleApproveListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = ArticleAdminSerializer
    queryset = Article.objects.all()
   
class ArticleApproveChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = ArticleAdminSerializer
    queryset = Article.objects.all()

class ArticleAuthorListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = ArticleAuthorSerializer
    def get_queryset(self):
       
        user = self.request.user
        return Article.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
   