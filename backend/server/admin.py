from django.contrib import admin
from .models import User, Competition, Score

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'password')


class CompetitionAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'units','daily_goal','host_id','completed')


class ScoreAdmin(admin.ModelAdmin):
    list_display = ('competition_id', 'user_id', 'score')


# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Competition, CompetitionAdmin)
admin.site.register(Score, ScoreAdmin)
