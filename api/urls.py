from django.urls import path, include

urlpatterns = [
    path('articles/', include('articles.urls')),
    path('', include('accounts.urls')),
]