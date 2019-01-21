<?php
session_start();

$o=array();

if(!isset($_SESSION["username"])) $o["loggedin"]=false;
else{
    $o["loggedin"]=true;
    $o["user"]=$_SESSION["username"];
}
echo json_encode($o);
?>
