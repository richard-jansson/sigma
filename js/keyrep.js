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
	console.log("keyrep");
	t.keydown(o.ev);
}
