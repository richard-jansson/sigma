function login(){
    var uname=$("#luname").val();
    var rpassword=$("#lpassword").val();

    if(typeof(uname)=="undefined" || uname.length==0){ 
        $("#login_msg").html("Enter an username");
        $("#login_msg").show();
        return
    }
    if(typeof(rpassword)=="undefined" || rpassword.length==0){ 
        $("#login_msg").html("Enter a password");
        $("#login_msg").show();
        return
    }
    jQuery.get("login.php",{uname: uname, pass: rpassword},function(d){
        var ro=JSON.parse(d);
        if(ro.status=="failed"){
            $("#login_msg").html(ro.msg);
            $("#login_msg").show();
        }else{
            $("#login_msg").html("");
            console.log("success");
        }
    }).fail(function(){
        $("#login_msg").html("Failed to submit request, please try again.");
        $("#login_msg").show();
    })
}
function register(){
    var uname=$("#runame").val();
    var rpassword=$("#rpassword").val();
    var mail=$("#rmail").val();
    
    if(typeof(uname)=="undefined" || uname.length==0){ 
        $("#register_msg").html("Enter an username");
        $("#register_msg").show();
        return
    }
    if(typeof(rpassword)=="undefined" || rpassword.length==0){ 
        $("#register_msg").html("Enter a password");
        $("#register_msg").show();
        return
    }

    jQuery.get("register.php",{uname: uname, pass: rpassword},function(d){
        console.log("complete");
        var ro=JSON.parse(d);
        if(ro.status=="failed"){
            $("#register_msg").html(ro.msg);
            $("#register_msg").show();
        }else{
//            window.location="conf.html";
        }
    }
    ).fail(function(){
        $("#register_msg").html("Failed to submit request, please try again.");
        $("#register_msg").show();
    })
    
    $("#register_msg").html("");
}
$(document).ready(function(){
    console.log("ready");
    $("#login").click(login);
    $("#register").click(register);
})
