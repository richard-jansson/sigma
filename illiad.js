// Convert first "chapter" of the illiad to levels 
// each paragraph is a level or whatever...

illiad=require("./illiad_A.js").data;
var output={};
for(var i=0;i<illiad.length;i++){
	output[i]=illiad[i];	
}
console.log(JSON.stringify(output));
