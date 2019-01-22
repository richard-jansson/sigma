<?php
session_start();
include "cfg.php";
$o=array();
if(!isset($_SESSION["user_id"])){
    $o["status"]="failed";
    $o["msg"]="not logged in";
    print json_encode($o);
    die();
}
$con=mysqli_connect($db_host,$db_user,$db_pass,$db_db);
if(!$con){
    $msg=array("status"=>"failed","msg"=>"database error, failed to connect");
    print json_encode($msg);
    die();
}
if(!isset($_GET["sid"])){
    $user_id=$_SESSION["user_id"];
    $q="INSERT INTO sessions (user_id) VALUES ($user_id)";
    $r=mysqli_query($con,$q);
    if(!$r){ 
        $o["status"]="failed";
        $o["msg"]="not logged in";
        print json_encode($o);
        die();
    }
    $sid=mysqli_insert_id($con);
    $o["status"]="success";
    $o["sess_id"]=$sid;
    print json_encode($o);
    die();
}

$sid=(int)$_GET["sid"];
$sparam=["tot","match","acts","raw","words"];
$do=array();

foreach($sparam as $k => $v){
    if(!isset($_GET[$v])) continue;  
    $do[$v]=(int)$_GET[$v]; 
}
$dot=json_encode($do);
print $dot."\r";
$q="INSERT INTO stats (sess_id,req) VALUES "
    ."($sid,'".$dot."');";
print $q."\r";
$r=mysqli_query($con,$q);
if(!$r){ 
     $o["status"]="failed";
     $o["msg"]="db error";
     print json_encode($o);
     die();
}

$o["status"]="success";
print json_encode($o);
?>
