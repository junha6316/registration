import json
import re
import os
import urllib
import mimetypes
from PIL import Image
from datetime import datetime
from collections import namedtuple

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone

from .models import Participant, File
from .apps import Application_2Config

app_name = Application_2Config.name
# Create your views here.
def index(request):
    """ Index Page Defintion"""
    # print(request)
    # print(request.POST.get("date"))

    return render(request, f"{app_name}/registration.html")


def checkRegDate(request):
    """
    Whether or Not now is in Registration Term
    """
    date = request.POST.get("date")

    date = date.replace("%3A", "-")
    start_date, end_date = date.split("&")
    start_date = start_date.split("=")[1]
    start_date = datetime.strptime(start_date, "%Y-%m-%d+%H-%M-%S")
    start_date = timezone.make_aware(start_date)

    end_date = end_date.split("=")[1]
    end_date = datetime.strptime(end_date, "%Y-%m-%d+%H-%M-%S")
    end_date = timezone.make_aware(end_date)

    now = timezone.now()
    # Send Return Code and Return Message
    """
    0: in Registration term
    200 : not open
    201 : closed
    """
    if start_date <= now <= end_date:
        context = {"ReturnCode": 0, "ReturnMessage": "등록이 성공적으로 진행됩니다."}
        return HttpResponse(json.dumps(context), content_type="application/json")

    elif start_date > now:
        context = {
            "ReturnCode": 200,
            "ReturnMessage": "아직 등록이 열리지 않았습니다",
        }
        return HttpResponse(json.dumps(context), content_type="application/json")

    elif now > end_date:

        context = {
            "ReturnCode": 210,
            "ReturnMessage": "등록이 종료되었습니다.",
        }
        print(json.dumps(context))
        return HttpResponse(json.dumps(context), content_type="application/json")


def checkEmailForm(request):
    email = request.POST.get("Email")
    p = re.compile("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    if p.match(email) != None:
        context = {"ReturnCode": 0, "ReturnMessage": "정상적인 이메일 형식입니다"}
        return HttpResponse(json.dumps(context), content_type="application/json")

    context = {"ReturnCode": 200, "ReturnMessage": "정상적인 이메일 형식이 아닙니다"}

    return HttpResponse(json.dumps(context), content_type="application/json")


def checkMobileForm(request):
    mobile = request.POST.get("Mobile")
    p = re.compile("(010)\-d{0,1}\d{3,4}\-d{0,1}\d{4}")
    if re.match(p, mobile) != None:
        context = {"ReturnCode": 0, "ReturnMessage": "정상적인 연락처 형식입니다"}
        return HttpResponse(json.dumps(context), content_type="application/json")

    context = {"ReturnCode": 200, "ReturnMessage": "정상적인 연락처 형식이 아닙니다"}

    return HttpResponse(json.dumps(context), content_type="application/json")


def submit(request):

    """return to Download Page"""

    if request.method == "GET":
        return render(request, f"{app_name}/inappropriate_contact.html")

    data = request.POST
    name = data.get("VisitorName")
    mobile = data.get("Mobile")
    email = data.get("Email")
    company = data.get("Company")
    department = data.get("Department")
    position = data.get("JobTitle")
    post = Participant(
        name=name,
        company=company,
        email=email,
        dept=department,
        phone=mobile,
        position=position,
    )
    post.save()

    file_infos = []
    file_info = namedtuple("file_info", ("contents","file_name", "creator", "link"))

    fs = File.objects.all()
   
    for f in fs:
        file_infos.append(file_info(f.contents, f.file_name, f.creator, f.link))

    context = {"file_infos": enumerate(file_infos)}
    print(file_infos)
    return render(request, f"{app_name}/download.html", context)


def file_download(request, file_name):
    if request.method == "GET":
        return render(request, f"{app_name}/inappropriate_contact.html")
      
    _file = get_object_or_404(File, file_name=file_name)
   
    url = _file.contents.url[1:]
    file_url = urllib.parse.unquote(url)
  
    if os.path.exists(file_url):
        with open(file_url, "rb") as fh:
            quote_file_url = urllib.parse.quote(_file.file_name.encode("utf-8"))
            response = HttpResponse(
                fh.read(), content_type=mimetypes.guess_type(file_url)[0]
            )
            response["Content-Disposition"] = (
                "attachment;filename*=UTF-8''%s" % quote_file_url
            )
            return response
        raise Http404()
    else:
        return Http404()