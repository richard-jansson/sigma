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

/* 
	On new game send configurations
		

 */ 

function usignal(e){
	var key=e.key.toUpperCase();
	var code=e.code.toUpperCase();
	var dir=e.type=="keydown"?"down":"up";

	return {t:new Date(),key:key,code:code,dir};
}

function boardsignal(type,val){
	return {t: new Date(),t:type,v:val};
}

function __render_stats(){
	if(!SHOW_STATS) return;
	this.clear();

	if(DEBUG_OUTLINE){
		this.ctx.strokeStyle="red";
		this.ctx.strokeRect(this.x0,this.y0,this.w+2,this.h+2);
	}

	this.raw.print("raw presses: "+this.rlog.length);
	this.acts.print("board actions: "+this.alog.length);
	this.wordstats.print("words: "+this.game.wordn);
	this.charstats.print("chars: "+
		this.game.charmatches
		+" hits:"+this.game.charmatches+" misses: "+this.game.charmisses);
}

function __addkey_stats(e){
	this.rlog.push(new usignal(e));		
}
function __addact_stats(a){
	this.alog.push(new boardsignal(a));		
}

function __clear_stats(){
	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);

	this.raw.clear();
	this.acts.clear();
	this.wordstats.clear();
	this.charstats.clear();
}

function stats(ctx,game,x,y,w,h,style,size){
	var fontsize=typeof(size)=="undefined"?36:size;
	var t0=new Date();	

	var fs=18;;

	var raw=new textArea(ctx,x,y+2*fs,w,fs,fs,false);
	var acts=new textArea(ctx,x,y+2*2*fs,w,fs,fs,false);
	var wordstats=new textArea(ctx,x,y+3*2*fs,w,fs,fs,false);
	var charstats=new textArea(ctx,x,y+4*2*fs,w,fs*2,fs,false);
	
	return {
		rlog: [],alog: [],
		t0: t0,
		game: game,
		ctx:ctx,
		x0:x,
		y0:y,
		w:w,
		h:h,
		clear: __clear_stats,
		render: __render_stats,
		// log raw
		logkey: __addkey_stats,
		// log action
		logact: __addact_stats,
		// all the text fields 
		raw: raw,
		acts: acts,
		wordstats: wordstats,
		charstats: charstats
		}
}
