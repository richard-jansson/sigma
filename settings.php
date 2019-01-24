<?php
header('Content-type: text/javascript');
session_start();
if(!isset($_SESSION["user_id"])){
    die("var is_loggedin=false");
}
include "cfg.php";
include "common.php";

$con=mysqli_connect($db_host,$db_user,$db_pass,$db_db);
if(!$con){
    $msg=array("status"=>"failed","msg"=>"database error, failed to connect");
    print json_encode($msg);
    die();
}

$q="SELECT * FROM config WHERE user_id = ".$_SESSION["user_id"].";";

$r=mysqli_query($con,$q);
if(!$r) die();
$cfgs=array();
while($row=mysqli_fetch_assoc($r)){
    if(!in_array($row["cfg_key"],$allowed)) continue;

    $cfgs[$row["cfg_key"]]=$row["cfg_val"];
}


?>
var is_loggedin = true;
var user_name = "<?php echo $_SESSION["username"]; ?>";
var user_id = <?php echo $_SESSION["user_id"]; ?>;
<?php
foreach($cfgs as $k => $v){ 
?>
var <?php echo $k ?> = "<?php echo $v; ?>";
<?php
}
?>
