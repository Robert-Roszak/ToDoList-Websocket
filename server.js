const express = require('express');
const socket = require('socket.io');

const port = 8000;
const tasks = [];

const app = express();

const server = app.listen(process.env.PORT || port, () => {
    console.log(`App running at http://localhost:${port}`);
  });
  
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.emit('updateData', tasks);
});

app.use((req, res) => {
    res.status(200).send('it works!');
});
