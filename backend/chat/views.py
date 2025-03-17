from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Message

class MessageListView(View):
    def get(self, request, room_name):
        messages = Message.objects.filter(room_name=room_name).order_by("timestamp")
        return JsonResponse(list(messages.values()), safe=False)

    @method_decorator(csrf_exempt)
    def post(self, request, room_name):
        data = json.loads(request.body)
        message = Message.objects.create(
            room_name=room_name,
            sender=data["sender"],
            text=data["text"]
        )
        return JsonResponse({"id": message.id, "sender": message.sender, "text": message.text}, status=201)
