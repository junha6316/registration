from uuid import uuid4
from datetime import datetime

from django.db import models
from core import models as core_model


def get_file_path(instance, filename):
    """ 파일 이름을 받아서 암호화하는 함수 """
    ymd_path = datetime.now().strftime("%Y/%m/%d")  # 파일 업로드 날짜를 문자열로 바꾼다.
    uuid_name = uuid4().hex
    return "/".join(["upload_file/", ymd_path, uuid_name])


# Create your models here.
class Participant(core_model.TimeStampedModel):

    """ Participant Model Defintion """

    name = models.CharField("이름", max_length=30, null=True)
    company = models.CharField("회사", max_length=30, null=True)
    email = models.EmailField("이메일", null=True)
    dept = models.CharField("부서", max_length=30, null=True)
    phone = models.CharField("연락처", max_length=30, null=True)
    position = models.CharField("직급", max_length=30, null=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name_plural = "방문객"


class File(core_model.TimeStampedModel):

    """ File Model Definition """

    file_name = models.CharField("파일 이름", max_length=50, blank=True)
    creator = models.CharField("작성자", max_length=50)
    contents = models.FileField("파일", upload_to=get_file_path, blank=True)
    description = models.TextField("파일 설명")
    link = models.TextField("링크", blank=True)

    class Meta:
        verbose_name_plural = "파일"
