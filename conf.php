<!--
Sigma Text input experiment 
Copyright (C) 2018 Richard J. Jansson 

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
-->
<?php 

if(!in_array($_GET["block"],array("general","key","tree","quad","menu"))) die();

include "dbcfg.php"; 


/*function is_boolean($v){
    if($v==="false") return true;
    if($v==="true") return true;
    return false;
}
*/
function is_integer2($v){
    $a=$v;
    $b=(int)$v;
    return $a==$b ? true : false;
}
/*
function is_float2($v){
    $a=$v;
    $b=(float)$v;
    return $a==$b ? true : false;
}
*/

function print_bool($k,$v){ 
    $s=$v?"checked":"";
?>
    
    <div class="group" input="<?php echo $k; ?>">
    <div class="option">
        <span><?php echo $k; ?>:</span>
    </div>
    <div class="value">
        <input type="checkbox" <?php echo $s; ?> />
    </div>
    </div>
<?php
}

function print_int($k,$v){ ?>
    <div class="group" input="<?php echo $k; ?>">
    <div class="option">
        <span><?php echo $k; ?>:</span>
    </div>
    <div class="value">
        <input type="text" value="<?php echo $v; ?>" />
    </div>
    </div>
<?php }

function print_key($k,$v){ ?>
    <div class="group" signal="<?php echo $k; ?>">
    <div class="signal"> 
                <span><?php echo $k; ?>:</span>
    </div>
    <?php
    foreach(json_decode($v) as $i => $key) {?>
    <div class="keys">
        <div class="key">
            <span class="keyval"><?php echo $key; ?></span>
            <span class="del">(X)</span>
        </div>
    </div>
<?php
    }
    ?>
    <div class="new">
        <span class="newbind">ADD</span>
    </div>
    </div>
<?php
}

?>
<html>
	<head>
    <meta charset="UTF-8" />
    	<link href="css/style.css" rel="stylesheet" />
    	<link href="css/settings.css" rel="stylesheet" />
		<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="settings2.php"></script>
		<script type="text/javascript" src="js/gamepad.js"></script>
-		<script type="text/javascript" src="js/settings.js"></script> 

		<title>The Brave Future of Text</title>
	</head>
	<body>
		<div id="logo">
			<a href="/"><img src="img/home.png" alt="logo" /></a>
		</div>
		<div id="settingswrap">
		<div id="settings" weapon="<?php echo $_GET["block"]; ?>" class="configblock">
            <div class="heading">
                    <h2><?php echo $_GET["block"]; ?></h2>
             </div>
            <div class="msg">
                <span>Message space</span>
            </div>
            <?php
            foreach($cfgs as $k => $v){ ?>
                <?php 

                /*
                $vc=$v;
                print "$v </br>";
                print "B: ".(is_boolean($v)?"Y":"N")."</br>";
                print "I: ".(is_integer2($v)?"Y":"N")."</br>";
                print "F: ".(is_float2($v)?"Y":"N")."</br>";
                */

                if(is_bool($v) || is_boolean($v)) print_bool($k,$v);
                else if(is_json($v)) print_key($k,$v);
                else if(is_integer2($v)) print_int($k,$v);
                else if(is_float2($v)) print_int($k,$v);
                else print_key($k,$vc);
                ?>
            <?php
            }
            ?>
            <div class="group">
                <div class="save">
                    <div class="savebtn">
                        <span>Save</span>
                    </div>
                </div>
            </div>
        </div>
		</div>
	</body>
</html>
