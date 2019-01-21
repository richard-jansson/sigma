<?php

include "cfg.php";

$con=mysqli_connect($db_host,$db_user,$db_pass,$db_db);
if(!$con){
    $msg=array("status"=>"failed","msg"=>"database error");
    print json_encode($msg);
    die();
}
$uname=mysqli_real_escape_string($con,$_GET["uname"]);
$pass=mysqli_real_escape_string($con,$_GET["pass"]);
$mail=mysqli_real_escape_string($con,$_GET["mail"]);

$query = "SELECT COUNT(*) as c from users where username = \"$uname\" and password = PASSWORD(\"$pass\");";
$r=mysqli_query($con,$query);
if(!$r){
    $msg=array("status"=>"failed","msg"=>"database error, query failed",
    "error"=> mysqli_error($con));
    print json_encode($msg);
    die();
}
$row=mysqli_fetch_assoc($r);
if($row["c"] < 1) {
    $msg=array("status"=>"failed","msg"=>"authentication failed");
    print json_encode($msg);
    die();
}

$msg=array("status"=>"success");
echo json_encode($msg);
?>
