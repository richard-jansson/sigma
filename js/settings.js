var conf=[];
var values={};
var defaults={};

// callbacks 
function adjust_dkeys(){
	console.log("adjust dkeys");
}
function adjust_mkeys(){
	console.log("adjust dkeys");
}

// standard onchange
function ckey_change(id){
	$("#keydialog").show();

	$("#newkey").html(values[id]);

	window.onkeyup = function(e){
		var key=e.key.toUpperCase();
		console.log(key);
		values[id]=key;
		init();

		$("#newkey").html(key);

		$("#kmodalreset").click(function(){
			$("#newkey").html(defaults[id]);
			values[id]=defaults[id];
			init();
		});
		$("#kmodalclose").click(function(){ 
            $("#keydialog").hide(); 
            window.onkeyup = function() {} 
        });
//		$("#ckey_change").click(function(){ $("#keydialog").hide(); });
	}
}
function ckey_change2(id,i){
	$("#keydialog").show();
	$("#newkey").html(values[id][i]);

	var subid=i;
	window.onkeyup = function(e){
		var key=e.key.toUpperCase();

		values[id][i]=key;
		$("#newkey").html(values[id][i]);
		init();
			
	}
		$("#kmodalclose").click(function(){ $("#keydialog").hide(); });
		$("#kmodalreset").click(function(){
			$("#newkey").html(defaults[id][subid]);
			values[id][i]=defaults[id][subid];
			init();
		});
}

function cint_change(id){
    console.log("change bladdi blaah");
    var el=document.getElementById(id);
    values[id]=el.value;
}

function cint(id,def){
	return "<input type=\"number\" id=\""+id+"\" onchange=\"cint_change('"+id+"')\" value='"+def+"' />";
}

function ckey(id,def){
	return "<input type=\"submit\" value=\""+def+"\" onclick=\"ckey_change('"+id+"')\" />";
}
function ckey2(id,def,i){
	var id2=def+"_"+i;
	var inp="<input class=\"ckey2\" id=\""+id2+"\" type=\"submit\" value=\""+def+"\" onclick=\"ckey_change2('"+id+"',"+i+")\" />";
	var lbl="<label for=\""+id2+"\">#"+i+"</label>";

	return lbl+inp; 
}
function ckeygroup(id,def,quant){
	var ret="";
	for(var i=0;i<quant;i++){
		ret+=ckey2(id,def[i],i);
	}

	return ret;
}


// parent constructor
function setting(id,label,type,def,quant,cback,n){
	var d1="<div class=\"conf\">";
	var d2=(typeof(quant)=="undefined"?"":"<span class=\"quant\">"+quant+"</span>")+"</div>";
	var lbl="<label for=\""+id+"\">"+label+"</label>";
	
	var inp="unknown type: "+type;
	if(type=="int") inp=cint(id,def);
	else if(type=="key") inp=ckey(id,def);
	else if(type=="keygroup") inp=ckeygroup(id,def,n);
    
	return {html:d1+lbl+inp+d2};	
}

var settings={
	"ANIMT":["ANIMT","Animation time","int","5","ms"],
	"FPS":["FPS","Frames per second","int","60","fps"],
	"NUM_LEAVES":["NUM_LEAVES","Leaves per node","int","4",undefined,adjust_dkeys],
	"NUM_BRANCHES":["NUM_BRANCHES","Branches per node","int","4",undefined,adjust_mkeys],
	"DKEYS":["DKEYS","Select leave-keys","keygroup", ["I","L","K","J"] ,undefined,undefined,4],
	"MKEYS":["MKEYS","Select branch-keys","keygroup",["U","O",".","M"],undefined,undefined,4],

	"kb_up":["kb_up","Classic cursor up","key","W"],
	"kb_rgt":["kb_rgt","Classic cursor right","key","D"],
	"kb_dwn":["kb_dwn","Classic cursor down","key","S"],
	"kb_lft":["kb_lft","Classic cursor left","key","D"],
	"kb_sel":["kb_sel","Classic cursor select","key","E"]
}

function render(){
	var html="";
	for(var k in conf){
		html+=conf[k].html;	
	}
	var settings=document.getElementById("settings");
    console.log(html);
	settings.innerHTML=html;
}

function inito(){
    jQuery.get("getuser.php",{},function(d){
        var uo=JSON.parse(d);
        if(!uo.loggedin){
            window.location="login.html";
        }else{
            inita();
        }
    });
}

function inita(){
	// save default values
	for(var k in settings){
		var s=settings[k];
		var val=s[3];
		if(typeof(s[3])=="object") defaults[s[0]]=Array.from(s[3]);
		else defaults[s[0]]=s[3];
		
	}
	init();
	$("#save").click(function(){
		jQuery.get("save.php",values,function(res){
			console.log("success");
		});
	});
}

function init(){
	for(var k in settings){
//		console.log(settings[k]);
		var s=settings[k];

		// default
		var val=s[3];
		if(typeof(values[s[0]])!="undefined") val=values[s[0]];
		else values[s[0]]=s[3];

		conf[s[0]]=new setting(s[0],s[1],s[2],val,s[4],s[5],s[6]);

			
	}
	
	render();
}

if(document.readyState=="complete" || (document.readyState!="loading" && document.documentElement.doScroll)) inito();
else document.addEventListener("DOMContentLoaded",inito);
