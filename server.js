const express = require("express");
const app     = express();
const server  = require("http").Server(app);
const port    = 3000;
const io      = require('socket.io')(server);

// Serve the static website files.
app.use(express.static("public"));

// Starts the server.
server.listen(port, function () {
    console.log("Server is running on "+ port +" port");
});

// Server
const users = {};

io.on('connection', function(socket){
    console.log("user connected");

    socket.on('new-user', username => {
        users[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
    });

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });
    
    socket.on('disconnect', function(){
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        console.log('user ' + users[socket.id] + ' disconnected');
        delete users[socket.id];
  });
});