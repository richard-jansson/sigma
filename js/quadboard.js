function __render_quad(branch,dim,fs){
	var w=dim.w/QUAD_COLS;
	var h=dim.h/QUAD_ROWS;
	var fs2=fs/QUAD_ROWS;

	for(var y=0;y<QUAD_ROWS;y++){
		for(var x=0;x<QUAD_ROWS;x++){
			var o=y*QUAD_ROWS+x;
			if(typeof(branch[o])=="string"){
				console.log("str"+branch[o]+" fs:"+fs);
				this.ctx.strokeRect(dim.x+x*w,dim.y+y*h,w,h);
				this.ctx.fillText(branch[o],dim.x+x*w,dim.y+(y+1)*h,fs);
			}else if(typeof(branch[o])=="object"){
				var ndim={x:dim.x+x*w,y:dim.y+y*h,w:w,h:h};
				this.__render_quad(branch[o],ndim,fs2);
			}
		}
	}
}

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

//	this.ctx.fillText("Render is stub", this.x0,this.y0+this.font_size);
	console.log("stub function");

	var dim={x:this.x0,y:this.y0,w:this.w,h:this.h};
	this.__render_quad(this.tree,dim,this.font_size);
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
	var keyn=has_el(code,selq);
	console.log("select quad: "+keyn);
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
	tree=maketree(set,QUAD_ROWS,QUAD_COLS);

	return {ctx:ctx,
		font: ft,
		font_size: fts,
		freq_prof: freq_prof,
		set: set,
		tree: tree,
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
		__render_quad: __render_quad
		}
}
