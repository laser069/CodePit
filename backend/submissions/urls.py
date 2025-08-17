from django.urls import path,include
from rest_framework import routers
from .views import SubmissionViewSet

router = routers.DefaultRouter()


router.register(r'',SubmissionViewSet,basename="submission")

urlpatterns = [
    path('',include(router.urls)),
    
]



