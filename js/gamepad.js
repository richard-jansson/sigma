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

var axismap={
	// left stick on playstation
	"U":{0:-1,1:-1}, "O":{0: 1,1:-1},
	"H":{0:-1,1: 1}, ";":{0: 1,1: 1},
	// left stick on playstation
		"I":{0:0,1:-1}, 
	"J":{0: -1,1:0}, "L":{0:1,1:0},
		"K":{0:0,1: 1}
}


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
				if(i==7) window.onkeydown(e);
				else window.onkeyup(e);
			}
		}
		for(var i in axismap){
			var match=true;
			for(var axis in axismap[i]){
				var th=axismap[i][axis]*GAMEPAD_AXIS_TRESH;
				var v=axes[axis];
				
				var a=th*v;
				var b=Math.abs(v)-Math.abs(th);
				
				if(th ==0 && Math.abs(v) > (1.0-GAMEPAD_AXIS_TRESH)) {
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
				window.onkeyup(e);
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
