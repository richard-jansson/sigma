function __lin_render(p){

	// Clear what's previously been drawn 
	this.clear();
	// Set style of lines, basically color
	this.ctx.strokeStyle=this.style;
	this.ctx.fillStyle=this.style;

	// Draw a border rectangle around the keyboard 
	this.ctx.strokeRect(this.x0,this.y0,this.w,this.h);
	
	this.font_size=24;
	// Set font size and and font 
	this.ctx.font=this.font_size+" "+this.font;

	tmp=new Error();

	var h=this.font_size;
	for(var y=0;y<this.set.length;y++){
		var yi=y+this.offset;
		if(this.y0+this.h < this.y0+(y+1)*h) break;
		if(typeof(this.set[yi])=="undefined") continue;
		this.ctx.font=this.font_size+"px "+this.font;
		this.ctx.fillText(this.set[yi],this.x0+64,this.y0+(y+1)*h);
	}
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
		keyrep:__rep_wrap
		}
}
