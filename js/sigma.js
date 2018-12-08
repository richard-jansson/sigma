var curr;
var pword="";
var cword="";
var paragraph=0;
var level=0;
var n_levels=0;
var dkeys=["W","D","S","A"];
var sel_m=["J","O"];
var rst="SHIFT";
var bcksp="SPACE";
var PRED_LEN=12;
var N=4,M=2;
var tree=false;
var W=1024;
var H=768;
var ANIMT=30;
var FPS=60;
var input_lock=false;
var input_queue=[];
var f_top=0;
var setc;
var ptot="";
var show_keys=false;

// frequency profile data
var freq_prof={};

var words=0;
var t0;

var hit;

function __drawString(s){
	var tdim=ctx.measureText(s);

	this.ctx.strokeStyle=this.style;
	this.ctx.font=this.fontsize+"px Sans";

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

function doAnalysis(text,depth){
	console.log("analysis on "+text.length+" depth: "+depth);
	for(var p=0;p<text.length-depth-1;p++){
		var cs=text.substr(p,depth).toLowerCase();
		var c=text.charAt(p+depth).toLowerCase();

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
		if(k==" ") continue;
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


var num_nodes=0;

function setToTree(set,n,m){
	var ret=[];

	var queue=[];

	for(var i=0;i<n;i++){
		var v=set.shift();
		if(typeof(v)=="undefined") return ret;
		ret.push(v);
	}
	for(var i=0;i<m;i++){
		ret.push([]);
		queue.push(ret[n+i]);
	}

	while(queue.length){
		var curr=queue.shift();

		for(var i=0;i<n;i++){
			var v=set.shift();
			if(typeof(v)=="undefined") return ret;
			curr.push(v);
		}
		for(var i=0;i<m;i++){
			curr.push([]);
			queue.push(curr[n+i]);
		}
	}

	return ret;
}

function getFreqProf(){
			  var prof_t0=new Date();
	console.log("Generate frequency profile...");	
	for(var k in levels){
		var c=levels[k];
		for(var i=0;i<c.length;i++){
			for(var j=0;j<PRED_LEN;j++){
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

		console.log(s+"--"+a+":"+f+"/"+fm+" => "+fn+" | "+fn*mult);

		res=fn;

		mult*=Math.E;
	}
	console.log(res);

	fn=res;
	var l=Math.pow(Math.E,fn)/Math.E;
	var c=Math.floor(255*l);
	console.log(c);
	return "rgb(0,"+c+",0)";
}
	
function __render_tree(ctx,branch,x,y,n,m,fs,ao,ro){
	var i=0;
//	var r=72;
//	ctx.strokeStyle="green";
	ctx.strokeStyle="rgb(0,255,0)";
	ctx.font=fs+"px Sans";

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
		ctx.strokeStyle=getSymColor(ptot,branch[k]);

		ctx.strokeText(branch[k],x+dx,y+dy);

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

function __render_treeboard(tree,p){
	this.ctx.fillStyle=this.style;
	this.ctx.strokeStyle=this.style;

	var r=48;
	var x=this.w/2;
	var y=this.h;
	var N=4,M=2;
	var o=-Math.PI/2;
	
	this.ctx.font="24px Sans";
	if(typeof(p)=="undefined"){
		// rendering data 
		this.coords=[];
		x=this.w/2+this.x0;
		y=this.y0+this.h-48;
		this.coords.push({x:x,y:y,a:0});
	}else{
		x=p.x;
		y=p.y;
		o=p.a-Math.PI/2;
	}


	for(var i=0;i<N;i++){
		a=i*2*Math.PI/N+o;
		x0=Math.cos(a)*r+x;
		y0=Math.sin(a)*r+y;

		ctx.strokeStyle=getSymColor(ptot,tree[i]);
		
		var txt;
		if(show_keys) txt=dkeys[i]+":"+tree[i]
		else txt=tree[i];

		this.ctx.strokeText(txt,x0,y0);
	}

	

	o=Math.PI/4;
	o=0;
	o=-3*Math.PI/4;

	if(typeof(p)!="undefined"){
		o=p.a-3*Math.PI/4;
	}

//	y=this.y0+this.h
	
	var s2coords=[];
	
	for(var i=0;i<M;i++){
		a=o+i*2*Math.PI/4;	
		
		y0=Math.sin(a)*r*2;
		x0=Math.cos(a)*r*2;
		
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(x+x0,y+y0);
		this.ctx.stroke();

		s2coords.push({x:(x+x0),y:(y+y0),a:a});
		__render_tree(ctx,tree[4+i],x+x0,y+y0,N,M,48,a,r*2);

	}
		
	if(typeof(p)=="undefined"){
		this.coords.push(s2coords);
	}
	
}

function __anim_step(o){
//	console.log("frame:"+o.frame);	

	o.frame++;

	o.p.x+=o.avec.x;
	o.p.y+=o.avec.y;
	o.p.a+=o.avec.a;

//	console.log("render");
//	console.log(o.p);

	o.clear();
	console.log(o.p);
	o.render(tree,o.p);

	if(o.frame==FPS){
		clearInterval(o.intId);
		procInpQueue();
//		input_lock=false;
		o.frame=0;
//		o.coords=[];

		o.clear();
		o.render(tree);
	}
}

function __animate_treeboard(s,e){
	input_lock=true;

	var dx=(s.x-e.x)/FPS;
	var dy=(s.y-e.y)/FPS;
	var da=(s.a-e.a)/FPS;

	this.p=s;
	this.avec={x:-dx,y:-dy,a:-da};
	this.frame=0;

	this.clear();
	
	/*
	this.ctx.beginPath();
	this.ctx.moveTo(s.x,s.y);
	this.ctx.lineTo(e.x,e.y);
	this.ctx.stroke();

	this.ctx.beginPath();
	this.ctx.moveTo(s.x,s.y);
	this.ctx.lineTo(s.x+10,s.y);
	this.ctx.stroke();
	*/

	this.intId=setInterval(this.animstep,ANIMT/FPS,this);
}

function __tboard_clear(){
	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
}

function treeboard(ctx,x,y,w,h,style){
	return {ctx:ctx,
		render:__render_treeboard,
		anim:__animate_treeboard,
		animstep:__anim_step,
		x0:x,
		y0:y,
		w:w,
		h:h,
		style:style,
		clear:__tboard_clear,
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
	getFreqProf();

	hit=new Audio("bling.wav");
	err=new Audio("boop.wav");
	rot=new Audio("rotate.wav");

	for(var k in levels) n_levels++;

	console.log("init");
	var canvas=document.getElementById("canvas");

	ctx=canvas.getContext("2d");

	curr=levels[0][0];		

	t0=new Date();

	set=sortX(freq_prof[""]);	
	ftop=freq_prof[""][set[0]];
	tree=setToTree(set,N,M);

//	curr=genTraining(tree);

	wpm=new textArea(ctx,0,0,275,144,"green",144);
	wpmt=new textArea(ctx,0,144,275,72,"green",72);
	gametext=new textArea(ctx,280,36,W,36*6,"white");
	playertext=new textArea(ctx,36,H-72*1.5,W,72,"red",72,true);
	keyboard=new treeboard(ctx,36,H-36*14,W-36*2,36*10,"red");
	
	doWord();



	keyboard.render(tree);
//	setInterval(doWord,100);
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
		hit.play();
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
	code=e.code.toUpperCase();

	if(code==bcksp){
		console.log("delete...");
		doDelete();		
		e.preventDefault();
		return true;
	}
}

window.onkeyup=function(e){ 
	tmp=e;
	if(!input_lock) doInput(e);
	else {
		input_queue.push(e);
	}
}

function procInpQueue(){
	var ce=input_queue.shift();
	if(input_queue.length==0) input_lock=false;
	doInput(ce);
//	if(input_queue.length==0) input_lock=false;
}

function doInput(e){
	// Don't accept input during animation

	key=e.key.toUpperCase();
	
	if(key==rst){
		set=sortX(freq_prof[""]);	
		tree=setToTree(set,N,M);

		keyboard.clear();
		keyboard.render(tree);
		return;
	}
	
	var keyn=-1;
	for(var i=0;i<dkeys.length;i++){
		if(dkeys[i]==key) keyn=i; 
	}
//	console.log(key+" "+keyn);
	if(keyn!=-1){
		set=sortX(freq_prof[""]);	
//		playertext.print(tree[keyn]);
		doKey(tree[keyn]);

		set=sortX(freq_prof[""]);	
		tree=setToTree(set,N,M);

		keyboard.clear();
		keyboard.render(tree);
		return;
	}

	var keyn=-1;
	for(var i=0;i<dkeys.length;i++){
		if(sel_m[i]==key) keyn=i; 
	}
	if(keyn!=-1){
//		set=sortX(freq_prof[""]);	
//		tree=setToTree(set,N,M);
		// FIXME check
		if(tree[N+keyn].length==0){
			err.play();	
			return;
		}

		rot.play();

		tree=tree[N+keyn];

		var p0=keyboard.coords[1][keyn];
		var p1=keyboard.coords[0];

		p0.a=-0.39;
		p1.a=0;

		console.log("animate from "+JSON.stringify(p0)+" to "+ JSON.stringify(p1));

//		keybopard.
		keyboard.anim(p0,p1);
		

//		keyboard.render(tree);
	}
	
//	if(e.key.length<3) doKey(e.key)
};

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) init();
else document.addEventListener("DOMContentLoaded",init);
