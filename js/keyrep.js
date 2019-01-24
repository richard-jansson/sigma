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
 * Override repetition code 
 *
 * Stores interval id's in repeats array 
 * 	code -> id
 */ 

function __rep_start(e,code){
	if(typeof(this.repeats[code])=="undefined"){
		console.log("starting repeat "+KB_INT+"ms int on "+code);
		this.repeats[code]=1;
		e.sigma_int=true;
		intid=setInterval(this.keyrep,KB_INT,{o:this,ev:e});
		console.log("intid="+intid);
		this.repeats[code]=intid;
	}
}

function __rep_stop(code){
	if(typeof(this.repeats[code])!="undefined"){
		clearInterval(this.repeats[code]);
		delete this.repeats[code];

		console.log("stopped repeating "+code);
	}
}

function __rep_wrap(o){
	var t=o.o;
	t.keydown(o.ev);
}
