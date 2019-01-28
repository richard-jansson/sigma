/*
Sigma Text input experiment 
Copyright (C) 2018 Richard J. Jansson 

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

// ugly
var mute=cfg.general.mute;
var ANIMT=cfg.general.ANIMT;
var FPS=cfg.general.FPS;
var N_LEAVES=cfg.general.N_LEAVES;
var N_BRANCHES=cfg.general.N_BRANCHES;
var treeN1_mult=cfg.general.treeN1_mult;
var tree_rad_mult=cfg.general.tree_rad_mult;
var QUAD_COLS=cfg.general.QUAD_COLS;
var QUAD_ROWS=cfg.general.QUAD_ROWS;
var QUAD_TOPPAD=cfg.general.QUAD_TOPPAD;
var QUAD_RPAD=cfg.general.QUAD_RPAD;
var QUAD_N_SHALLOW=cfg.general.QUAD_N_SHALLOW;
var QUAD_N_DEEP=cfg.general.QUAD_N_DEEP;
var GAMEPAD_POLL_INT=cfg.general.GAMEPAD_POLL_INT;
var GAMEPAD_AXIS_TRESH0=cfg.general.GAMEPAD_AXIS_TRESH0;
var GAMEPAD_AXIS_TRESH1=cfg.general.GAMEPAD_AXIS_TRESH1;
var GAMEPAD_MIN_T=cfg.general.GAMEPAD_MIN_T;
var BTN_MIN_T=cfg.general.BTN_MIN_T;
var KB_INT=cfg.general.KB_INT;
var DEBUG_OUTLINE=cfg.general.DEBUG_OUTLINE;
var LINEAR_SPOKES=cfg.general.LiNEAR_SPOKES;
var SHOW_STATS=cfg.general.SHOW_STATS;
var SHOW_AXIS=cfg.general.SHOW_AXIS;

var weapon;
var canvas;
var ctx;
var tracks=[
"audio/amelodyforthosewhoseekthetruth_lo.mp3",
"audio/samsara_lo.mp3",
"audio/theauthorneverdies_lo.mp3",
"audio/telematixblackmoon.mp3"];
var tracks2=[
"audio/telematixblackmoon.mp3",
"audio/telematixflashback.mp3",
"audio/telematixkeepflying.mp3",
"audio/telematixblackmoon.mp3"];

var music=false;
var waiting=true;
var curr;
var pword="";
var cword="";
var paragraph=0;
var level=0;
var n_levels=0;
var PRED_LEN=5;
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
var game=false;
var freq_prof;
var stat=false;
var axes_l=false;
var axes_r=false;

var lowercase=true;

var sym_log_cache=[];

var avg_wordlength=false;

var words=0;
var t0;

var sess_id=false;

var hit;

function updateStats(){
    if(!sess_id) return;
    var xhr=new XMLHttpRequest();
    xhr.open('GET','stats.php?sid='+sess_id
        +'&tot='+game.chartot
        +'&match='+game.charmatches
        +'&acts='+stat.alog.length);
    xhr.send();
}

function updateStatsO(){
    var xhr=new XMLHttpRequest();
    xhr.open('GET','stats.php?uid='+user_id);

    xhr.onreadystatechange=function(){
        if(this.readyState!=XMLHttpRequest.DONE) return;
        console.log("ready state change");
        var ro=JSON.parse(this.response);
        if(ro.status!="success") return;
        sess_id=ro.sess_id;

        setInterval(updateStats,5000);
    }
    xhr.send();
}


function doAnalysis(freq_prof,inptext,depth){
	// Make prediction lower case and strip spaces as we don't use them
	if(lowercase) text=inptext.toLowerCase();
	else text=inptext;

	text=text.replace(/ /g,"");

	for(var p=0;p<text.length-depth-1;p++){
		var cs=text.substr(p,depth);
		var c=text.charAt(p+depth);

		if(typeof(c)=="undefined") continue;
		if(typeof(cs)=="undefined") continue;

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


function getFreqProf(cnt){
	freq_prof={};
  	var prof_t0=new Date();
	console.log("Generate frequency profile...");	
	for(var k in cnt){
		var c=cnt[k];
		for(var i=0;i<c.length;i++){
			for(var j=0;j<PRED_LEN;j++){
				doAnalysis(freq_prof,c[i],j);
			}
		}
	}
	console.log("Profile generated in "+(new Date()-prof_t0) + "ms");
	return freq_prof;
}

function doWord(){
	gametext.print(game.cword.toLowerCase());

/*	console.log("print: "+curr);
	gametext.print(curr);
	curr=levels[level][++paragraph];
	cword=curr;
	*/

/*	var i=curr.indexOf(" ");
	if(i==-1){
		ia=curr.indexOf("，");
		ib=curr.indexOf("。");
		i=ia<ib?ia:ib;
	}
	if(i!=-1) w=curr.substr(0,i+1);
	else{
		i=curr.length;
		w=curr;
	}


	if(curr.length==0) curr=levels[level][++paragraph];
	if(curr.length==0) curr=levels[++level][0];
	if(curr.length==0) {
		// FIXME 
		console.log("GaMe OvEr!");
	}
	
	gametext.print(w);
	cword=w;
	*/
}

function getMax(freqs){
	var m=-1;
	for(var k in freqs) if(freqs[k] > m ) m=freqs[k];
	return m;
}

function clearSymCache(){
	sym_log_cache=[];
}

function getSymLog(pstr,a){
	if(typeof(sym_log_cache[pstr+a])!="undefined") 
		return sym_log_cache[pstr+a];
	var str=pstr.substr(0-PRED_LEN);
	if(lowercase) str=str.toLowerCase();
	str=str.replace(" ","");

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

		res=fn;

		mult*=Math.E;
	}

	fn=res;
	var l=Math.pow(Math.E,fn)/Math.E;

	sym_log_cache[pstr+a]=l;

	return l;
}

function getSymColor(pstr,a){
	var l=getSymLog(pstr,a);
	var c=Math.floor(255*l);

	return "rgb(0,"+c+",0)";
}
function getSymBold(pstr,a){
	var c=Math.floor(255*l);
	var l=getSymLog(pstr,a);
	return l>0.8;
}
function getSymSize(pstr,a,fs){
	var l=getSymLog(pstr,a);
	return l*fs;
}

function genTraining(t){
	var ret="";
	for(var k in t){
		if(typeof(t[k])=="string") ret+=t[k]+" ";
		if(typeof(t[k])=="object") ret+=genTraining(t[k]);
	}
	return ret;
}

function delPtotSym(){
	var l=ptot.length;
	l--;
	l=l<0?0:l;
	ptot=ptot.substr(0,l);
}

function init(){
	curr=genTraining();

	if(!mute){
		tih=new Audio("gnilb.wav");
		hit=new Audio("bling.wav");
		err=new Audio("boop.wav");
		rot=new Audio("rotate.wav");
	}
	game=new gamexx(function(){
		if(!mute) hit.play();

		console.log("match");

		words++;
		
		gametext.print(" ");
		gametext.print(game.cword.toLowerCase());

		playertext.clear();
	},
	function(){
		if(!mute) hit.play();
	},function(l){
		// delete callback
		if(l) delPtotSym();
		playertext.print(this.input);
	}
	);


	// For the greek text we don't lowercase the letters	
	lowercase=game.lowercase;

	setInterval(doWPM,1000);
	setInterval(doAxes,50);

	if(typeof(game.freq_prof)=="undefined") 
		freq_prof=getFreqProf(game.content);
	else freq_prof=game.freq_prof;


	for(var k in levels) n_levels++;

	console.log("init");
	var canvas=document.getElementById("canvas");

	ctx=canvas.getContext("2d");

//	curr=levels[0][0];		
// change of structure for the illiad
//	curr=levels[0]
	curr=game.content[0][0];

	t0=new Date();

//	curr=genTraining(tree);

	wpm=new textArea(ctx,20,20,275-20,144,"green",144);
	wpmt=new textArea(ctx,20,20+144,275-20,72,"green",72);
	gametext=new textArea(ctx,300,36,(W-280)*0.8,36*3,"white");
	playertext=new textArea(ctx,300,36*4,(W-280)*0.8,102,"red",62,true); 
	stat=new stats(ctx,game,43+39*14,H-36*14,36*14-24,36*10,"red",18);

    if(is_loggedin) updateStatsO();

    if(SHOW_AXIS){
    	axes_l=gaxes(ctx,W/2+2*36,H-4*36+20,5*36,3*36,[0,1]);
	    axes_r=gaxes(ctx,W/2+7*36,H-4*36+20,5*36,3*36,[2,3]);
    }
	
	var weapon=0;
//	if(typeof(treeboard)!="undefined") keyboard=new treeboard(freq_prof,playertext,ctx,36,36,W-36*2,H-36,"red");
	if(typeof(treeboard)!="undefined"){
		weapon=0;
		keyboard=new treeboard(freq_prof,stat,playertext,ctx,0,H-36*14,36*15,36*14,"red",108,40);
	} else if(typeof(vkeyboard)!="undefined"){
		weapon=1;
		keyboard=new vkeyboard(stat,ctx,36,H-36*12,W-36*14,36*10,"red",36,game.greek);
	}
	else if(typeof(quadboard)!="undefined"){
		weapon=2;
		keyboard=new quadboard(stat,game,freq_prof,playertext,ctx,36,H-36*15,W-36*14,36*10,"red",108,"serif");
	} else if(typeof(linboard)!="undefined"){
		weapon=3;
		keyboard=new linboard(freq_prof,stat,playertext,ctx,36,H-36*15,W-36*14,36*13,"red",72,"serif");
	}
	else  throw "Error!";

	if(!mute){ 
		var track;
		if(weapon==0 || weapon == 3) track=tracks2[game.level];	
		else track=tracks[game.level];	

		music=new Audio(track);

		console.log("Playing: "+ track);
		music.addEventListener("ended",function(){
			this.currentTime=0;
			this.play();
		},false);

		music.play();
	}
	
    stat.render();
	doWord();

	keyboard.render();
}

function doAxes(){
	if(axes_l) axes_l.render();
	if(axes_r) axes_r.render();
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
	game.addSym(key);
	playertext.print(game.input);
	ptot+=key;

	stat.render();
}

function doDelete(){
	if(pword.length<1) return;
	pword=pword.substr(0,pword.length-1);
	ptot=ptot.substr(0,ptot.length-1);

	playertext.clear();
	playertext.print(pword);

	stat.render();
}

window.onkeydown=function(e){
	if(waiting) return;
	if(stat) stat.logkey(e);
	if(keyboard.keydown(e)  && typeof(e.preventDefault)=="function"){
        e.preventDefault();
    }
}

window.onkeyup=function(e){ 
	if(waiting){
		waiting=false;
		ctx.fillStyle="black";
		ctx.fillRect(0,0,W,H);

		init();
		return;
	}
	if(stat) stat.logkey(e);
	if(!input_lock) doInput(e);
	else input_queue.push(e);
}

function procInpQueue(){
	while(input_queue.length){
		if(input_lock) break;
		var ce=input_queue.shift();
		console.log("pulling from queue");
		if(typeof(ce)!="undefined") doInput(ce);
	}

	if(input_queue.length==0) input_lock=false;

//	if(typeof(ce)!="undefined") doInput(ce);

//	if(input_queue.length==0) input_lock=false;
}

function doInput(e){
	key=e.key.toUpperCase();
	code=e.code.toUpperCase();
	
	if(keyboard.keyup(key,code)) e.preventDefault();

	stat.render();
};
function inito(){
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	
	ctx.font="54px serif";
	ctx.fillStyle="white";
	ctx.fillText("Press any key to play",W*0.3,H/2);
	ctx.font="36px serif";
	ctx.fillText("music by nihilore and Telematix",W*0.5,3*H/4);

	initgamepad();
}

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) inito();
else document.addEventListener("DOMContentLoaded",inito);
