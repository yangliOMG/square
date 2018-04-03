class Square{	
	
	constructor(data= [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		],origin = {
			x:0,
			y:0
		},dir = 0){
		this.data = data;
		this.origin = origin;
		this.dir  = dir;
	}

	canRotate(){
		let cur = JSON.parse(JSON.stringify(this.cur)), dir = (this.cur.dir+1)%4;
		for(let i = 0;i<cur.data.length;i++){
			for(let j = 0;j<cur.data[0].length;j++){
				cur.data[i][j] = this.cur.rotate[dir][i][j]
			} 
		}
		if(this.isVaild(cur)){
			return true;
		}else{
			return false;
		}
	}
	getRotate(num){
		if(!num) num = 1;
		let self = this;
		this.dir  = (this.dir+num)%4;
		for(let i = 0;i<self.data.length;i++){
			for(let j = 0;j<self.data[0].length;j++){
				self.data[i][j] = this.rotate[this.dir][i][j]
			}
		}

		

	}

	canDown(){
		let cur = JSON.parse(JSON.stringify(this.cur));
		cur.origin.x += 1;
		if(this.isVaild(cur)){
			return true;
		}else{
			return false;
		}
	}
	getDown(){
		let self = this;
		self.origin.x += 1;
	}

	canRight(){
		let cur = JSON.parse(JSON.stringify(this.cur));
		cur.origin.y += 1;
		if(this.isVaild(cur)){
			return true;
		}else{
			return false;
		}
	}
	getRight(){
		let self = this;
		self.origin.y += 1;
	}

	canLeft(){
		let cur = JSON.parse(JSON.stringify(this.cur));
		cur.origin.y -= 1;
		if(this.isVaild(cur)){
			return true;
		}else{
			return false;
		}
	}
	getLeft(){
		let self = this;
		self.origin.y -= 1;
	}
	
}

export default Square;