from django.contrib import admin
from django.urls import path
from rest_framework import routers
from datano import views
from django.conf.urls import include


router = routers.DefaultRouter()
router.register(r'Instructions', views.InstruView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]