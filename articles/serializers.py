from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Article
        exclude = ('phase', 'author')


class UserArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Article
        exclude = ('author',)


class ArticleAdminSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Article
        fields = '__all__'
