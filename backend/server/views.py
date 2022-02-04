from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, CompetitionSerializer, ScoreSerializer
from .models import User, Competition, Score

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CompetitionView(viewsets.ModelViewSet):
    serializer_class = CompetitionSerializer
    queryset = Competition.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = ScoreSerializer
    queryset = Score.objects.all()