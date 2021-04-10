const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    var name = 'U' + (socket.id).toString().substr(1,4);
    socket.broadcast.emit('newUser', name);
    socket.emit('userName', name);

    socket.on('message', function(msg){
        io.sockets.emit('room', msg, name);
    });
});


const port = 3000;
server.listen(port);