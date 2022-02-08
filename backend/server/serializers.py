from rest_framework import serializers
from .models import User, Competition, Score

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'account_type')

class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = ('id', 'name', 'description', 'units', 'frequency', 'end_date', 'host_id', 'completed')

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('id', 'competition_id', 'username_id', 'score', 'last_updated')