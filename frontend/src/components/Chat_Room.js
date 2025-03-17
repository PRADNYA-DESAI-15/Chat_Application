import React, { useState, useEffect, useRef } from "react";
import { Container, Col, Form, InputGroup, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatRoom = ({ roomName, username }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socketRef = useRef(null);

    useEffect(() => {
        if (!roomName) {
            console.error("Room name is required!");
            return;
        }

        // Fetch previous messages from the backend
        axios.get(`http://localhost:8000/api/messages/${roomName}/`)
            .then(response => setMessages(response.data))
            .catch(error => console.error("Error fetching messages:", error));

        // WebSocket Connection
        socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

        socketRef.current.onopen = () => {
            console.log(`Connected to room: ${roomName}`);
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data]);
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        socketRef.current.onclose = (event) => {
            console.warn("WebSocket Disconnected", event);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [roomName]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = { sender: username || "me", text: newMessage };

            // Send message via WebSocket
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify(messageData));
            }

            // Save message to database
            axios.post(`http://localhost:8000/api/messages/${roomName}/`, messageData)
                .catch(error => console.error("Error saving message:", error));

            setMessages([...messages, messageData]);
            setNewMessage("");
        }
    };

    return (
        <Container fluid className="vh-100 d-flex">
            <Col md={3} className="border-end p-3 bg-light">
                <h5>Chat Rooms</h5>
                <ListGroup>
                    <ListGroup.Item active>Room 1</ListGroup.Item>
                    <ListGroup.Item>Room 2</ListGroup.Item>
                    <ListGroup.Item>Room 3</ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={9} className="d-flex flex-column vh-100">
                <div className="border-bottom p-3 bg-white">
                    <h5>Room: {roomName}</h5>
                </div>

                <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: "#f5f5f5" }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex mb-2 ${msg.sender === username ? "justify-content-end" : "justify-content-start"}`}>
                            <div className={`p-2 rounded ${msg.sender === username ? "bg-primary text-white" : "bg-light"}`} style={{ maxWidth: "70%" }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-3 border-top bg-white">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button variant="primary" onClick={sendMessage}>Send</Button>
                    </InputGroup>
                </div>
            </Col>
        </Container>
    );
};

export default ChatRoom;