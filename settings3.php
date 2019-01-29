<?php 
header('Content-type: text/javascript');
session_start();
?>
var cfg={
<?php
$block=false;
$cfgs=array();
include "dbcfg.php"; 
$cblockcfg=$cfgs;
$oblock=$block; ?>
<?php echo $oblock; ?> : <?php echo json_encode($cblockcfg); ?>,
<?php

$cfgs=array();
$block="general";
include "dbcfg.php"; 
$cblockcfg=$cfgs;
$general=$cfgs;

?>
general : <?php echo json_encode($general); ?> 
}; 
<?php if(isset($_SESSION["user_id"])) { ?>
var is_loggedin=true;
var user_name = "<?php echo $_SESSION["username"]; ?>";
var user_id = <?php echo $_SESSION["user_id"]; ?>;
<?php } else { ?>
var is_loggedin=false;
<?php } ?>
