from rest_framework import serializers
from .models import SubmissionModel


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionModel
        fields = ["id","user","problem","code","language","status"]

        read_only_fields = ["user"]










