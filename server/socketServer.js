const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('לקוח מחובר');

    socket.on('disconnect', () => {
        console.log('לקוח מנותק');
    });

    socket.on('takeRequest', requestId => {
        // עדכן את מצב הבקשה בשרת ושלח עדכון ללקוחות המעורבים
        // כאן תצטרך לקבל את הבקשה לפי ה-requestId ולעדכן את המצב שלה
        io.emit('requestTaken', requestId);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});