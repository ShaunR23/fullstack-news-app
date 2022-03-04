from unicodedata import category
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Article
from .serializers import ArticleSerializer
from django.urls import reverse
import json

from rest_framework import status

client = Client()

client.login(username='admin', password='safepass1')

class ArticleTestModels(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="shaun",
            email="shaun@example.com",
            password="safepass123",
        )

        Article.objects.create(
            category="Article category",
            author=user,
            title='Article title',
            body='Article Body',
            image='Article image',
            summary="Article summary",
            phase = "Article phase",
        )

    def setUp(self):
        User = get_user_model()
        user2 = User.objects.create_user(
            username="charlie",
            email="shaun@example.com",
            password="safepass123",
        )

        Article.objects.create(
            category="Article category",
            author=user2,
            title='Article title',
            body='Article body',
            image='Article image',
            summary="Article summary",
            phase = "Article phase",
        )

    def test_article_content(self):
        article = Article.objects.get(id=1)
        author = f'{article.author}'
        title = f'{article.title}'
        body = f'{article.body}'

        self.assertEqual(author, 'charlie')
        self.assertEqual(title, 'Article title')
        self.assertEqual(body, 'Article body')

    def test_get_all_articles(self):
        
        response = client.get(reverse('user_article_list'))
        articles = Article.objects.filter('PUBLISHED')
        serializer = ArticleSerializer(articles, many=True)

        self.assertEqual(response.data, serializer.data)

    def test_get_invalid_article(self):
        response = client.get('article_detail', kwargs={'pk': 400})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateNewArticleTest(TestCase):
    def setUp(self):
        self.valid_payload = {
            'author': 'client',
            'body': 'Article body',
            'title': 'Article title',
            'category': 'Article category',
            'summary': 'Article summary',
            'image': 'Article image',
            'phase' : 'Article phase',

        }

        self.invalid_payload = {
            'phase': False
        }

    def test_create_valid_article(self):
        response = client.post(
            reverse('user_article_list'),
            data=json.dumps(self.valid_payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
