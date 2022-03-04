# Generated by Django 3.2.12 on 2022-03-02 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0003_auto_20220302_1945'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='phase',
            field=models.CharField(choices=[('DRAFT', 'Draft'), ('SUBMITTED', 'Submitted'), ('REJECTED', 'Rejected'), ('PUBLISHED', 'Published'), ('ARCHIVED', 'Archived')], default='DRAFT', max_length=10),
        ),
    ]
