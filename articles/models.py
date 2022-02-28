from django.db import models
from django.conf import settings


class Article(models.Model):

    PHASES = (
        ('DRAFT', 'Draft'),
        ('SUBMITTED', 'Submitted'),
        ('REJECTED', 'Rejected'),
        ('PUBLISHED', 'Published'),
        ('ARCHIVED', 'Archived'),
    )

    CATEGORY = (
        ('SPORTS', 'Sports'),
        ('GAMING', 'Gaming'),
        ('ALL', 'All'),
    )



    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    summary = models.CharField(max_length=255, blank=True)
    phase = models.CharField(max_length=10, choices=PHASES, default='DRAFT'),
    category = models.CharField(max_length=10, choices=CATEGORY, default='ALL'),

    
    def __str__(self):
        return self.title




