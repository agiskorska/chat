const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  
  socket.on('newUser', (user) => {
    const newUser = {user: user, id: socket.id};
    users.push(newUser);
    console.log(users);
  })
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left');
    for (let i = 0; i < users.length; i++) {
      let obj = users[i];
  
      if (socket.id === obj.id) {
        console.log('halo',obj);
        const content = obj.user.user + " has left the conversation... :("
        io.emit('message', {author:'Chat Bot', content: content})
        users.splice(i, 1);
      }
  }
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});