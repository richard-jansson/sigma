<?php
session_start();
unset($_SESSION["username"]);
$o=array("status"=>"success");
echo json_encode($o);
?>
