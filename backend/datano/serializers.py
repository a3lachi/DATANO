# You will need serializers to convert model instances 
# to JSON so that the frontend can work with the received data.



from rest_framework import serializers
from .models import Instruction 


class InstructionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction 
        fields = ('id','taskId','collection', 'createdAt', 'status', 'instru','typeInstru','urgency','api_key','src')




