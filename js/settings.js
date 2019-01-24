var expecting_inp=false;
var curr_signal=false;

window.onkeyup=function(e){
    console.log("stub");
}
window.onkeydown=function(e){
    if(expecting_inp){
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
    var tc=$("<span>"+code+"</span>");
    var td=$("<span>(X)</span>",{class:"del"});
    td.click(delBind);
    key.append(tc);
    key.append(td);
    
    var keys=group.find(".keys");
    keys.append(key);
}

function addBind(){
    var signal=$(this).parents(".group").attr("signal"); 


    curr_signal=signal;
    expKey();
}

function setupKeys(){
    $(".keys .del").click(delBind);
    $(".group .newbind").click(addBind);
}

$(document).ready(function(){
    initgamepad();
    setupKeys();
});
