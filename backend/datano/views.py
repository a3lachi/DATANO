from django.shortcuts import render
from rest_framework import viewsets
from .serializers import InstructionSerializer
from .models import Instruction 

# Create your views here.

class InstruView(viewsets.ModelViewSet):
    serializer_class = InstructionSerializer
    queryset = Instruction.objects.all()