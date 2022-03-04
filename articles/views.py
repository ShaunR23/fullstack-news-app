from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from .models import Article
from .serializers import ArticleSerializer, UserArticleSerializer, ArticleAdminSerializer
from rest_framework import generics
from .permissions import IsAuthorOrReadOnly


class ArticleListAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category:
            return Article.objects.filter(phase='SUBMITTED', category=category)

        return Article.objects.filter(phase='SUBMITTED')


class UserArticleListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserArticleSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category:
            return Article.objects.filter(category=category)

        return Article.objects.filter(author=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserArticleSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category:
            return Article.objects.filter(phase='DRAFT', category=category)

        return Article.objects.filter(author=self.request.user.id)
        # user = self.request.user
        # return Article.objects.filter(author=user)


# code below we have not worked through yet
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
    serializer_class = UserArticleSerializer

    def get_queryset(self):

        user = self.request.user
        return Article.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
