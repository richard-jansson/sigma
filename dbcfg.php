<?php
include "defaults.php";

if(!function_exists("is_boolean")){
function is_boolean($v){
    if($v==="false") return true;
    if($v==="true") return true;
    return false;
}
function is_float2($v){
    $a=$v;
    $b=(float)$v;
    return $a==$b ? true : false;
}
}

if(!isset($_GET["block"]) && !$block){
    die("no block specified");
}
if(!$block) $block=$_GET["block"];


session_start();
//$cfgs=array();
foreach($defcfg[$block] as $k => $v){
    $cfgs[$k]=$v;
}
if(!isset($_SESSION["user_id"])){
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
$block=mysqli_real_escape_string($con,$block);

$q="SELECT * FROM config WHERE user_id = ".$_SESSION["user_id"]." and cfgblock = '$block';";

$r=mysqli_query($con,$q);
if(!$r) die();

while($row=mysqli_fetch_assoc($r)){
    if(is_boolean($row["cfg_val"])) $v=$row["cfg_val"]=="true"?true:false;
    else if(is_float2($row["cfg_val"])) $v=(float)$row["cfg_val"];
    else $v=$row["cfg_val"];
//    $cfgs[$row["cfg_key"]]=$row["cfg_val"];
    $cfgs[$row["cfg_key"]]=$v;
}

?>
