// import express from "express";
// import io from 'socket.io-client';
// //import socketIo from 'socket.io';
// import requestController from "../controllers/requestController.js";

// const requestRouter = express.Router();
// //const io = require('socket.io');
// //const io = socketIo();
// //const socketIo = require('socket.io');


// const requests = new requestController();

// // השמעת הסוקטים
// io.on('connection', (socket) => {
//     console.log('Client connected');

//     socket.emit('news', { hello: 'world' });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// requestRouter.get("/", requests.getAllRequests);
// requestRouter.get("/:id", requests.getUserById);
// requestRouter.put("/:id", requests.updateRequest);

// export {
//     requestRouter,
//     io // מיועד להשמיע סוקטים בראוטר הזה
// };
import express from "express";
//import { Server } from 'socket.io'; // Import Server from socket.io for server-side operations
import requestController from "../controllers/requestController.js";

const requestRouter = express.Router();
//const io = new Server(); // Create a new socket.io server instance
//const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });
const requests = new requestController();


// Socket.io event handling
// io.on('connection', (socket) => {
//     console.log('Client connected');

//     socket.emit('news', { hello: 'world' });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

requestRouter.get("/:type", requests.getAllRequests);
requestRouter.get("/:id", requests.getUserById);
requestRouter.put("/:id", requests.updateRequest);
requestRouter.post("/", requests.postRequest);

export {
    requestRouter,
    //io // Export io for socket operations in this router
};
