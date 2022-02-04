from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=120,unique = True)
    email = models.EmailField(unique = True, null = False)
    password = models.CharField(max_length=100, null = False)
    account_type = models.IntegerField(max=True)

    def __str__(self):
        return f'{self.username}, {self.email}, {self.password}, {self.account_type}'


class Competition(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=500)
    units = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    type_of_competition = models.IntegerField(max=2)
    end_date = models.DateField(null=False)
    host_id = models.ForeignKey(User.id)
    completed = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.name}, {self.description}, {self.units}, {self.frequency}, {self.type_of_competition}, {self.end_date}, {self.host_id}, {self.completed}'

class Score(models.Model):
    competition_id = models.ForeignKeyField(Competition.id)
    user_id = models.ForeignKey(User.host_id)
    score = models.IntegerField(max_length=100)
    last_updated = models.DateField()

    def __str__(self):
        return f'{self.competition_id}, {self.user_id}, {self.score}'
