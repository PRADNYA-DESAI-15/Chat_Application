from django.db import models

# Create your models here.
from django.db import models

class Message(models.Model):
    room_name = models.CharField(max_length=255)
    sender = models.CharField(max_length=255)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender}: {self.text[:50]}"
