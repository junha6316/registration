import csv
import json

from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.models import Group
from django.contrib import admin
from django.http import HttpResponse
from django.db.models import Count
from django.db.models.functions import TruncDay
from django.contrib.admin import AdminSite

from . import models



# Register your models here.
@admin.register(models.Participant)
class ParticipantAdmin(admin.ModelAdmin):
    """ Participant Admin Defintion """

    list_display = ("name", "company", "email", "dept", "phone", "position", "created")
    ordering = ("-created",)

    fieldsets = (
        ("개인 정보", {"fields": ("name", "phone", "email")}),
        ("회사 정보", {"fields": ("company", "dept", "position")}),
    )

    actions = ["export_as_csv"]

    def export_as_csv(self, request, queryset):

        """ return Export as csv File """

        meta = self.model._meta
        field_names = [
            field.name for field in meta.fields if not field.name.endswith("_ptr")
        ]
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = "attachment; filename={}.csv".format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"

    def changelist_view(self, request, extra_context=None):

        """return JSON data about Chart data to Django Admin Page  """

        chart_data = (
            models.Participant.objects.annotate(
                date=TruncDay("created")
            )  # Aggregate new participant per day
            .values("date")
            .annotate(y=Count("phone"))
            .order_by("-date")
        )
        # Using DjangoJSONENcoder, Chage chardata(tuple) to Json
        as_json = json.dumps(list(chart_data), cls=DjangoJSONEncoder)

        # Encoding 된 형태로 보낸다.
        extra_context = extra_context or {"chart_data": as_json}

        return super().changelist_view(request, extra_context=extra_context)


@admin.register(models.File)
class FileModelAdmin(admin.ModelAdmin):

    """ File Model Admin Definition"""

    list_display = ("created", "file_name", "creator", "contents", "description")