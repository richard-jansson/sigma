var levels=["Tutorial",
			  "Wuthering heights",
			  "ΙΛΙΑΔΑ",
			  "道德經"];

function splitWord(inp,n){
	var t=inp.split(" ");		
	if(n>=t.length) return undefined;
	return t[n];
}

function nxtWord(){
	var nxt=this.splitWord(this.curr,this.wordn);
	if(typeof(nxt)=="undefined") return undefined;

	while(nxt.length==0){
		 nxt=this.splitWord(this.curr,this.wordn+1);
		 if(typeof(nxt)=="undefined") return undefined;
		 this.wordn++;
	}

	return nxt;
}

function __get_args(){
	var search=window.location.search.substr(1);
	var tmp=search.split("&");
	var args=[];
	for(var k in tmp){
		var pair=tmp[k].split("=");	
		args[pair[0]]=pair[1];
	}
	return args;
}

function __onMatch(){
	console.log("match");

	this.input="";

//	var nxtwrd=splitWord(this.curr,this.wordn+1);
//	this.wordn++;
	
	this.wordn++;
	var nxtwrd=this.nxtWord();

	if(typeof(nxtwrd)!="undefined"){
		this.cword=nxtwrd;	
//		this.wordn++;
	}else if(typeof(this.content[this.leveln][this.paragraphn+1])!="undefined"){
		this.paragraphn++;
		this.curr=this.content[this.leveln][this.paragraphn];
		this.wordn=0;
		this.cword=this.nxtWord();
	} else if(typeof(this.content[this.leveln+1][0])!="undefined"){
		this.curr=this.content[this.leveln][0];
		this.wordn=0;
		this.cword=this.nxtWord();
		this.leveln++;	
		this.paragraph=0;
	}else{
		console.log("YOU WON");
	}

	this.matchcback();
}

function __onPartial(){
	console.log("partial match");

	this.partialcback();
}

function addSym(sym){
	if(this.input.length>37) return;

	this.input+=sym;

	if(this.cword.substr(0,pword.length).toLowerCase()==this.input.toLowerCase()) 
		this.onPartial();

	if(this.input.toLowerCase()==this.cword.trimEnd().toLowerCase())
		this.onMatch();
}

function delSym(){
	var l=this.input.length;
	l--;
	var a=l;
	l=l<0?0:l;
	this.input=this.input.substr(0,l);

	this.delcback(!(a<0));
}

function gamexx(match,partial,del){
	var args=__get_args();
	var level=parseInt(args["l"]);

	console.log("level=" + level);
	
	if(typeof(books[level])=="undefined") {
//		alert("No such level: "+level);
//		window.location.pathname="/start.html";
		throw "Level "+level+" does not exist";
	}
	
	// current input word 
	var input="";
	// all that the player has written
	// used for statistical prediction
	var ptot=false;

	var leveln=0;
	var paragraphn=0;
	var wordn=0;

	var curr=books[level][leveln][paragraphn];
	var cword=splitWord(curr,wordn);

	var lowercase=true;
	if(typeof(books[level].lowercase)!="undefined" && !books[level].lowercase)
		lowercase=false;

	return {
		lowercase:lowercase, 
		curr: curr,
		level:level,
		leveln:leveln,
		paragraphn:paragraphn,
		wordn:wordn,
		content:books[level],
		freq_prof:books[level].freq_prof,
		greek: typeof(books[level].greek)!="undefined"&&books[level].greek,
		nxtWord: nxtWord,
		splitWord: splitWord,
		addSym:addSym,
		delSym:delSym,
		partialcback: partial,
		matchcback: match,
		delcback: del,
		onPartial:__onPartial,
		onMatch: __onMatch,
		cword: cword,
		input:input,ptot: ptot};
}
