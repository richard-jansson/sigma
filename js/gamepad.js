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

var gpads=[];

var buttomap={
	0:"K",
	1:"L",
	2:"J",
	3:"I",

	6:"N",
	7:"SPACE",
	
	12:"U",
	15:"O",
	13:";",
	14:"H"};

// lefthanded
/*
var axismap={
	// left stick on playstation
	"U":{0:-1,1:-1}, "O":{0: 1,1:-1},
	"H":{0:-1,1: 1}, ";":{0: 1,1: 1},
	// left stick on playstation
		"I":{0:0,1:-1}, 
	"J":{0: -1,1:0}, "L":{0:1,1:0},
		"K":{0:0,1: 1}
}
*/

// the right hand path
var axismap={
	// left stick on playstation
	"U":{2:-1,3:-1}, "O":{2: 1,3:-1},
	"H":{2:-1,3: 1}, ";":{2: 1,3: 1},
	// left stick on playstation
		"I":{2:0,3:-1}, 
	"J":{2: -1,3:0}, "L":{2:1,3:0},
		"K":{2:0,3: 1}
}

var axis_val=[];

function pollgamepads(){
	var npads=navigator.getGamepads();
	for(var k in gpads){
		var ind=gpads[k];
		gpad=npads[ind];

		var buttons=gpad.buttons;
		var axes=gpad.axes;
		tbut=buttons;
		for(var i in buttomap){
			if(typeof(buttons[i])=="undefined") continue;
			if(buttons[i].pressed){
				console.log(buttomap[i]);
				var e={key:buttomap[i],code:buttomap[i]};
				console.log(buttomap[i]);
				// FIXME
				if(i==7) window.onkeydown(e);
				else window.onkeyup(e);
			}
		}

		axis_val=axes;

		for(var i in axismap){
			var match=true;
			for(var axis in axismap[i]){
				var th=axismap[i][axis]*GAMEPAD_AXIS_TRESH0;
				var v=axes[axis];
				
				var a=th*v;
				var b=Math.abs(v)-Math.abs(th);
				
				if(th ==0 && Math.abs(v) > (GAMEPAD_AXIS_TRESH1)) {
					match=false;
					break;
				}

				if(a<0 || b<0) {
					match=false;
					break;
				}
			}
			if(match){
				console.log(i);
				var e={key:i,code:i};
				// FIXME
				if(i==7) window.onkeydown(e);
				else window.onkeyup(e);
			}
		}
			
	}
}

function initgamepad(){
	window.addEventListener("gamepadconnected",function(e){
		console.log("Got gamepad");
		tmp=e;
		console.log(e);

		gpads.push(e.gamepad.index);

	});

	window.addEventListener("gamepaddisconnected",function(e){
		var ind=e.gamepad.index;
		for(var k in gpads){
			if(ind==gpads[k]) delete(gpads[k]);
		}
	});
	setInterval(pollgamepads,GAMEPAD_POLL_INT);
}

function __render_vect(c,x,y,mx,my){
	var x=this.x1+x*this.r;
	var y=this.y1+y*this.r;
	var mxd=mx*this.r;
	var myd=my*this.r;
	
	ctx.strokeStyle=c;

	this.ctx.beginPath();
	this.ctx.moveTo(this.x1,this.y1);
	this.ctx.lineTo(x,y);
	this.ctx.stroke();

	if(typeof(mx)!="undefined"){
		this.ctx.beginPath();
		this.ctx.moveTo(x-mxd,y-myd);
		this.ctx.lineTo(x+mxd,y+myd);
		this.ctx.stroke();
	}
}

function __clear_axe(){
	if(!SHOW_AXIS) return;

	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
}

function __render_axe(){
	if(!SHOW_AXIS) return;
	this.clear();

	if(DEBUG_OUTLINE){
		this.ctx.strokeStyle="red";
		this.ctx.strokeRect(this.x0,this.y0,this.w+2,this.h+2);
	}
	
	this.vect("blue",0,GAMEPAD_AXIS_TRESH0,GAMEPAD_AXIS_TRESH1,0);
	this.vect("green",0,-GAMEPAD_AXIS_TRESH0,GAMEPAD_AXIS_TRESH1,0);

	this.vect("yellow",GAMEPAD_AXIS_TRESH0,0,0,GAMEPAD_AXIS_TRESH1);
	this.vect("red",-GAMEPAD_AXIS_TRESH0,0,0,GAMEPAD_AXIS_TRESH1);
	
	var xA=axis_val[this.ind[0]];
	var yA=axis_val[this.ind[1]];

	console.log(xA+" / "+yA);

	this.vect("orange",xA,yA);
}

// visualize axes  
function gaxes(ctx,x,y,w0,h0,ind){
	var x1=x+w0/2;
	var y1=y+h0/2;
	var r=Math.min(w0/2,h0/2)*0.9;

	return {
		x0:x,y0:y,
		x1:x1,y1:y1,
		w:w0,h:h0,
		r:r,
		ind:ind,
		ctx:ctx,clear:__clear_axe,render:__render_axe,vect:__render_vect};
}
