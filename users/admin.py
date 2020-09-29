from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models

# Register your models here.
@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    """ UserAdmin Definition """

    list_display = (
        'nickname',
        'email',
        'date_joined',
    )

    list_display_links = (
        'nickname',
        'email',
    )
