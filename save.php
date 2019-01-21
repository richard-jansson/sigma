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

function insupd($con,$uid,$k,$v){
    $q="SELECT * FROM config WHERE "
        . " cfg_key = \"$k\" "
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
        $q="INSERT INTO config (user_id,cfg_key,cfg_val) VALUES "
            . "($uid,\"$k\",\"$v\")";
    }else{
        $q="UPDATE config SET cfg_val = \"$v\" WHERE "
            . " cfg_key = \"$k\""
            . " AND user_id = ". $uid;

    }

    $r=mysqli_query($con,$q);
    if(!$r){
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

foreach($allowed as $k){
    if(!isset($_GET[$k])) continue;
    $v=mysqli_real_escape_string($con,$_GET[$k]);
    
    insupd($con,$_SESSION["user_id"],$k,$v);
}

$o["status"]="success";
echo json_encode($o);
?>
