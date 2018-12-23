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

function __spiral(){
	var x0=this.w/4+this.x0;
	var y0=this.h/2+this.y0;

	var r=this.h/2-this.font_size;

	var ao=Math.PI/4;
	var a=-Math.PI/2;

	var a0=a,a1=a;

	var x=x0+r*Math.cos(a0);
	var y=y0+r*Math.sin(a0);


	this.ctx.strokeStyle="green";	
	this.ctx.beginPath();
	this.ctx.moveTo(x0,y0);
	this.ctx.lineTo(x,y);
	this.ctx.stroke();
	this.ctx.strokeStyle="blue";	


	var ptota=ptot.trim();
	for(var i=0;i<this.set.length-this.offset;i++){
		var a0=a0-ao;
		var x=x0+r*Math.cos(a0);
		var y=y0+r*Math.sin(a0);

		this.ctx.beginPath();
		this.ctx.moveTo(x0,y0);
		this.ctx.lineTo(x,y);
		this.ctx.stroke();
		this.ctx.strokeStyle="red";	

		// The glyph itself ought to be in the middle of this
		var a1=a1-ao/2;
		var x2=x0+r*Math.cos(a1);
		var y2=y0+r*Math.sin(a1);

		var dx=x2-x0;
		var dy=y2-y0;
		var d=Math.floor(Math.sqrt(dx*dx+dy*dy))/4;

		this.ctx.font=d+"px serif";
		
		this.ctx.fillText(this.set[i+this.offset],x2,y2+d);
		
		ao*=0.95;
		r*=0.98;
			
//		if(i>8) break;
	}
}

function __lin_render(p){

	// Clear what's previously been drawn 
	this.clear();
	// Set style of lines, basically color
	this.ctx.strokeStyle=this.style;
	this.ctx.fillStyle=this.style;

	// Draw a border rectangle around the keyboard 
	this.ctx.strokeRect(this.x0,this.y0,this.w,this.h);
	
	var l=this.set.length;	

	var hf=this.font_size/2;
		
	tmp=new Error();

	var h=this.font_size;
	var yofs=0;
	for(var y=0;y<this.set.length;y++){
		var yi=y+this.offset;
		var div=y+1;
		var d=div*div;
		var fs=Math.floor(hf+hf/(d));

		if(this.y0+this.h < this.y0+yofs+fs) break;
		if(typeof(this.set[yi])=="undefined") continue;

		this.ctx.font=fs+"px "+this.font;

		yofs+=fs;

		this.ctx.fillText(this.set[yi],this.x0+64,this.y0+yofs);
	}

	this.spiral();
}

function __lin_anim(s,e){
	console.log("stub");
}

function __lin_clear(){
	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
}

// here we receive the full js event
function __lin_kdown(e){
	var code=e.key.toUpperCase();	
	var e_code=e.code.toUpperCase();	

	if(lin_up==code){
		this.offset=this.offset>1?this.offset-1:0;
		this.rep_start(e,code);
	}else if(lin_down==code){
		this.offset=this.offset>=this.set.length+this.set.length?this.length-1:this.offset+1;
	this.rep_start(e,code);
	}else if(lin_sel==code){
		doKey(this.set[this.offset]);	
		this.offset=0;
		this.clear();
		this.render();
		this.rep_start(e,code);
		return false;
	}else if(bcksp==code){
		doDelete();
		this.rep_start(e,code);
		return true;
	}else if(e_code==bcksp){
		console.log("deleeete!!");
		doDelete();
		return true;
	}
	
	var key=e.key.toUpperCase();

	this.clear();
	this.render();

	return false;
}
// Code as string directly
function __lin_kup(key,code){
	this.rep_stop(key);

	if(code==bcksp){
		console.log("deleeete!!");
		doDelete();
		return false;
	}
	if(key==rst){
		this.offset=0;
		this.clear();
		this.render();
		return true;
	}

	if(code==rst) this.__rst();
}

function __lin_rst(){
	this.offset=0;
	this.clear();

}

function __lin_sel(n){
	console.log("stub");
}

function linboard(freq_prof,target,ctx,x,y,w,h,style,fts,ft){
	var	set=sortX(freq_prof[""]);	
//	var ftop=freq_prof[""][set[0]];
//	tree=setToTree(set,N,M);
	var __offset=0;

	return {ctx:ctx,
		font: ft,
		font_size: fts,
		freq_prof: freq_prof,
		set: set,
//		tree: tree,
//		ftop: ftop,
		render:__lin_render,
		anim:__lin_anim,
		x0:x, y0:y,
		w:w, h:h,
		style:style,
		clear:__lin_clear,
		keydown: __lin_kdown,
		keyup: __lin_kup,
		offset: __offset,
		// Handling keys called internally via key{up,down}
		__rst: __lin_rst,
//		__sel_node:__qboard_sel_node,
//		__sel_branch:__qboard_sel_branch
		repeats: [],
		rep_start: __rep_start,
		rep_stop: __rep_stop,
		keyrep:__rep_wrap,
		spiral:__spiral
		}
}
