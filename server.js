const express = require('express');
const socket = require('socket.io');

const port = 8000;
const tasks = [];

const app = express();

const server = app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
  
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.emit('updateData', tasks);

    socket.on('addTask', (task) => {
        tasks.push(task);
        socket.broadcast.emit('addTask', task);
    });

    socket.on('removeTask', (id) => {
        tasks.filter(task => task.id !== id);
        socket.broadcast.emit('removeTask', id);
    });
});

app.use((req, res) => {
    res.status(200).send('it works!');
});
