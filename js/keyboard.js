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
 *  For reference a keyboard of the classical type is implemented
 * 
 */ 

function __render_keyboard(){
	// reset drawing style, perhaps move to render of parent
	this.ctx.fillStyle=this.style;
	this.ctx.strokeStyle=this.style;
   this.ctx.font=this.fs+"px serif";

	var max_n_col=0;
	for(var r=0;r<this.rows.length;r++){
			if(this.rows[r].length>max_n_col) max_n_col=this.rows[r].length;
	}

	var key_w=this.w/max_n_col;
	var key_h=this.h/this.rows.length;
	var y0=0,x0=0;

	for(var r=0;r<this.rows.length;r++){
		x0=(this.w-this.rows[r].length*key_w)/2; 
		for(var c=0;c<this.rows[r].length;c++){
			if(r==this.cur_y && c==this.cur_x){
				this.ctx.fillStyle="red";
				this.ctx.strokeStyle="black";
				this.ctx.fillRect(this.x0+x0,this.y0+y0,key_w,key_h);
				this.ctx.strokeText(this.rows[r][c],this.x0+x0+key_w/2,this.y0+y0+key_h/2); 		
			}else{
				this.ctx.fillStyle=this.style;
				this.ctx.strokeStyle=this.style;
				this.ctx.strokeRect(this.x0+x0,this.y0+y0,key_w,key_h);
				this.ctx.strokeText(this.rows[r][c],this.x0+x0+key_w/2,this.y0+y0+key_h/2); 		
			}
			x0+=key_w;
		}
		y0+=key_h;
	}
}

function __animate_keyboard(){
	// FIXME would it be fair, nice looking to implement
}

function __anim_stepkeyb(){
	// FIXME would it be fair, nice looking to implement
}

// perhaps best abstracted into superclass along with other box fundamentals
function __kboard_clear(){
	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
}


function __kboard_kup(code) {
	this.rep_stop(code);

	return false;
}

function __kboard_kdown(e) {
	code=e.code.toUpperCase();

	if(typeof(code)=="undefined") return false;
    signal=this.input.getSignal(code);
    console.log("Sig: " +signal);
    switch(signal){
        case "DELETE":
		    game.delSym();
            this.stat.logact("del");
            this.clear();
            this.render();
            return true;
            break;
        case "SELECT":
    		doKey(this.rows[this.cur_y][this.cur_x]);
            this.stat.logact("sel");
            this.clear();
            this.render();
    		return false;
            break;
        case "DOWN":
			this.cur_y = (this.cur_y+1 > 2) ? 2 : this.cur_y +1; 
			if(this.cur_x>=this.rows[this.cur_y].length){
				this.cur_x=this.rows[this.cur_y].length-1;
			}
            break;
        case "UP":
			this.cur_y = (this.cur_y-1 < 0) ? 0 : this.cur_y -1; 
			if(this.cur_x>=this.rows[this.cur_y].length){
				this.cur_x=this.rows[this.cur_y].length-1;
			}
            this.stat.logact("movenorth");
            break;
        case "LEFT":
            this.stat.logact("movewest");
            this.cur_x = (this.cur_x-1 < 0) ? 0 : this.cur_x -1; 
            break;
        case "RIGHT":
            this.stat.logact("moveeast");
			this.cur_x++;
			if(this.cur_x>=this.rows[this.cur_y].length){
				this.cur_x=this.rows[this.cur_y].length-1;
			}
            break;
    }
	this.clear();
	this.render();

    return false; 
    if(signal=="DELETE"){
		game.delSym();
        this.stat.logact("del");
		return true;
    } 
    if(signal=="SELECT"){
		doKey(this.rows[this.cur_y][this.cur_x]);
        this.stat.logact("sel");
		return false;
	}else {
		var code=e.key.toUpperCase();
		// Let the internal repeation handling do it's work
		if(typeof(this.repeats[code])!="undefined" && 
			typeof(e.sigma_int)=="undefined"
			&& this.native_repeat==false){
//			console.log("leave repeat for inhouse repetition...");
			return true;
		}

		if(kb_up==code || "GN"==code){
//			if(this.cur_y == 3) this.cur_x=4;
			this.cur_y = (this.cur_y-1 < 0) ? 0 : this.cur_y -1; 
			if(this.cur_x>=this.rows[this.cur_y].length){
				this.cur_x=this.rows[this.cur_y].length-1;
			}
            this.stat.logact("movenorth");
		} else if(kb_sel==code || "GSEL"==code){
		} else if(kb_dwn==code || "GS"==code){
            this.stat.logact("movesouth");
			this.cur_y = (this.cur_y+1 > 2) ? 2 : this.cur_y +1; 
			if(this.cur_x>=this.rows[this.cur_y].length){
				this.cur_x=this.rows[this.cur_y].length-1;
			}
// 		} 
//k		else if(kb_sel==code){
//			doKey(this.rows[this.cur_y][this.cur_x]);
//			return false;
//			if(this.cur_y==3) this.cur_x=0;
		} else if(kb_lft==code || "GW"==code){
            this.stat.logact("movewest");
            this.cur_x = (this.cur_x-1 < 0) ? 0 : this.cur_x -1; 
		}else if(kb_rgt==code || "GE"==code){
            this.stat.logact("moveeast");
			this.cur_x++;
			if(this.cur_x>=this.rows[this.cur_y].length){
				this.cur_x=this.rows[this.cur_y].length-1;
			}
		} else if(kb_sel==code || "GSEL"==code){
			doKey(this.rows[this.cur_y][this.cur_x]);
            this.stat.logact("sel");
			return false;
		}
		
		this.rep_start(e,code);

		this.clear();
		this.render();


		return false;
	}
}

function vkeyboard(stat,ctx,x,y,w,h,style,font_size,greek,russian){
    var input = new inputo("key");
    
	var enrows=[["q","w","e","r","t","y","u","i","o","p","'"],
		["a","s","d","f","g","h","j","k","l",":"],
		["z","x","c","v","b","n","m",",",".","?", "’"] ];
	var greekrows=[
		[";","ς","ε","ρ","τ","υ","ύ","θ","ι","ο","ό","π"],
		["α","σ","δ","φ","γ","η","ξ","κ","λ"],
		["ζ","χ","ψ","ω","β","ν","μ",","]];
	var russianrows=[
        ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ"],
        ["ф","ы","в","а","п","р","о","л","д","ж","э"],
        ["я","ч","с","м","и","т","ь","б",","]]

	var rows=typeof(greek)=="undefined"||greek==false?enrows:greekrows;

    if(typeof(russian)!="undefined" && russian!=false){
        rows=russianrows;
    }

	return {
        input: input,
        stat: stat,
		rows:rows,
		native_repeat: false,
		ctx:ctx,
		render:__render_keyboard,
		anim:__animate_keyboard,
		animstep:__anim_stepkeyb,
		x0:x, y0:y,
		w:w, h:h,
		style:style,
		fs:font_size,
		clear:__kboard_clear,
		keyup: __kboard_kup,
		keydown: __kboard_kdown,
		// cursor position 
		cur_x:2,cur_y: 2,
		// code -> intervalid
		repeats: [],
		rep_start: __rep_start,
		rep_stop: __rep_stop,
		keyrep:__rep_wrap
		}

}
