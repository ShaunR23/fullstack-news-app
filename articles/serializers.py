from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ArticleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ArticleAdminSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source = 'author.username')
    class Meta:
        model = Article
        fields = '__all__'

