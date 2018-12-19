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
function __render_quadboard(p){

	// Clear what's previously been drawn 
	this.clear();
	// Set style of lines, basically color
	this.ctx.strokeStyle=this.style;
	this.ctx.fillStyle=this.style;

	// Draw a border rectangle around the keyboard 
	this.ctx.strokeRect(this.x0,this.y0,this.w,this.h);
	
	// Set font size and and font 
	this.ctx.font=this.font_size+" "+this.font;

	tmp=new Error();

	this.ctx.fillText("Render is stub", this.x0,this.y0+this.font_size);
	console.log("stub function");
}

function __animate_quadboard(s,e){
	console.log("stub");
}

function __clear_quadboard(){
	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
}

// here we receive the full js event
function __qboard_kdown(e){
	var code=e.code.toUpperCase();	

	console.log("stub");
}
// Code as string directly
function __qboard_kup(code){
	console.log("stub");
}

function __qboard_rst(){
	console.log("stub");
}

function __qboard_sel(n){
	console.log("stub");
}

function quadboard(freq_prof,target,ctx,x,y,w,h,style,fts,ft){
	set=sortX(freq_prof[""]);	
	ftop=freq_prof[""][set[0]];
//	tree=setToTree(set,N,M);

	return {ctx:ctx,
		font: ft,
		font_size: fts,
		freq_prof: freq_prof,
		set: set,
//		tree: tree,
		ftop: ftop,
		render:__render_quadboard,
		anim:__animate_quadboard,
//		animstep:__treeboard_anim_step,
		x0:x, y0:y,
		w:w, h:h,
		style:style,
		clear:__clear_quadboard,
		keydown: __qboard_kdown,
		keyup: __qboard_kup,
		// Handling keys called internally via key{up,down}
		__rst: __qboard_rst,
//		__sel_node:__qboard_sel_node,
//		__sel_branch:__qboard_sel_branch
		}
}
