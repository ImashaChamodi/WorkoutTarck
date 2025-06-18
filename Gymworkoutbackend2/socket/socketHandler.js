// socket/socketHandler.js
const Message = require('../models/messageModel');

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Send previous messages on connection
        Message.find().sort({ _id: 1 }).then(messages => {
            socket.emit('previousMessages', messages);
        });

        // Handle new message
        socket.on('sendMessage', async (message) => {
            try {
                const newMessage = new Message(message);
                await newMessage.save();
                io.emit('newMessage', newMessage);  // Emit the saved message
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = socketHandler;
