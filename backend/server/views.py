from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, CompetitionSerializer, ScoreSerializer
from .models import User, Competition, Score

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # def create(self):
    #     User.objects.create()
    
    # def delete_user(self): 
    #     User.objects.delete()

def get_all_competitions(request):
    data = request.data
    

        
def create_user(request):
    name = request.body.name
    password = request.body.password
    email = request.body.email
    account_type = request.body.account_type
    user = User(name, password, email, account_type)
    user.save()
    return user

# create_user
# delete_user
# get_all_competitions_for_user
# join_competition
# leave_competition
# update_score
# get_user_by_id

# create_competition
# display_public_competitions
# get_users_in_competition
# get_leaderboard
# delete_competition
# remove_user_from_competition
# get_competition_by_id
# get_all_active_competitions (?)

class CompetitionView(viewsets.ModelViewSet):
    serializer_class = CompetitionSerializer
    queryset = Competition.objects.all()
    
def create_competition(request):
    name = request.body.name
    description = request.body.description
    units = request.body.units
    frequency = request.body.frequency
    type_of_competition = request.body.type_of_competition
    end_date = request.body.end_date
    host_id = request.body.host_id
    completed = request.body.completed
    new_competition = Competition(name,description,units,frequency,type_of_competition,end_date,host_id,completed)
    return new_competition

class UserView(viewsets.ModelViewSet):
    serializer_class = ScoreSerializer
    queryset = Score.objects.all()