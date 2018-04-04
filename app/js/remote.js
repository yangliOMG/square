import 'babel-polyfill';

import Base from './tetris/base.js';
import Square from './tetris/square.js';

const copyProperties = function(target,source){
	for(let key of Reflect.ownKeys(source)){
		if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
			let desc = Object.getOwnPropertyDescriptor(source,key);
			Object.defineProperty(target,key,desc);
		}
	}
}

const mix = function(...mixins){
	class Mix{}
	for(let mixin of mixins){
		copyProperties(Mix,mixin);
		copyProperties(Mix.prototype,mixin.prototype)
	}
	return Mix
}

class Remote extends mix(Base,Square){
  constructor(socket){
    super();
    this.nextData=[];
    this.gameData=[];
    this.cur = [];
    this.next = [];
    this.nextDivs = [];
    this.gameDivs = [];
    this.score = 0;
    this.socket = socket;

    this.listenSocket();
  }

  listenSocket(){
    let self = this;
    let doms = {
      gameDiv :document.getElementById('remote_game'),
      nextDiv :document.getElementById('remote_next'),
      scoreDiv :document.getElementById('remote_score'),
      resultDiv :document.getElementById('gameOver'),
      re_resultDiv :document.getElementById('remote_gameOver')
    }
    self.socket.on('init',function(data){
      self.start(data.type,data.dir,doms);
    });
    self.socket.on('next',function(data){
      self.produceNext(data.type,data.dir);
    });
    self.socket.on('rotate',function(data){
      self.rotate();
    });
    self.socket.on('down',function(data){
      self.down();
    });
    self.socket.on('right',function(data){
      self.right();
    });
    self.socket.on('left',function(data){
      self.left();
    });
     self.socket.on('fall',function(data){
      self.fall();
    });
    self.socket.on('fixed',function(data){
      self.fixed();
    });
    self.socket.on('line',function(data){
      self.clearLine();self.addScore(data,doms)
    });
    self.socket.on('result',function(data){
      self.gameover(data,doms);
    });
    
  }
  start(type,dir,doms){
  	let self = this;
  	
  	self.init(doms,type,dir);
  }
}

export default Remote;