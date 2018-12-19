var curr;
var pword="";
var cword="";
var paragraph=0;
var level=0;
var n_levels=0;
var PRED_LEN=3;
var W=1024;
var H=768;
var input_lock=false;
var input_queue=[];
var f_top=0;
var setc;
var ptot="";
var show_keys=false;
var font_family="serif";
var keyboard=false;

var avg_wordlength=false;

var words=0;
var t0;

var hit;

function __drawString(s){
	var tdim=ctx.measureText(s);

	this.ctx.strokeStyle=this.style;
	this.ctx.font=this.fontsize+"px "+font_family;

	if( tdim.width + this.x > W ){
		this.x=this.x0;
		this.y+=this.fontsize;
	}
	if( this.fontsize + this.y> this.h+this.y0){
		this.clear();
	}
	if(this.center_text){
		var tdim=ctx.measureText(s);
		var x=(this.w-tdim.width)/2;		
		if(x<0) x=0;
		this.clear();
		this.ctx.strokeText(s,this.x+x,this.y+this.fontsize);
	}else this.ctx.strokeText(s,this.x,this.y+this.fontsize);

	var tdim=ctx.measureText(s);
	this.x+=tdim.width;
}

function __clearString(){
	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
	this.x=this.x0;
	this.y=this.y0;
	this.cnt="";
}

function textArea(ctx,x,y,w,h,style,size,center){
	var fontsize=typeof(size)=="undefined"?36:size;
	var center_text=typeof(center)=="undefined"?false:center;
	return {ctx:ctx,x0:x,y0:y,w:w,h:h,print:__drawString,x:x,y:y,style:style,
		clear:__clearString,fontsize:fontsize,center_text:center_text,cnt:""};
}

function doAnalysis(freq_prof,text,depth){
//	console.log("analysis on "+text.length+" depth: "+depth);
	for(var p=0;p<text.length-depth-1;p++){
		var cs=text.substr(p,depth);
		var c=text.charAt(p+depth);

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

var num_nodes=0;


function getFreqProf(){
	freq_prof={};
  	var prof_t0=new Date();
	console.log("Generate frequency profile...");	
	for(var k in levels){
		var c=levels[k];
//		for(var i=0;i<c.length;i++){
		for(var j=0;j<PRED_LEN;j++){
			doAnalysis(freq_prof,c,j);
		}
//		}
	}
	console.log("Profile generated in "+(new Date()-prof_t0) + "ms");
	return freq_prof;
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

function getMax(freqs){
	var m=-1;
	for(var k in freqs) if(freqs[k] > m ) m=freqs[k];
	return m;
}

function getSymColor(pstr,a){
	var str=pstr.substr(0-PRED_LEN);
	var mult=Math.E;
	var s;
	var tot_s=0;
	var res;

	for(var i=0;i<=str.length;i++){
		if(i==0) s="";
		else s=str.substr(0-i);

		if(typeof(freq_prof[s])=="undefined") continue;
		if(typeof(freq_prof[s][a])=="undefined") continue;

		var fm=getMax(freq_prof[s]);
		var f=freq_prof[s][a];
		var fn=f/fm;

//		console.log(s+"--"+a+":"+f+"/"+fm+" => "+fn+" | "+fn*mult);

		res=fn;

		mult*=Math.E;
	}
//	console.log(a+":"+res);

	fn=res;
	var l=Math.pow(Math.E,fn)/Math.E;
	var c=Math.floor(255*l);
//	console.log(c);
	return "rgb(0,"+c+",0)";
}
function getSymBold(pstr,a){
	var str=pstr.substr(0-PRED_LEN);
	var mult=Math.E;
	var s;
	var tot_s=0;
	var res;

	for(var i=0;i<=str.length;i++){
		if(i==0) s="";
		else s=str.substr(0-i);

		if(typeof(freq_prof[s])=="undefined") continue;
		if(typeof(freq_prof[s][a])=="undefined") continue;

		var fm=getMax(freq_prof[s]);
		var f=freq_prof[s][a];
		var fn=f/fm;

//		console.log(s+"--"+a+":"+f+"/"+fm+" => "+fn+" | "+fn*mult);

		res=fn;

		mult*=Math.E;
	}
//	console.log(a+":"+res);

	fn=res;
	var l=Math.pow(Math.E,fn)/Math.E;
	var c=Math.floor(255*l);

	return l>0.8;
//	console.log(c);
//	return "rgb(0,"+c+",0)";
}
function getSymSize(pstr,a,fs){
	var str=pstr.substr(0-PRED_LEN);
	var mult=Math.E;
	var s;
	var tot_s=0;
	var res;

	for(var i=0;i<=str.length;i++){
		if(i==0) s="";
		else s=str.substr(0-i);

		if(typeof(freq_prof[s])=="undefined") continue;
		if(typeof(freq_prof[s][a])=="undefined") continue;

		var fm=getMax(freq_prof[s]);
		var f=freq_prof[s][a];
		var fn=f/fm;

//		console.log(s+"--"+a+":"+f+"/"+fm+" => "+fn+" | "+fn*mult);

		res=fn;

		mult*=Math.E;
	}
//	console.log(a+":"+res);

	fn=res;
	var l=Math.pow(Math.E,fn)/Math.E;
	return l*fs;

//	var c=Math.floor(255*l);
//	console.log(c);
//	return "rgb(0,"+c+",0)";
}
	
function __render_tree(ctx,branch,x,y,n,m,fs,ao,ro){
	var i=0;
//	var r=72;
//	ctx.strokeStyle="green";
	ctx.strokeStyle="rgb(0,255,0)";
	ctx.font=fs+"px "+font_family;

	for(var k in branch){
		if(typeof(branch[k])!="string") continue;
		if(i==n) break;


	   a=i*2*Math.PI/n - Math.PI/2;	
		dy=Math.sin(a)*ro/4;
		dx=Math.cos(a)*ro/4;
	
/*		var s=branch[k];
		var f=freq_prof["ha"][s]*Math.E*Math.E

		
		var fn=f/ftop;
		var l=Math.pow(Math.E,fn)/Math.E;
		var c=Math.floor(255*l);
		*/
		ctx.font=getSymSize(ptot,branch[k],fs)+"px "+font_family;

		if(!getSymBold(ptot,branch[k])){
			ctx.strokeStyle=getSymColor(ptot,branch[k]);
			ctx.strokeText(branch[k],x+dx,y+dy);
		} else {
			ctx.fillStyle=getSymColor(ptot,branch[k]);
			ctx.fillText(branch[k],x+dx,y+dy);
		}

		i++;
	}
	i=0;
	ctx.strokeStyle="blue";
//	o=-Math.PI/2;
//	o=-Math.PI;
//	o=0;
	o=-Math.PI/8;

	for(var k in branch){
		if(typeof(branch[k])!="object") continue;
		if(branch[k].length==0) continue;
//		a=o+i*2*Math.PI/4;	
		a=ao+o+ i*Math.PI/4;
		
		y0=Math.sin(a)*ro;
		x0=Math.cos(a)*ro;

//		console.log(x0+","+y0);
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(x+x0,y+y0);
		this.ctx.stroke();

		__render_tree(ctx,branch[k],x+x0,y+y0,n,m,3*fs/4,a,ro);	

		i++;
//		if(i==1) break;
	}
}






function genTraining(t){
	var ret="";
	for(var k in t){
		if(typeof(t[k])=="string") ret+=t[k]+" ";
		if(typeof(t[k])=="object") ret+=genTraining(t[k]);
	}
	return ret;
}

function init(){
	curr=genTraining();

	setInterval(doWPM,100);
	var freq_prof=getFreqProf();

	if(!mute){
		hit=new Audio("bling.wav");
		err=new Audio("boop.wav");
		rot=new Audio("rotate.wav");
	}

	for(var k in levels) n_levels++;

	console.log("init");
	var canvas=document.getElementById("canvas");

	ctx=canvas.getContext("2d");

//	curr=levels[0][0];		
// change of structure for the illiad
	curr=levels[0]

	t0=new Date();

//	curr=genTraining(tree);

	wpm=new textArea(ctx,0,0,275,144,"green",144);
	wpmt=new textArea(ctx,0,144,275,72,"green",72);
	gametext=new textArea(ctx,280,36,W,36*6,"white");
	playertext=new textArea(ctx,36,H-100,W,72,"red",72,true);

	if(typeof(treeboard)!="undefined") keyboard=new treeboard(freq_prof,playertext,ctx,36,H-36*17,W-36*2,36*15,"red");
	else if(typeof(vkeyboard)!="undefined") keyboard=new vkeyboard(ctx,36,H-36*12,W-36*4,36*10,"red",36);
	else if(typeof(quadboard)!="undefined") keyboard=new quadboard(freq_prof,playertext,ctx,36,H-36*12,W-36*4,36*10,"red",36,"serif");
	else if(typeof(linboard)!="undefined") keyboard=new linboard(freq_prof,playertext,ctx,36,H-36*12,W-36*4,36*10,"red",24,"serif");
	else  throw "Error!";
	
	doWord();

	keyboard.render();
}

function doWPM(){
//	words++;
	var t=new Date();
	var dt=(t-t0)/1000;
	var wpmi=Math.floor(60*words/dt);

	wpm.clear();

	if(wpmi<3) wpm.style="red";
	else if(wpmi<7) wpm.style="yellow";
	else wpm.style="green";

	wpm.print(wpmi);
	wpmt.clear();
	wpmt.print("WPM");
}

function doKey(key){

	ptot+=key;
	pword+=key;
	playertext.print(pword);
	
	console.log("{"+pword+"} = {"+cword+"}");

	var pmatch=cword.substr(0,pword.length);	
	if(pmatch == pword){
		console.log("partial match...");
	}

	if(pword.toLowerCase() == cword.trimEnd().toLowerCase()){
		if(!mute) hit.play();
		console.log("Match!");
		ptot+=" ";
		words++;
		doWPM();
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
	ptot=ptot.substr(0,ptot.length-1);

	playertext.clear();
	playertext.print(pword);
}

window.onkeydown=function(e){
	if(keyboard.keydown(e)) e.preventDefault();
}

window.onkeyup=function(e){ 
	if(!input_lock) doInput(e);
	else input_queue.push(e);
}

function procInpQueue(){
	var ce=input_queue.shift();
	if(input_queue.length==0) input_lock=false;
	else doInput(ce);
}

function doInput(e){
	key=e.key.toUpperCase();
	code=e.code.toUpperCase();
	
	if(keyboard.keyup(key,code)) e.preventDefault();
};

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) init();
else document.addEventListener("DOMContentLoaded",init);
