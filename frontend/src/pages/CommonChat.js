/// src/components/CommonChat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import '../styles/CommonChat.css';


const SERVER_URL = 'http://localhost:5000';

function CommonChat() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Decode JWT token to get the username
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username); // Adjust according to your token structure
        }

       
        const socketIo = io(SERVER_URL);
 
        socketIo.on('connect', () => {
            console.log('Connected to server');
        });

      
        socketIo.on('previousMessages', (previousMessages) => {
            setMessages(previousMessages);
        });

       
        
        socketIo.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(socketIo);

       
        return () => {
            socketIo.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (!newMessage) return;

        // Emit a new message event
        socket.emit('sendMessage', { text: newMessage, username });

        // Clear the input field
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Community Chat</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <div className="message-bubble">
                            <strong>{msg.username}</strong>:
                            <p>{msg.text}</p>
                            <em>{msg.time}</em>
                        </div>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default CommonChat;
