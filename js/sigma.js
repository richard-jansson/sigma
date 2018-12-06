var curr;
var pword="";
var cword="";

function __drawString(s){
	var tdim=ctx.measureText(s);

	this.ctx.strokeStyle=this.style;
	this.ctx.font="24px PressStart2P";

	if( tdim.width + this.x > 640 ){
		this.x=this.x0;
		this.y+=36;
	}
	if( 36 + this.y> this.h+this.y0){
		this.clear();
	}
	this.ctx.strokeText(s,this.x,this.y+36);
	var tdim=ctx.measureText(s);
	this.x+=tdim.width;
}

function __clearString(){
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
	this.x=this.x0;
	this.y=this.y0;
}

function textArea(ctx,x,y,w,h,style){
	return {ctx:ctx,x0:x,y0:y,w:w,h:h,print:__drawString,x:x,y:y,style:style,
		clear:__clearString};
}


function doWord(){
	var i=curr.indexOf(" ");
	var w=curr.substr(0,i+1);

	curr=curr.substr(i+1);
	
	gametext.print(w);
	cword=w;
}

function init(){
	console.log("init");
	var canvas=document.getElementById("canvas");

	ctx=canvas.getContext("2d");

	curr=levels[0][0];		

	gametext=new textArea(ctx,36,36,640,480-36*4,"white");
	playertext=new textArea(ctx,36,480-36*2,640,480-36*4,"red");

	doWord();
//	setInterval(doWord,100);
}

function doKey(key){
	console.log(key);		

	playertext.print(key);

	pword+=key;
	
	console.log(pword+" = "+cword);

	var pmatch=cword.substr(0,pword.length);	
	if(pmatch == pword){
		console.log("partial match...");
	}

	if(pword.toLowerCase() == cword.substr(0,cword.length-1).toLowerCase() || cword==" "){
		console.log("Match!");
		doWord();
		pword="";
		playertext.clear();
	}
}

function doDelete(){
	if(pword.length<1) return;
	pword=pword.substr(0,pword.length-1);

	playertext.clear();
	playertext.print(pword);
}

document.onkeyup=function(e){ 
	tmp=e; 
	if(e.key=="Backspace") doDelete();
	if(e.key.length<3) doKey(e.key)
};

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) init();
else document.addEventListener("DOMContentLoaded",init);
