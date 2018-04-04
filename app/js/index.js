import 'babel-polyfill';
import Tetris from './tetris.js'
import Remote from './remote.js'
// import  io from './socket-io.js'

var socket = io("ws://localhost:3001/");

const tetris = new Tetris(socket); 

const remote = new Remote(socket);

socket.on('enter',function(str){
	var div = document.createElement('div');
	div.innerHTML  =  str.content;
	document.getElementById('waiting').appendChild(div) ; 
});
 
socket.on('waiting',function(str){
	var div = document.createElement('div');
	div.innerHTML  =  str;
	document.getElementById('waiting').appendChild(div);
});

socket.on('message',function(data){
	var div = document.createElement('div');
	div.innerHTML  =  data.nickname + "："+data.content;
	document.getElementById('waiting').appendChild(div);
}); 