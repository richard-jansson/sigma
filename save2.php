<?php
include "cfg.php";
include "common.php";
session_start();

$con=mysqli_connect($db_host,$db_user,$db_pass,$db_db);
if(!$con){
    $msg=array("status"=>"failed","msg"=>"database error, failed to connect");
    print json_encode($msg);
    die();
}

function insupd($con,$uid,$block,$k,$v){
    $q="SELECT * FROM config WHERE "
        . " cfg_key = \"$k\" "
        . " AND cfgblock = \"$block\""
        . " AND user_id = $uid;";
    $r=mysqli_query($con,$q);
    if(!$r){
        $msg=array("status"=>"failed","msg"=>"database error, query failed",
            "error"=> mysqli_error($con));
        print json_encode($msg);
        die();
    }
    $n=mysqli_num_rows($r);
    $row=mysqli_fetch_assoc($r);

    if($n==0){
        $q="INSERT INTO config (user_id,cfg_key,cfg_val,cfgblock) VALUES "
            . "($uid,\"$k\",'$v','$block')";
    }else{
        $q="UPDATE config SET cfg_val = '$v' WHERE "
            . " cfg_key = '$k' "
            . " AND cfgblock = '". $block."' "
            . " AND user_id = ". $uid;

    }

    $r=mysqli_query($con,$q);
    if(!$r){
        print $q."\r\n";
        $msg=array("status"=>"failed","msg"=>"database error, query failed",
            "error"=> mysqli_error($con));
        print json_encode($msg);
        die();
    }
}

$o=array();

if(!isset($_SESSION["username"])){
    $o["status"]="failed";
    $o["msg"]="Not logged in";
    echo json_encode($o);
    die();
}

$uname=mysqli_real_escape_string($con,$_SESSION["username"]);

if(!isset($_GET["block"])){
    $o["status"]="failed";
    $o["msg"]="block not specified";
    echo json_encode($o);
    die();
}

$block=mysqli_real_escape_string($con,$_GET["block"]); 

$signals=$_GET["data"]["signals"];


foreach($signals as $k => $v){
    insupd($con,$_SESSION["user_id"],$block,$k,json_encode($v));
}


/*foreach($allowed as $k){
    if(!isset($_GET[$k])) continue;
    $v=mysqli_real_escape_string($con,$_GET[$k]);
    
    insupd($con,$_SESSION["user_id"],$k,$v);
}
*/

$o["status"]="success";
echo json_encode($o);
?>
