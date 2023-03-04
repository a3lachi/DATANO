from django.db import models

# Create your models here.
class Instruction(models.Model) :
        collection = models.TextField(default=1)
        createdAt = models.TextField() 
        completedAt = models.TextField()
        status = models.TextField()
        instru = models.TextField()
        typeInstru = models.TextField(default='Instru')
        urgency = models.TextField(default='now') 
        api_key = models.TextField(default='')


        def _str_(self):
                return self.istru 





# py manage.py makemigrations datano
# py manage.py migrate datano 
