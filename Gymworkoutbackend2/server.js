const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const registerRoute = require('./routes/register'); // User registration route
const loginRoute = require('./routes/login'); // User login route
const userRoute = require('./routes/user'); // User route
const addWorkoutRoute = require('./routes/addWorkouts'); // Add workout route
const progressRoute = require('./routes/progress'); // Progress route
const User = require('./models/userModel'); // User model
const Message = require('./models/messageModel'); // Message model (assuming you have this)
const usernameRoute = require('./routes/username');
const userinformation = require('./routes/userinfo');
const messageRoutes = require('./routes/message');
const nutritionRoutes = require('./routes/nutrition');

require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'J9kRjF4&c5D$@7!m1WbZ'; // Use environment variable

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3001", // Replace with your frontend URL
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://cham:RbMPlrZp3Y0pOXpx@cluster0.tssmk.mongodb.net/fitness-tracker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/register', registerRoute); // Registration route
app.use('/api/login', loginRoute); // Login route
// app.use('/api/user', userRoute); // User profile route
app.use('/api/workouts', addWorkoutRoute); // Workout handling route
app.use('/api/progress', progressRoute); // Progress handling route
app.use('/api/user', usernameRoute);
app.use('/api/profile', userinformation);
app.use('/messages', messageRoutes);
app.use('/nutrition', nutritionRoutes);


// Socket.io events
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('getPreviousMessages', async () => {
        try {
            const previousMessages = await Message.find().sort({ createdAt: 1 });
            socket.emit('previousMessages', previousMessages);
        } catch (error) {
            console.error('Error fetching previous messages:', error);
            socket.emit('previousMessages', []);
        }
    });

    socket.on('sendMessage', async (message) => {
        try {
            const user = await User.findById(message.userId);
            if (!user) throw new Error('User not found');

            const newMessage = new Message({
                user: user.username,
                text: message.text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            await newMessage.save();
            io.emit('newMessage', newMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
