import express from "express";
import socketIo from 'socket.io';
import requestController from "../controllers/requestController.js";

const requestRouter = express.Router();
const io = socketIo();

const requests = new requestController();

// השמעת הסוקטים
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.emit('news', { hello: 'world' });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

requestRouter.get("/", requests.getAllRequests);
requestRouter.get("/:id", requests.getUserById);
requestRouter.put("/:id", requests.updateRequest);

export {
    requestRouter,
    io // מיועד להשמיע סוקטים בראוטר הזה
};
