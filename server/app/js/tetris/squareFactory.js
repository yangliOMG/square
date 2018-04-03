import Square from './square.js'

class Square1 extends Square{	
	constructor(){
		super();
		this.rotate = [
			[
				[0,2,0,0],
				[0,2,0,0],
				[0,2,0,0],
				[0,2,0,0]
			],
			[
				[0,0,0,0],
				[2,2,2,2],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[0,2,0,0],
				[0,2,0,0],
				[0,2,0,0],
				[0,2,0,0]
			],
			[
				[0,0,0,0],
				[2,2,2,2],
				[0,0,0,0],
				[0,0,0,0]
			],
		]
	}
}
class Square2 extends Square{	
	constructor(){
		super();
		this.rotate = [
			[
				[0,2,0,0],
				[2,2,2,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,0,0,0],
				[2,2,0,0],
				[2,0,0,0],
				[0,0,0,0]
			],
			[
				[2,2,2,0],
				[0,2,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[0,2,0,0],
				[2,2,0,0],
				[0,2,0,0],
				[0,0,0,0]
			],
		]
	}
}
class Square3 extends Square{	
	constructor(){
		super();
		this.rotate = [
			[
				[2,2,2,0],
				[0,0,2,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[0,2,0,0],
				[0,2,0,0],
				[2,2,0,0],
				[0,0,0,0]
			],
			[
				[2,0,0,0],
				[2,2,2,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,2,0,0],
				[2,0,0,0],
				[2,0,0,0],
				[0,0,0,0]
			],
		]
	}
}
class Square4 extends Square{	
	constructor(){
		super();
		this.rotate = [
			[
				[2,2,2,0],
				[2,0,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,2,0,0],
				[0,2,0,0],
				[0,2,0,0],
				[0,0,0,0]
			],
			[
				[0,0,2,0],
				[2,2,2,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,0,0,0],
				[2,0,0,0],
				[2,2,0,0],
				[0,0,0,0]
			],
		]
	}
}
class Square5 extends Square{	
	constructor(){
		super();
		this.rotate = [
			[
				[2,2,0,0],
				[2,2,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,2,0,0],
				[2,2,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,2,0,0],
				[2,2,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,2,0,0],
				[2,2,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
		]
	}
}
class Square6 extends Square{	
	constructor(){
		super();
		this.rotate = [
			[
				[2,2,0,0],
				[0,2,2,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[0,2,0,0],
				[2,2,0,0],
				[2,0,0,0],
				[0,0,0,0]
			],
			[
				[2,2,0,0],
				[0,2,2,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[0,2,0,0],
				[2,2,0,0],
				[2,0,0,0],
				[0,0,0,0]
			],
		]
	}
}
class Square7 extends Square{	
	constructor(){
		super();
		this.rotate = [
			[
				[0,2,2,0],
				[2,2,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,0,0,0],
				[2,2,0,0],
				[0,2,0,0],
				[0,0,0,0]
			],
			[
				[0,2,2,0],
				[2,2,0,0],
				[0,0,0,0],
				[0,0,0,0]
			],
			[
				[2,0,0,0],
				[2,2,0,0],
				[0,2,0,0],
				[0,0,0,0]
			],
		]
	}
}

class SquareFactory{ 
	make(index,dir){
		let s ;
		switch(index){
			case 1:
				s = new Square1();
				break;
			case 2:		
				s = new Square2();
				break;
			case 3:
				s = new Square3();
				break;
			case 4:
				s = new Square4();
				break;
			case 5:
				s = new Square5();
				break;
			case 6:
				s = new Square6();
				break;
			case 7:
				s = new Square7();
				break;				
			default:
				break;
		}
		s.origin.x = 0;
		s.origin.y = 3;
		s.getRotate(dir);
		return s ;
	}
}

export default SquareFactory;