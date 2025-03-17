let socket = null;

export const initializeWebSocket = (roomName) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("WebSocket already open.");
        return socket;
    }

    if (!roomName) {
        console.error("❌ Room name is required for WebSocket connection.");
        return null;
    }

    const wsUrl = `ws://${window.location.hostname}:8000/ws/chat/${roomName}/`;

    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        console.log("✅ WebSocket Connected:", wsUrl);
    };

    socket.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = (event) => {
        console.warn("⚠️ WebSocket Disconnected:", event);
    };

    return socket;
};

export const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ message }));
    } else {
        console.error("❌ WebSocket is not open. Cannot send message.");
    }
};

export const closeWebSocket = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }
};
