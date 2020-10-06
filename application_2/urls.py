from django.conf.urls import url
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("CheckRegDateAction", views.checkRegDate, name="CheckRegDate"),
    path("CheckEmailAction", views.checkEmailForm, name="CheckEmail"),
    path("CheckMobileAction", views.checkMobileForm, name="CheckPhone"),
    path("submit", views.submit, name="submit"),
    path('download/<str:file_name>', views.file_download, name ='file_download')
]
