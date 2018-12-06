var curr;

function __drawString(s){
	var tdim=ctx.measureText(s);

	this.ctx.strokeStyle="white";
	this.ctx.font="24px PressStart2P";

	if( tdim.width + this.x > 640 ){
		this.x=this.x0;
		this.y+=36;
	}
	if( 36 + this.y> this.h+this.y0){
//		console.log("x0:"+this.x0+", y0:"+this.y0);
		this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
		this.x=this.x0;
		this.y=this.y0;
	}
	this.ctx.strokeText(s,this.x,this.y+36);
	var tdim=ctx.measureText(s);
	this.x+=tdim.width;
}

function textArea(ctx,x,y,w,h){
	return {ctx:ctx,x0:x,y0:y,w:w,h:h,print:__drawString,x:x,y:y};
}


function doWord(){
	var i=curr.indexOf(" ");
	var w=curr.substr(0,i+1);

	curr=curr.substr(i+1);
	
	gametext.print(w);
}

function init(){
	console.log("init");
	var canvas=document.getElementById("canvas");

	ctx=canvas.getContext("2d");

	curr=levels[0][0];		

	gametext=new textArea(ctx,36,36,640,480-36*4);

//	doWord();
	setInterval(doWord,100);
}

function doKey(key){
	console.log(key);		
}

document.onkeyup=function(e){ tmp=e; if(e.key.length<3) doKey(e.key)};

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) init();
else document.addEventListener("DOMContentLoaded",init);
