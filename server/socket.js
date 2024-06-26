import { Server } from 'socket.io'; // Import Server from socket.io for server-side operations
import app from './app.js';
import { createServer } from 'http';


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','put']
  }
});

let clientConnected = false;

io.on('connection', (socket) => {
    if (!clientConnected) {
        console.log('Client connected');
        clientConnected = true;     

    }

    socket.on('postRequest', (request) => {
        console.log('New request received:', request);
        console.log(request);
        io.emit('addRequest', request); // שליחת הבקשה האחרונה בלבד
    });


  //   socket.on('putRequest', (request) => {
  //     console.log('request was taken:', request);
  //     io.emit('updateRequest', request);
  //     // io.emit('newRequest', request); // שליחת הבקשה האחרונה בלבד
  // });


    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clientConnected = false;
    });
});


// // Socket.io event handling
// io.on('connection', (socket) => {
//     console.log('Client connected');
//     socket.on('postRequest', (request) => {
//       console.log('New request received:', request);
//       io.emit('newRequest', request); // שליחת הבקשה האחרונה בלבד
//     });
//     // socket.on('postRequest', (request) => {
//     //     console.log('New request received:', request);
//     //     io.emit('getAllReשquests', request);
//     //   //  sendRatingEmail('chani03630@gmail.com')
    
//     //   });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');

//     });
// });


server.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);


  });







