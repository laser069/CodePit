from django.urls import include,path
from rest_framework import routers
from .views import ProblemAdminView

router = routers.DefaultRouter()
router.register(r'',ProblemAdminView)

urlpatterns = [
    path("",include(router.urls))
]


