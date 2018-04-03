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
  constructor(){
    super();
    this.nextData=[];
    this.gameData=[];
    this.cur = [];
    this.next = [];
    this.nextDivs = [];
    this.gameDivs = [];
    this.timer ;
    this.score = 0;

    this.bindKeyEvent();
  }

  start(){
  	let self = this;
  	
  	self.init(doms);
  }

  bindKeyEvent(){
    let self = this;
    let doms = {
      gameDiv :document.getElementById('remote_game'),
      nextDiv :document.getElementById('remote_next'),
      scoreDiv :document.getElementById('remote_score'),
      resultDiv :document.getElementById('remote_gameOver')
    }
    document.getElementById("remote_initGameData").onclick = function(){
        self.initGameData();
    }
    document.getElementById("remote_initDiv").onclick = function(){ 
        Base.initDiv(doms.gameDiv,self.gameDivs,self.gameData);
    }
    document.getElementById("remote_refreshDiv").onclick = function(){
        Base.refreshDiv(self.gameDivs,self.gameData);
    }
    document.getElementById("remote_produceNext").onclick = function(){
        self.produceNext();
    }
    document.getElementById("remote_rotate").onclick = function(){
        self.rotate();
    }
    document.getElementById("remote_down").onclick = function(){
        self.down();
    }
    document.getElementById("remote_right").onclick = function(){
        self.right();
    }
    document.getElementById("remote_left").onclick = function(){
        self.left();
    }
    document.getElementById("remote_fixed").onclick = function(){
        self.fixed();
    }
  }
  
  
}

export default Remote;