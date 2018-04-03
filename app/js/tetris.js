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

    this.start();
    this.bindKeyEvent();
  }

  start(){
  	let self = this;
  	var doms = {
  		gameDiv :document.getElementById('game'),
  		nextDiv :document.getElementById('next'),
  		scoreDiv :document.getElementById('score'),
  		resultDiv :document.getElementById('gameOver')
  	}
  	self.init(doms);
  }

  bindKeyEvent(){
  	let self = this;
  	document.onkeydown = function(e){
  		if(e.keyCode == 38){//up 
  			self.rotate();
  		}else if(e.keyCode == 39){//right
  			self.right();
  		}else if(e.keyCode == 40){//down
  			self.down()
  		}else if(e.keyCode == 37){//left
  			self.left();
  		}else if(e.keyCode == 32){//space
  			self.fall();
  		}
  	}
  }
  
}

export default Tetris;