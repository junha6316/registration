from django.db import models

# Create your models here.
class TimeStampedModel(models.Model):
    created = models.DateField("등록 일자", auto_now_add=True, null=True)

    class Meta:
        abstract = True
