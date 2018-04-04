var app = require('http').createServer()
var io = require('socket.io')(app);

var port = 3001;
var clientCount = 0;

var socketMap = {};

app.listen(port);

var bindListener = function(socket, event) {
	socket.on(event,function(data){
		if(socket.clientNum %2 ==0){
			if(socketMap[socket.clientNum - 1]){
				socketMap[socket.clientNum - 1].emit(event,data);
			}
		}else{
			if(socketMap[socket.clientNum + 1]){
				socketMap[socket.clientNum + 1].emit(event,data);
			}
		}
	})
}

io.on('connection', function (socket) {
	clientCount++;
	socket.clientNum = clientCount;
	socketMap[clientCount] = socket;

	if(clientCount%2 == 1){
		socket.emit('waiting', 'waiting for another person')
	}else{
		socket.emit('start');
		socketMap[(clientCount - 1)].emit('start');
	}
 
	bindListener(socket,'init');
	bindListener(socket,'next');
	bindListener(socket,'rotate');
	bindListener(socket,'right');
	bindListener(socket,'down');
	bindListener(socket,'left');
	bindListener(socket,'fall');
	bindListener(socket,'fixed');
	bindListener(socket,'line');
	bindListener(socket,'result');



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