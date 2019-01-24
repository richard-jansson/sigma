<?php
session_start();
unset($_SESSION["username"]);
unset($_SESSION["user_id"]);
$o=array("status"=>"success");
echo json_encode($o);
?>
