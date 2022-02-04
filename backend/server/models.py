from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=120)
    email = models.TextField(email=models.EmailField())
    password = models.CharField(password=models.PasswordField())

    def _str_(self):
        return self.username


class Competition(models.Model):
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    units = models.CharField(max_length=100)
    daily_goal = models.CharField(max_length=100)
    host_id = models.ForeignKey(models.User.host_id)
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.name

class Score(models.Model):
    competition_id = models.ForeignKeyField(Competition.id)
    user_id = models.ForeignKey(User.host_id)
    score = models.IntegerField(max_length=100)

    def _str_(self):
        return self.score
