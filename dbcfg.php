<?php
include "defaults.php";

if(!isset($_GET["block"])){
    die("no block specified");
}

$block=$_GET["block"];
session_start();
if(!isset($_SESSION["user_id"])){
    foreach($defcfg[$block] as $k => $v){
     $cfgs[$k]=$v;
    }
//    echo "var is_loggedin = false;";
    return;
}

include "cfg.php";
include "common.php";

$con=mysqli_connect($db_host,$db_user,$db_pass,$db_db);
if(!$con){
    $msg=array("status"=>"failed","msg"=>"database error, failed to connect");
    print json_encode($msg);
    die();
}
$block=mysqli_real_escape_string($con,$_GET["block"]);

$q="SELECT * FROM config WHERE user_id = ".$_SESSION["user_id"]." and cfgblock = '$block';";

$r=mysqli_query($con,$q);
if(!$r) die();
$cfgs=array();

while($row=mysqli_fetch_assoc($r)){
    $cfgs[$row["cfg_key"]]=$row["cfg_val"];
}

?>
