# You will need serializers to convert model instances 
# to JSON so that the frontend can work with the received data.



from rest_framework import serializers
from .models import Instruction 

class InstructionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instruction 
        fields = ('collection', 'createdAt', 'status', 'instru','typeInstru','urgency')



