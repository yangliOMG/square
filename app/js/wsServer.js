var app = require('http').createServer()
var io = require('socket.io')(app);

var port = 3000;
var clientCount = 0;

app.listen(port);

io.on('connection', function (socket) {
	clientCount++
	socket.nickname = 'user' + clientCount
	io.emit('enter', {nickname:socket.nickname,content:socket.nickname + ' comes in'})		//io.emit广播			socket.emit  发送

	socket.on('message',function(str){
		io.emit('message', {nickname:socket.nickname,content: str})
	})

	socket.on('disconnect',function(){
		io.emit('leave', socket.nickname + ' left')
	})
});

console.log("websocket server listening on port " + port);