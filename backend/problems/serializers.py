from rest_framework import serializers
from .models import ProblemModel


class ProblemAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemModel
        fields = "__all__"


