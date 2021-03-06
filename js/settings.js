var expecting_inp=false;
var curr_signal=false;

window.onkeyup=function(e){
    console.log("stub");
}
window.onkeydown=function(e){
    if(expecting_inp){
        expecting_inp=false;
        console.log(e.code);
        addBindAct(curr_signal,e.code);
    }
}

function saveBind(){
    console.log("stub");
}

function delBind(){
    var signal=$(this).parents(".group").attr("signal"); 
    var weapon=$(this).parents(".settings").attr("weapon"); 

    var curr=$(this).parent();

    console.log("del "+signal+" " + weapon);

    curr.remove();
        
    saveBind();
}

function dontExpKey(){
    expecting_inp=false;
    $(".msg").hide();
}
function expKey(){
    expecting_inp=true;
    $(".msg span").html("Enter key / btn / axis for "+curr_signal);
    $(".msg").show();
}

function addBindAct(signal,code){
    dontExpKey();

    console.log(signal,code);

    var group=$(".group[signal='"+signal+"']");
    var key=$("<div></div>",{class:"key"});
    var tc=$("<span></span>",{class:"keyval"});
    tc.html(code);
    var td=$("<span></span>",{class:"del"});
    td.html("(X)");
    td.click(delBind);
    key.append(tc);
    key.append(td);
    
    var sig=group.find(".signal");
    key.insertAfter(sig);
}

function addBind(){
    var signal=$(this).parents(".group").attr("signal"); 


    curr_signal=signal;
    expKey();
}

function getSignal(e,signal){
    var keys=e.find("span.keyval");
    var ret=[];
    keys.each(function(){
        ret.push($(this).html());
    });
    return ret;
}

function back(){
    window.location.href="start.html"
}

function save(){
    var block=$(this).parents(".configblock");
    var cfgblock=block.attr("weapon");

    var groups=block.find(".group");

    data={signals:{},inputs:{}};

    groups.each(function(){
        var signal=$(this).attr("signal");
        var input=$(this).attr("input");
        if(typeof(signal)!="undefined"){
            console.log(signal);
            data.signals[signal]=getSignal($(this),signal);
            console.log(data.signals[signal]);
        }
        if(typeof(input)!="undefined"){
            var inp = $(this).find("input");
            if(inp.attr("type")=="checkbox"){
                data.inputs[input]=inp.is(":checked");
            }else {
                data.inputs[input]=parseFloat(inp.val());
            }

        }
    })
    console.log(data);
    $.get("save2.php",{block:cfgblock,data: data},function(d){
        if(d.status=="failed"){
            // FIMXE print to msg 
        }else{
            console.log("request success");
        }
    });
}

function setupKeys(){
    if(!is_loggedin) window.location.href="login.html";
    $(".keys .del").click(delBind);
    $(".group .newbind").click(addBind);
    
    $(".savebtn").click(save);
    $(".backbtn").click(back);
}


$(document).ready(function(){
    initgamepad();
    setupKeys();
});
