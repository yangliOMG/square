import Square from './square.js'
import SquareFactory from './squareFactory.js'
import $ from 'jquery';

class Base{

	initGameData(){
		return this.gameData = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		];
	}
	

	static initDiv(container, divs, datas){
		for(let i=0;i<datas.length;i++){
			let div = [];
			for(let j=0;j<datas[0].length;j++){
				let newNode = document.createElement("div");
				newNode.className = "none";
				newNode.style.top = (i*20) + "px";
				newNode.style.left = (j*20) + "px";
				container.appendChild(newNode);
				div.push(newNode);
			}
			divs.push(div);
		}
	}

	static refreshDiv(divs, datas){
		for(let i=0;i<divs.length;i++){
			for(let j=0;j<divs[0].length;j++){
				if(datas[i][j] == 0){
					divs[i][j].className = "none";
				}else if(datas[i][j] == 1){
					divs[i][j].className = "done";
				}else if(datas[i][j] == 2){
					divs[i][j].className = "current";
				}
			}
		}
	}

	clearData(square,gamedata){
		for(let i=0;i<square.data.length;i++){ 
			for(let j=0;j<square.data[0].length;j++){
				if(this.check(square.origin, i ,j)){
					gamedata[i + square.origin.x][j + square.origin.y]  = 0;
				}
			}
		}
	}
	setData(square,gamedata){
		if(square.length==0) return true;
		for(let i=0;i<square.data.length;i++){ 
			for(let j=0;j<square.data[0].length;j++){
				if(this.check(square.origin, i ,j)){
					gamedata[i + square.origin.x][j + square.origin.y]  = square.data[i][j];
				}
			}
		}
	}

	check(pos,x,y){
		let self = this;
		if(pos.x+x >= self.gameData.length){
			return false;
		}else if(pos.x+x < 0){
			return false;
		}else if(pos.y+y >= self.gameData[0].length){
			return false;
		}else if(pos.y+y < 0){
			return false;
		}else if(self.gameData[x + pos.x][y + pos.y] == 1){
			return false;
		}else{
			return true
		}
	}

	isVaild(datas){
		for(let i=0;i<datas.data.length;i++){
			for(let j=0;j<datas.data[0].length;j++){
				if(datas.data[i][j]!=0){
					if(!this.check(datas.origin,i,j)){ 
						return false;
					}
				}
			}
		}
		return true;
	}

	rotate(){
		let self = this;
		if(self.canRotate()){
			self.clearData(self.cur,self.gameData);
			self.cur.getRotate(); 
			self.setData(self.cur,self.gameData);
			Base.refreshDiv(self.gameDivs,self.gameData);
		}
	}
	down(){
		let self = this;

		if(self.canDown()){
			self.clearData(self.cur,self.gameData);
			self.cur.getDown(); 
			self.setData(self.cur,self.gameData);
			Base.refreshDiv(self.gameDivs,self.gameData);
			return true;
		}else{
			return false;
		}
	}
	fall(){
		let self = this;
		while(self.down()){}
	}
	right(){
		let self = this;
		if(self.canRight()){
			self.clearData(self.cur,self.gameData);
			self.cur.getRight(); 
			self.setData(self.cur,self.gameData);
			Base.refreshDiv(self.gameDivs,self.gameData);
		}
	}
	left(){ 
		let self = this;
		if(self.canLeft()){
			self.clearData(self.cur,self.gameData);
			self.cur.getLeft(); 
			self.setData(self.cur,self.gameData);
			Base.refreshDiv(self.gameDivs,self.gameData);
		}
	}

	fixed(){
		let self = this;
		for(let i=0;i<self.gameData.length;i++){ 
			for(let j=0;j<self.gameData[0].length;j++){
				if(self.gameData[i][j] == 2){
					self.gameData[i][j]  = 1;
				}
			}
		}
	}

	clearLine(){
		let self = this;
		let arr = [];
		for(let i=self.gameData.length-1;i>=0;i--){ 
			let value = 1;
			for(let j=self.gameData[0].length-1;j>=0;j--){
				value *= self.gameData[i][j];
			}
			if(value!=0){
				arr.push(i);
			}
		}
		for(let i=0;i<arr.length;i++){
			self.gameData.splice(arr[i],1);
			self.gameData.unshift(new Array(self.gameData[0].length).fill(0));
		}
		return arr;
	}
	addScore(arr,div){
		let self = this;
		let score = [10,30,60,100];
		self.score += score[arr.length-1];
		div.scoreDiv.innerHTML = self.score ; 
	}

	checkGameover(){
		let self = this;
		for(let j=self.gameData[1].length-1;j>=0;j--){
			if(self.gameData[1][j] == 1){
				return true;
			}
		} 
		return false;
	}

	gameover(win,div){
		if(win == "win"){
			div.resultDiv.innerHTML = "你赢了";
			div.re_resultDiv.innerHTML = "你输了";
		}else{
			div.resultDiv.innerHTML = "你输了";
			div.re_resultDiv.innerHTML = "你赢了";
		}
	}

    produceNext(type,dir){
    	let self = this;
    	self.cur = self.next;
		self.next = SquareFactory.prototype.make(type ,dir);
		self.setData(self.cur,self.gameData);
		Base.refreshDiv(self.gameDivs,self.gameData);
		Base.refreshDiv(self.nextDivs,self.next.data);
    }

    //[min.max)
    static getRandom(min,max){
    	return Math.ceil(Math.random()*max+min);
    }


	init(doms,type,dir){
		let self = this; 
		let gameContain = doms.gameDiv;
		let nextContain = doms.nextDiv; 
		self.next = SquareFactory.prototype.make(type,dir);
		
		Base.initDiv(gameContain,self.gameDivs,self.initGameData());
		Base.initDiv(nextContain,self.nextDivs,self.next.data);
		
		self.setData(self.cur,self.gameData);
		Base.refreshDiv(self.gameDivs,self.gameData);
		Base.refreshDiv(self.nextDivs,self.next.data);

		
	}

}

export default Base