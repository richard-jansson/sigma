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

var urls=["/tree.html?l=","/quad.html?l=","/key.html?l=","/linear.html?l="];

function __menu_render(p){
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

  //	this.ctx.fillText("Render is stub", this.x0,this.y0+this.font_size);
  //	console.log("stub function");
	  
	  var h=this.font_size;
	  var y=0,i=0;
	  for(var k in this.cmenu){
		  y+=h*1.5;
		  this.ctx.font=this.font_size+"px "+this.font;
		  var txt=(i==this.cursor?"→":"    ")+k;
		  this.ctx.fillText(txt,this.x0+32,this.y0+y);
		  i++;
	  }
	  
  }

  function __animate_quadboard(s,e){
	  console.log("stub");
  }

  function __menu_clear(){
	  this.ctx.drawImage(bg,0,0);

	  this.ctx.fillStyle="rgba(0,0,0,0.5)";
	  this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
  }

  // here we receive the full js event
  function __menu_kdown(e){
	  var code=e.code.toUpperCase();	
	  var key=e.key.toUpperCase();	

	  if(code=="SPACE" || code=="ENTER"){
		  var i=0;

		  this.path.push(this.cursor);
		  for(var k in this.cmenu){
			  if(i==this.cursor) this.cmenu=this.cmenu[k];	
			  i++;

		  }
		  var mposts=0;
		  for(var k in this.cmenu) mposts++;
		  this.mposts=mposts;

		  this.cursor=0;
		  this.clear();
		  this.render();

		  if(!mute) rot.play();

		  console.log("cpath:");
	  
		  if(typeof(this.cmenu)=="number"){
			  console.log(typeof(this.cmenu));
			  console.log(this.path);

			  url= urls[this.cmenu]+this.path[1];

			  console.log("url:"+url);
			  setTimeout(function(){
				  window.location.href=window.location.origin+url;
			  },500)
		  }

		  return true;
	  }if(key=="W" || key=="ARROWUP"){
		  this.cursor=this.cursor-1;
		  if(this.cursor<0) this.cursor=this.mposts-1;

		  if(!mute) tih.play();
		  this.clear();
		  this.render();

		  return true;
	  }else if(key=="S" || key=="ARROWDOWN"){
		  this.cursor=(this.cursor+1)%this.mposts;
		  if(!mute) hit.play();
		  this.clear();
		  this.render();
		  return true;
	  }

	  return false;
  }

  // Code as string directly
  function __menu_kup(code){
  }

  function __menu_sel(n){
	  console.log("stub");
  }

  function gmenu(ctx,x,y,w,h,style,fts,ft){
	  var weapons={"tree":0,"quad":1,"classic":2,"linear":3};

	  var menu={"Start":
			  {
			  "Tutorial":weapons,
			  "Wuthering heights": weapons,
			  "ΙΛΙΑΔΑ":weapons
			  },
			  "Config":{},
			  "About":{}};
	var mposts=0;
	for(var k in menu) mposts++;
		

	return {
		path: [],
		ctx:ctx,
		font: ft,
		cmenu: menu,
		cursor: 0,
		mposts: mposts,
		font_size: fts,
		render:__menu_render,
		anim:__animate_quadboard,
		x0:x, y0:y,
		w:w, h:h,
		style:style,
		clear: __menu_clear,
		keydown: __menu_kdown,
		keyup: __menu_kup,
		// Handling keys called internally via key{up,down}
//		__rst: __qboard_rst,
//		__sel_node:__qboard_sel_node,
//		__sel_branch:__qboard_sel_branch
		}
}
