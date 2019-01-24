<?php 
header('Content-type: text/javascript');
session_start();
include "dbcfg.php"; 
$cblockcfg=$cfgs;

?>
var cfg={<?php echo $block; ?> : <?php echo json_encode($cfgs); ?> }; 
<?php if(isset($_SESSION["user_id"])) { ?>
var is_loggedin=true;
var user_name = "<?php echo $_SESSION["username"]; ?>";
var user_id = <?php echo $_SESSION["user_id"]; ?>;
<?php } else { ?>
var is_loggedin=false;
<?php } ?>
