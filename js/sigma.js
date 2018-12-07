var curr;
var pword="";
var cword="";
var paragraph=0;
var level=0;
var n_levels=0;
var dkeys=["W","D","S","A"];

// frequency profile data
var freq_prof={};

var words=0;
var t0;

var hit;

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

function doAnalysis(text,depth){
	console.log("analysis on "+text.length+" depth: "+depth);
	for(var p=0;p<text.length-depth-1;p++){
		var cs=text.substr(p,depth).toLowerCase();
		var c=text.charAt(depth).toLowerCase();

		if(typeof(freq_prof[cs])=="undefined"){
			freq_prof[cs]={};
			freq_prof[cs][c]=1;
		}else if(typeof(freq_prof[cs][c])=="undefined"){
			freq_prof[cs][c]=1;	
		}else{
			freq_prof[cs][c]++;
		}
	}
}

function sortX(o){
	list=[];
	for(var k in o){
		list[k]=o[k];
	}
	var max=-1000;	
	var max_k=false;
	sorted=[];
	var n=0;
	for(var k in list) n++;

	while(n){
		max=-1000;
		for(var k in list){
			if(list[k] > max){
				max=list[k];
				max_k=k;
			}
		}
		sorted.push(max_k);
		delete list[max_k];
		n--;
	}
	
	return sorted;
}

function getFreqProf(){
	var prof_t0=new Date();
	console.log("Generate frequency profile...");	
	for(var k in levels){
		var c=levels[k];
		for(var i=0;i<c.length;i++){
			for(var j=0;j<3;j++){
				doAnalysis(c[i],j);
			}
		}
	}
	console.log("Profile generated in "+(new Date()-prof_t0) + "ms");
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

function __render_treeboard(){
	this.ctx.fillStyle=this.style;
	this.ctx.strokeStyle=this.style;
	this.ctx.strokeRect(this.x0,this.y0,this.w,this.h);

	set=sortX(freq_prof[""]);	

	var r=this.h/4;
	var x=this.h/2;
	var y=this.h/2;
	var N=4;
	var o=-Math.PI/2;

	for(var i=0;i<N;i++){
		a=i*2*Math.PI/N+o;
		x0=Math.cos(a)*r+y+this.x0;
		y0=Math.sin(a)*r+y+this.y0;

//		this.ctx.fillRect(x0,y0,10,10);

		this.ctx.strokeText(dkeys[i]+":"+set[i],x0,y0);
	}

}

function treeboard(ctx,x,y,w,h,style){
	return {ctx:ctx,
		render:__render_treeboard,
		x0:x,
		y0:y,
		w:w,
		h:h,
		style:style
		}
}

function init(){
	getFreqProf();

	hit=new Audio("bling.wav");

	for(var k in levels) n_levels++;

	console.log("init");
	var canvas=document.getElementById("canvas");

	ctx=canvas.getContext("2d");

	curr=levels[0][0];		

	t0=new Date();

	wpm=new textArea(ctx,0,0,640,36,"green");
	gametext=new textArea(ctx,36,36,640,480-36*4,"white");
	playertext=new textArea(ctx,36,480-36*6,640,480-36*4,"red");
	
	keyboard=new treeboard(ctx,36,480-36*4,640-36*2,36*3,"red");
	
	doWord();

	keyboard.render();
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

	return;

	playertext.print(key);

	pword+=key;
	
	console.log("{"+pword+"} = {"+cword+"}");

	var pmatch=cword.substr(0,pword.length);	
	if(pmatch == pword){
		console.log("partial match...");
	}

	if(pword.toLowerCase() == cword.trimEnd().toLowerCase()){
		hit.play();
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

//	playertext.clear();
//	playertext.print(pword);
}

document.onkeyup=function(e){ 
	tmp=e; 

	key=e.key.toUpperCase();
	
	var keyn=-1;
	for(var i=0;i<dkeys.length;i++){
		if(dkeys[i]==key) keyn=i; 
	}
//	console.log(key+" "+keyn);
	if(keyn!=-1){
		set=sortX(freq_prof[""]);	
		playertext.print(set[keyn]);
	}
	
	if(e.key.length<3) doKey(e.key)
};

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) init();
else document.addEventListener("DOMContentLoaded",init);
