import 'babel-polyfill';

import Base from './tetris/base.js';
import Square from './tetris/square.js';
import $ from 'jquery';

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
 
class Tetris extends mix(Base,Square){
  constructor(socket){
    super();
    this.nextData=[];
    this.gameData=[];
    this.cur = [];
    this.next = [];
    this.nextDivs = [];
    this.gameDivs = [];
    this.timer ;
    this.score = 0;
    this.socket = socket;

    this.listenSocket();
    this.bindKeyEvent();
  }

  listenSocket(){
    let self = this;
    var doms = {
      gameDiv :document.getElementById('game'),
      waitDiv :document.getElementById('waiting'),
      nextDiv :document.getElementById('next'),
      scoreDiv :document.getElementById('score'),
      resultDiv :document.getElementById('gameOver'),
      re_resultDiv :document.getElementById('remote_gameOver')
    }
    self.socket.on('start',function(str){
      var div = document.createElement('div');
      div.innerHTML  =  "人数足够，准备开始游戏。。";
      doms.waitDiv.appendChild(div) ;
      self.delay(9,function(time){
          var div = document.createElement('div');
          div.innerHTML  =  time+"..";
          doms.waitDiv.appendChild(div) ;
      },function(){
        self.start(doms);
      })
    });

    self.socket.on('result',function(data){
      self.stop();
    });

    self.socket.on('leave',function(data){
      var div = document.createElement('div');
      div.innerHTML  =  data+'  对方掉线';
      div.style.color = 'red';
      doms.waitDiv.appendChild(div) ;
      self.stop();
    });
  }

  delay(time,update,handle){
    let self = this;
    if(time == 0 ){
      handle.call(self);
    }else{
      update.call(self,time);
      time--;
      setTimeout(()=>{
        self.delay(time,update,handle);
      },1000);
    }
  }

  stop(){
    let self = this;
    clearInterval(self.timer);
    self.timer = null;
  }

  start(doms){
  	let self = this;
  	
    let type = Base.getRandom(0,6);
    let dir = Base.getRandom(0,3);
    self.init(doms,type,dir);
    self.socket.emit('init',{type:type,dir:dir});

    let t = Base.getRandom(0,6);
    let d = Base.getRandom(0,3);
    self.produceNext(t,d);
    self.socket.emit('next',{type:t,dir:d});

    self.timer = setInterval(self.move.bind(self,doms),500); 
  }

  
  move(){ 
      let self = this; 
      if(!self.down()){
        self.fixed();
          self.socket.emit('fixed');
        if(!self.checkGameover()){
          let lineArr = self.clearLine();
          if(lineArr.length>0){
            self.addScore(lineArr,arguments[0]);
            self.socket.emit('line',lineArr);
          }
          let t = Base.getRandom(0,6);
          let d = Base.getRandom(0,3);
          self.produceNext(t,d);
          self.socket.emit('next',{type:t,dir:d})
        }else{
          self.gameover("lost",arguments[0]);
          self.stop();
          self.socket.emit('result',"win");
        }
      }else{
          self.socket.emit('down');
      }
      Base.refreshDiv(self.gameDivs,self.gameData);
      Base.refreshDiv(self.nextDivs,self.next.data);
  }



  bindKeyEvent(){
  	let self = this;
    var doms = {
      sendBtn :document.getElementById('sendBtn'),
      sendTxt :document.getElementById('sendTxt')
    }
  	document.onkeydown = function(e){
  		if(e.keyCode == 38){//up 
  			self.rotate();
        self.socket.emit('rotate');
  		}else if(e.keyCode == 39){//right
  			self.right();
        self.socket.emit('right');
  		}else if(e.keyCode == 40){//down
  			self.down();
        self.socket.emit('down');
  		}else if(e.keyCode == 37){//left
  			self.left();
        self.socket.emit('left');
  		}else if(e.keyCode == 32){//space
  			self.fall();
        self.socket.emit('fall');
  		}else if(e.keyCode == 13){//enter
        doms.sendBtn.onclick(); 
      }
  	}

    doms.sendBtn.onclick = function(){
      var txt = doms.sendTxt.value;
      if(txt){
        self.socket.emit('message',txt);
        doms.sendTxt.value ='';
      }
    }
  }
  
}

export default Tetris;