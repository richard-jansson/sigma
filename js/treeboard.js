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
 *  Tree representation where each tree holds N leaves / symbols
 *  also they point to M branches whhich in turn might contain 
 *  up to N symbols/leaves and M branches, and so forth ad 
 *  infinitum. 
 * 
 *  o --- {0,1,...,N} 
 *     \_____________ {0,1,..N}_0
 *                |-- {0,1,..N}_1
 *                |-- ...
 *                \-- {0,1,..N}_M 
 * 
 */

function setToTree(set,n,m){
	var ret=[];

	var queue=[];

	for(var i=0;i<n;i++){
		var v=set.shift();
		if(typeof(v)=="undefined") return ret;
		ret.push(v);
	}
	for(var i=0;i<m;i++){
		ret.push([]);
		queue.push(ret[n+i]);
	}

	while(queue.length){
		var curr=queue.shift();

		for(var i=0;i<n;i++){
			var v=set.shift();
			if(typeof(v)=="undefined") return ret;
			curr.push(v);
		}
		for(var i=0;i<m;i++){
			curr.push([]);
			queue.push(curr[n+i]);
		}
	}

	return ret;
}
function __render_treeboard(p){
	this.ctx.fillStyle=this.style;
	this.ctx.strokeStyle=this.style;

	var r=54;
	var x=this.w/2;
	var y=this.h;
	var N=4,M=2;
	var o=-Math.PI/2;
	var fs=72;
	  
   this.ctx.font=fs+"px serif";
	if(typeof(p)=="undefined"){
		// rendering data 
		this.coords=[];
		x=this.w/2+this.x0;
		y=this.y0+this.h-fs;
		this.coords.push({x:x,y:y,a:0});
	}else{
		x=p.x;
		y=p.y;
		o=p.a-Math.PI/2;
	}


	  for(var i=0;i<N;i++){
		  a=i*2*Math.PI/N+o;
		  x0=Math.cos(a)*r+x;
		  y0=Math.sin(a)*r+y;

		ctx.font=getSymSize(ptot,this.tree[i],fs)+"px "+font_family;
		
		var txt;
		if(show_keys) txt=dkeys[i]+":"+this.tree[i]
		else txt=this.tree[i];

		if(getSymBold(ptot,tree[i])){
			ctxfillStyle=getSymColor(ptot,this.tree[i]);
			this.ctx.fillText(txt,x0,y0);
		}
		else{
			ctx.strokeStyle=getSymColor(ptot,this.tree[i]);
			this.ctx.strokeText(txt,x0,y0);
		}
	}

	

	o=Math.PI/4;
	o=0;
	o=-3*Math.PI/4;

	if(typeof(p)!="undefined"){
		o=p.a-3*Math.PI/4;
	}

//	y=this.y0+this.h
	
	var s2coords=[];
	
	for(var i=0;i<M;i++){
		a=o+i*2*Math.PI/4;	
		
		y0=Math.sin(a)*r*2;
		x0=Math.cos(a)*r*2;
		
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(x+x0,y+y0);
		this.ctx.stroke();

		s2coords.push({x:(x+x0),y:(y+y0),a:a});
		__render_tree(ctx,this.tree[4+i],x+x0,y+y0,N,M,fs,a,r*2);

	}
		
	if(typeof(p)=="undefined"){
		this.coords.push(s2coords);
	}
}

function __tboard_clear(){
	this.ctx.fillStyle="black";
	this.ctx.fillRect(this.x0,this.y0,this.w,this.h);
}

function __treeboard_anim_step(o){
	o.frame++;

	o.p.x+=o.avec.x;
	o.p.y+=o.avec.y;
	o.p.a+=o.avec.a;

	o.clear();
	o.render(o.p);

	if(o.frame==FPS){
		clearInterval(o.intId);
		procInpQueue();
		o.frame=0;

		o.clear();
		o.render();
	}
}
function __animate_treeboard(s,e){
	input_lock=true;

	var dx=(s.x-e.x)/FPS;
	var dy=(s.y-e.y)/FPS;
	var da=(s.a-e.a)/FPS;

	this.p=s;
	this.avec={x:-dx,y:-dy,a:-da};
	this.frame=0;

	this.clear();

	this.intId=setInterval(this.animstep,ANIMT/FPS,this);
}

// return value of true requests a prevention of bubbling 
// of said event
function __tboard_kdown(e){
	var code=e.code.toUpperCase();	

	if(code==bcksp){
		doDelete();		
		return true;
	}
	return false;
}

function __tboard_rst(){
	this.set=sortX(this.freq_prof[""]);	
	this.tree=setToTree(this.set,N,M);

	this.clear();
	this.render();
}

// select that is input leaf nr node_n 
function __tboard_sel_node(node_n){
	this.set=sortX(freq_prof[""]);	
	doKey(this.tree[node_n]);

	this.set=sortX(freq_prof[""]);	
	this.tree=setToTree(this.set,N,M);

	this.clear();
	this.render();
}

// select the branch_n:t branch  
function __tboard_sel_branch(branch_n){
	// FIXME check
	if(this.tree[N+branch_n].length==0){
		if(!mute) err.play();	
		return;
	}

	if(!mute) rot.play();

	this.tree=this.tree[N+branch_n];

	var p0=this.coords[1][branch_n];
	var p1=this.coords[0];

	// why??
	p0.a=-0.39;
	p1.a=0;

	console.log("animate from "+JSON.stringify(p0)+" to "+ JSON.stringify(p1));

	this.anim(p0,p1);
}

function __tboard_kup(code){
	var keyn=-1;

	if(key==rst) this.__rst();
	else if(-1!=(keyn=has_el(key,dkeys))) this.__sel_node(keyn);
	else if(-1!=(keyn=has_el(key,sel_m))) this.__sel_branch(keyn);

	// do not prevent event 
	return false;
}

function treeboard(freq_prof,target,ctx,x,y,w,h,style){
	set=sortX(freq_prof[""]);	
	ftop=freq_prof[""][set[0]];
	tree=setToTree(set,N,M);

	return {ctx:ctx,
		freq_prof: freq_prof,
		set: set,
		tree: tree,
		ftop: ftop,
		render:__render_treeboard,
		anim:__animate_treeboard,
		animstep:__treeboard_anim_step,
		x0:x, y0:y,
		w:w, h:h,
		style:style,
		clear:__tboard_clear,
		keydown: __tboard_kdown,
		keyup: __tboard_kup,
		// Handling keys called internally via key{up,down}
		__rst: __tboard_rst,
		__sel_node:__tboard_sel_node,
		__sel_branch:__tboard_sel_branch
		}
}

