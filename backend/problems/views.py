from rest_framework import viewsets
from .models import ProblemModel
from .serializers import ProblemAdminSerializer
from rest_framework.permissions import IsAdminUser

class ProblemAdminView(viewsets.ModelViewSet):
    queryset = ProblemModel.objects.all()
    serializer_class = ProblemAdminSerializer
    permission_classes = [IsAdminUser]



