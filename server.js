var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/app", express.static('app'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app');
});

io.on('connection', function(socket){
    socket.on('kule', function(msg){
        console.log(msg)
        io.emit('kule', msg);
    });
});

http.listen(8000, function(){
    console.log('listening on *:8000');
});