const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

let users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('setUsername', (username) => {
    users[socket.id] = username;
    io.emit('userJoined', { id: socket.id, username: username });
    io.emit('userList', Object.values(users));
  });

  socket.on('message', (message) => {
    console.log('Message received: ' + message);
    io.emit('message', { user: users[socket.id], message: message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const username = users[socket.id];
    delete users[socket.id];
    io.emit('userLeft', { id: socket.id, username: username });
    io.emit('userList', Object.values(users));
  });
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
