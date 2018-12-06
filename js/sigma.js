var curr;
var x=0;
var y=0;

function doWord(){
	var i=curr.indexOf(" ");
	var w=curr.substr(0,i+1);

	curr=curr.substr(i+1);


	var tdim=ctx.measureText(w);
	console.log(x+","+y);
	console.log(tdim.width + " " + tdim.height);
	if( tdim.width + x > 640 ){
		x=36;
		y+=36;
	}
	if( 36 + y> 480){
		ctx.fillRect(0,0,640,480);
		x=36;
		y=36;
	}
	ctx.strokeText(w,x,y);
	x+=tdim.width;
}

function init(){
	console.log("init");
	var canvas=document.getElementById("canvas");

	x=36;
	y=36;

	ctx=canvas.getContext("2d");

	ctx.strokeStyle="white";

	ctx.font="24px PressStart2P";

	curr=levels[0][0];		

	setInterval(doWord,500);
}

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) init();
else document.addEventListener("DOMContentLoaded",init);
