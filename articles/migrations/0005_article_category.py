# Generated by Django 3.2.12 on 2022-03-02 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_article_phase'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.CharField(choices=[('SPORTS', 'Sports'), ('GAMING', 'Gaming'), ('ALL', 'All')], default='ALL', max_length=10),
        ),
    ]
