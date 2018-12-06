var curr;
var pword="";
var cword="";
var paragraph=0;
var level=0;
var n_levels=0;

var words=0;
var t0;

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

	if(curr.length==0) curr=levels[level][++paragraph];
	if(curr.length==0) curr=levels[++level][0];
	if(curr.length==0) {
		// FIXME 
		console.log("GaMe OvEr!");
	}


	curr=curr.substr(i+1);
	
	gametext.print(w);
	cword=w;
}

function init(){
	for(var k in levels) n_levels++;

	console.log("init");
	var canvas=document.getElementById("canvas");

	ctx=canvas.getContext("2d");

	curr=levels[0][0];		

	t0=new Date();

	wpm=new textArea(ctx,0,0,640,36,"green");
	gametext=new textArea(ctx,36,36,640,480-36*4,"white");
	playertext=new textArea(ctx,36,480-36*2,640,480-36*4,"red");

	doWord();
//	setInterval(doWord,100);
}

function doWPM(){
	words++;
	var t=new Date();
	var dt=(t-t0)/1000;
	var wps=words/dt;

	wpm.clear();
	wpm.print( Math.floor(wps*60) +" WPM Lvl: "+(level+1)+"/"+n_levels +" "+Math.ceil(100*paragraph/levels[level].length)+"%");
}

function doKey(key){
	console.log(key);		

	playertext.print(key);

	pword+=key;
	
	console.log("{"+pword+"} = {"+cword+"}");

	var pmatch=cword.substr(0,pword.length);	
	if(pmatch == pword){
		console.log("partial match...");
	}

	if(pword.toLowerCase() == cword.trimEnd().toLowerCase()){
		console.log("Match!");
		doWord();
		pword="";
		playertext.clear();
		
		doWPM();
	}
	while(cword.trim().length == 0) doWord();
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
