var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/kulicky", express.static('app'));


io.on('connection', function(socket){
    socket.on('kule', function(msg){
        console.log(msg)
        io.emit('kule', msg);
    });
});

http.listen(8000, function(){
    console.log('listening on *:8000');
});