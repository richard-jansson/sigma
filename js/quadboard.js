function __render_quad(branch,dim,fs,d){
	var th=Math.floor(QUAD_TOPPAD*dim.h/100);
	var tr=Math.floor(QUAD_RPAD*dim.w/100);

	var w=Math.floor((100-QUAD_RPAD)*dim.w/(100*QUAD_COLS));
	var h=Math.floor((100-QUAD_TOPPAD)*dim.h/(100*QUAD_ROWS));
	var fs2=fs/QUAD_ROWS;

	for(var y=0;y<QUAD_ROWS;y++){
		for(var x=0;x<QUAD_ROWS;x++){
			var o=y*QUAD_ROWS+x;
			if(typeof(branch[o])=="string"){
				console.log("str"+branch[o]+" fs:"+fs);
				
				var tdim=this.ctx.measureText(branch[o]);
				var mleft=(w-tdim.width)/2
				var mtop=(h-fs)/2;
				mleft=mleft<0?0:mleft;
				mtop=mtop<0?0:mtop;

				var x0=dim.x+x*w+mleft;
				var y0=dim.y+(y)*h+fs-1*fs/5;

				this.ctx.strokeRect(dim.x+x*w,dim.y+y*h,w,h);
				this.ctx.font=fs+"px serif";
				this.ctx.fillText(branch[o],x0,y0,fs);
			}else if(typeof(branch[o])=="object"){
				var ndim={x:dim.x+x*w+tr,y:dim.y+y*h+th,w:w,h:h};
				if(!d){
					this.ctx.font=Math.floor(fs2/QUAD_ROWS)+"px serif";
					this.ctx.fillText(selq[o],dim.x+x*w+tr,dim.y+y*h+th);
				}
				this.__render_quad(branch[o],ndim,fs2/1.5,d+1);
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
	this.__render_quad(this.tree,dim,this.font_size*QUAD_ROWS,0);
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

	if(code==bcksp){
		doDelete();		
		return true;
	}
	return false;
}
// Code as string directly
function __qboard_kup(code){
	var keyn=has_el(code,selq);
//	console.log("select quad: "+keyn);
	
	if(code==rst) this.__rst();
		
	if(typeof(this.tree[keyn])=="string"){
		doKey(this.tree[keyn]);
		this.tree=this.otree;
		this.render();
	}else if(typeof(this.tree[keyn])=="object"){
		this.tree=this.tree[keyn];	
		this.render();
	}else{
		console.log("potential error...");
	}
}

function __qboard_rst(){
	this.tree=this.otree;
	this.render();
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
		otree: tree,
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
