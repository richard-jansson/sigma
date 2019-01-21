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

$query = "SELECT *  FROM users WHERE username = \"$uname\" AND password = PASSWORD(\"$pass\");";
$r=mysqli_query($con,$query);
if(!$r){
    $msg=array("status"=>"failed","msg"=>"database error, query failed",
    "error"=> mysqli_error($con));
    print json_encode($msg);
    die();
}

$n=mysqli_num_rows($r);
$row=mysqli_fetch_assoc($r);
if($n < 1) {
    $msg=array("status"=>"failed","msg"=>"authentication failed");
    print json_encode($msg);
    die();
}

$msg=array("status"=>"success");
echo json_encode($msg);

session_start();

$_SESSION["username"]=$uname;
$_SESSION["user_id"]=$row["user_id"];
?>
