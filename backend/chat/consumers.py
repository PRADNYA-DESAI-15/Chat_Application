import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = await self.save_message(data)

        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat_message", "message": message}
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event["message"]))

    async def save_message(self, data):
        message = Message.objects.create(
            room_name=self.room_name,
            sender=data["sender"],
            text=data["text"]
        )
        return {"sender": message.sender, "text": message.text, "timestamp": str(message.timestamp)}
