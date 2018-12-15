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
/*	if(typeof(this.repeats[code])!="undeifned"){
		clearInterval(this.repeats[code]);
		delete this.repeats[code];

		console.log("stopped repeating "+code);
	}
	*/

	return false;
}
/*function __kboard_rep(o){
	var t=o.o;
	console.log("keyrep");
	t.keydown(o.ev);
}
*/

function __kboard_kdown(e) {
	code=e.code.toUpperCase();

	if(typeof(code)=="undefined") return false;

	if(bcksp==code){
		doDelete();
		return true;
	} if(kb_sel==code){
		doKey(this.rows[this.cur_y][this.cur_x]);
		return false;
	}else {
		var code=e.key.toUpperCase();

		if(kb_up==code) this.cur_y = (this.cur_y-1 < 0) ? 0 : this.cur_y -1; 
		else if(kb_dwn==code) this.cur_y = (this.cur_y+1 > 3) ? 3 : this.cur_y +1; 
		else if(kb_lft==code) this.cur_x = (this.cur_x-1 < 0) ? 0 : this.cur_x -1; 
		else if(kb_rgt==code) this.cur_x = (this.cur_x+1 > 9) ? 9 : this.cur_x +1; 
		else if(kb_sel==code){
			doKey(this.rows[this.cur_y][this.cur_x]);
			return false;
		}
		
//		if(typeof(this.repeats[code])=="undefined"){
//			console.log("starting repeat "+KB_INT+"ms int on "+code);
//			intid=setInterval(this.keyrep,KB_INT,{o:this,ev:e});
//			console.log("intid="+intid);
//			this.repeats[code]=intid;
//		}

		this.clear();
		this.render();


		return false;
	}
}

function vkeyboard(ctx,x,y,w,h,style,font_size){
	return {
		rows:[
		["q","w","e","r","t","y","u","i","o","p"],
		["a","s","d","f","g","h","j","k","l",":"],
		["z","x","c","v","b","n","m",",",".","?"],
		[" "]
		],
//		keyrep:__kboard_rep,
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
//		repeats: []

		}

}
