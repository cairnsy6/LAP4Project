# Generated by Django 4.0.2 on 2022-02-07 21:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Competition',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=120, unique=True)),
                ('description', models.CharField(max_length=500)),
                ('units', models.CharField(max_length=100)),
                ('frequency', models.CharField(max_length=100)),
                ('type_of_competition', models.IntegerField()),
                ('end_date', models.DateField()),
                ('completed', models.BooleanField(default=False)),
                ('host_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('score', models.IntegerField()),
                ('last_updated', models.DateField()),
                ('competition_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores', to='api.competition')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['score'],
            },
        ),
    ]