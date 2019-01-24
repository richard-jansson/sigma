window.onkeyup=function(e){
    console.log("stub");
}
window.onkeydown=function(e){
    console.log("stub");
}

function saveBind(){
    console.log("stub");
}

function delBind(){
    var signal=$(this).parent(".group").attr("signal"); 
    var weapon=$(this).parent(".settings").attr("weapon"); 

    var curr=$(this).parent().parent();

    console.log("del "+signal+" " + weapon);

    curr.remove();
        
    saveBind();
}

function setupKeys(){
    $(".keys .del").click(delBind);
}

$(document).ready(function(){
    setupKeys();
});
