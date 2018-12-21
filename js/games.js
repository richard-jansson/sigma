var levels=["Tutorial",
			  "Wuthering heights",
			  "ΙΛΙΑΔΑ",
			  "道德經"];

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

function gamexx(){
	var args=__get_args();
	var level=parseInt(args["l"]);

	console.log("level=" + level);
	
	if(typeof(books[level])=="undefined") throw "Level "+level+" does not exist";

	return {level:level,content:books[level]};
}
