# Instagram-Style Chat Application

This is a real-time chat application built using **Django (backend) and React (frontend)** with WebSockets support for real-time messaging. The UI is styled with **Bootstrap** to resemble Instagram's chat layout.

## 🚀 Features
- **Real-time messaging** with Django Channels & WebSockets
- **Message storage** in a relational database (MySQL/PostgreSQL)
- **REST API** for message retrieval & storage
- **Responsive UI** using Bootstrap
- **Multi-room chat support**
- **Deployable on Render/Vercel**

---

## 🛠️ Tech Stack
### **Backend (Django)**
- Django REST Framework
- Django Channels (WebSockets)
- PostgreSQL/MySQL (Database)
- Redis (for WebSocket message queue)
- Gunicorn + Nginx (for production)

### **Frontend (React)**
- React.js
- Bootstrap for styling
- Axios (for API calls)
- WebSockets (for real-time chat)

---

## 🔧 Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### **2️⃣ Backend Setup (Django)**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### **3️⃣ Frontend Setup (React)**
```bash
cd frontend
npm install
npm start
```


## 🎯 API Endpoints
| Method | Endpoint | Description |
|--------|---------------------------|--------------------------------|
| GET | `/api/messages/<room_name>/` | Fetch messages in a room |
| POST | `/api/messages/<room_name>/` | Send a new message |

