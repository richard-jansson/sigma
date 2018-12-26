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
function __drawString(s){
	var tdim=ctx.measureText(s);

//	this.ctx.fillStyle="black";
//	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);

	this.ctx.strokeStyle=this.style;
	this.ctx.fillStyle=this.style;

	if(DEBUG_OUTLINE) this.ctx.strokeRect(this.x0,this.y0,this.w,this.h);
	this.ctx.font=this.fontsize+"px "+font_family;

	if(32+ tdim.width + this.x > this.w+this.x0 ){
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
		
		if(this.fill) 
			this.ctx.fillText(s,this.x+x,this.y+this.fontsize);
		else this.ctx.strokeText(s,this.x+x,this.y+this.fontsize);
	}else if(!this.fill) this.ctx.strokeText(s,this.x,this.y+this.fontsize);
	else this.ctx.fillText(s,this.x,this.y+this.fontsize);

	var tdim=ctx.measureText(s);
	this.x+=tdim.width;
}
