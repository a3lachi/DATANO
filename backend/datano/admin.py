from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Instruction 

class Datano(admin.ModelAdmin):
    list_display = ('createdAt', 'completedAt', 'instru' , 'api_key' , 'urgency')

# Register your models here.

admin.site.register(Instruction, Datano)



