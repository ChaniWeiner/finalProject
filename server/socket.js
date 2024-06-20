import { Server } from 'socket.io'; // Import Server from socket.io for server-side operations
import app from './app.js';
import { createServer } from 'http';
import { sendRatingEmail } from './service/email.js'; 


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Socket.io event handling
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('postRequest', (request) => {
        console.log('New request received:', request);
        io.emit('getAllRequests', request);
       sendRatingEmail('chani03630@gmail.com')
    
      });

    socket.on('disconnect', () => {
        console.log('Client disconnected');

    });
});


server.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);


  });







