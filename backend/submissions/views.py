from rest_framework import viewsets
from .models import SubmissionModel
from .serializers import SubmissionSerializer
from rest_framework.permissions import IsAuthenticated 

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = SubmissionModel.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self,serializer):
        serializer.save(user = self.request.user)


