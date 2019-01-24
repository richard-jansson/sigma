var conf=[];
var values={};
var defaults={};
var curr_btn=false;
var curr_id=false;

window.onkeydown = function(e){
    console.log("keydown:" + e.code);
}
window.onkeyup = function(e){
    console.log("keyup"+ e.code);
}

// mashes togehter buttons from different controllers
function conf_pollgamepads(){
    if(!curr_id) return;
	npads=navigator.getGamepads();
    for(var k in npads){
        if(npads[k]===null) continue;
        for(var k1 in npads[k].buttons){
            if(npads[k].buttons[k1].pressed){
                curr_btn=k1;                 
                $("#newkey").html(k1);
                values[curr_id]=k1;
                init();
            }
        }
    }
}

// callbacks 
function adjust_dkeys(){
	console.log("adjust dkeys");
}
function adjust_mkeys(){
	console.log("adjust dkeys");
}

function cbtn_change(id){
    curr_id=id;
	$("#keydialog").show();

	$("#newkey").html(values[id]);

	$("#kmodalreset").click(function(){
		$("#newkey").html(defaults[id]);
		values[id]=defaults[id];
		init();
    });
    curr_btn=id;
	$("#kmodalclose").click(function(){ 
        $("#keydialog").hide(); 
        curr_id=false;
    })
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

function cbtn(id,def){
	return "<input type=\"submit\" value=\""+def+"\" onclick=\"cbtn_change('"+id+"')\" />";
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
	else if(type=="btn") inp=cbtn(id,def);
	else if(type=="keygroup") inp=ckeygroup(id,def,n);
    
	return {html:d1+lbl+inp+d2};	
}

var settings={
	"ANIMT":["ANIMT","Animation time","int",ANIMT,"ms"],
	"FPS":["FPS","Frames per second","int",FPS,"fps"],
	"NUM_LEAVES":["NUM_LEAVES","Leaves per node","int",N,undefined,adjust_dkeys],

	"QUAD_COLS":["QUAD_COLS","Columns for quad","int",QUAD_COLS],
	"QUAD_ROWS":["QUAD_ROWS","Rows for quad","int",QUAD_ROWS],
	"QUAD_N_SHALLOW":["QUAD_N_SHALLOW","shallow boxes","int",QUAD_N_SHALLOW],
	"QUAD_N_DEEP":["QUAD_N_DEEP","deep boxes","int",QUAD_N_DEEP],


	"kb_up":["kb_up","Keyboard up","key","W"],
	"kb_rgt":["kb_rgt","Keyboard right","key","D"],
	"kb_dwn":["kb_dwn","Keyboard down","key","S"],
	"kb_lft":["kb_lft","Keyboard left","key","D"],
	"kb_sel":["kb_sel","Keyboard select","key","E"],

    "kb_0":["kb_0","Select quad / branch 0","key","Q"],
    "kb_1":["kb_1","Select quad / branch 1","key","E"],
    "kb_2":["kb_2","Select quad / branch 2","key","C"],
    "kb_3":["kb_3","Select quad / branch 3","key","Z"],
    
    "gp_up":["gp_up","Gamepad up","btn","3"],
    "gp_rgt":["gp_rgt","Gamepad right","btn","1"],
    "gp_dwn":["gp_dwn","Gamepad down","btn","0"],
    "gp_lft":["gp_lft","Gamepad left","btn","2"],

// Tree select leaves / symbols
    "gptl_0":["gptl_0","Select leaf 0","btn",gptl_0],
    "gptl_1":["gptl_1","Select leaf 1","btn",gptl_1],
    "gptl_2":["gptl_2","Select leaf 2","btn",gptl_2],
    "gptl_3":["gptl_3","Select leaf 3","btn",gptl_3],

    "gptb_0":["gptb_0","Select branch 0","btn",gptb_0],
    "gptb_1":["gptb_1","Select branch 1","btn",gptb_1],
    "gptb_2":["gptb_2","Select branch 2","btn",gptb_2],
    "gptb_3":["gptb_3","Select branch 3","btn",gptb_3],

    "gpt_rst":["gp_rst","tree gamepad reset","btn",gpt_rst],
    "gpt_del":["gp_del","tree gamepad delete","btn",gpt_del],

// Linear configuration
    "gplin0_dwn":["gplin0_dwn","Linear left down button","btn",gplin0_dwn],
    "gplin0_up":["gplin0_up","Linear left up button","btn",gplin0_up],
    "gplin0_sel":["gplin0_sel","Linear left select button","btn",gplin0_sel],

    "gplin1_dwn":["gplin1_dwn","Linear down right button","btn",gplin1_dwn],
    "gplin1_up":["gplin1_up","Linear up right button","btn",gplin1_up],
    "gplin1_sel":["gplin1_sel","Linear right select button","btn",gplin1_sel],

    "gplin_del":["gplin_del","Linear delete button","btn",gplin_del],
}

function render(){
	var html="";
	for(var k in conf){
		html+=conf[k].html;	
	}
	var settings=document.getElementById("settings");
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

var cback=null;

function init(){
//    setInterval(conf_pollgamepads,GAMEPAD_POLL_INT);

    initgamepad(); 

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
