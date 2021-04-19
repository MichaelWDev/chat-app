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


// Socket
const users = {};
io.on('connection', function(socket){
    console.log("user connected");

    socket.on('disconnect', function(){
        console.log('user ' + users[socket.id] + ' disconnected');
        // remove saved socket from users object
        delete users[socket.id];
  });
});