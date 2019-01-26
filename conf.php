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
<?php include "dbcfg.php"; ?>
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
                    <h2>Virtual keyboard</h2>
             </div>
            <div class="msg">
                <span>Message space</span>
            </div>
            <?php
            foreach($cfgs as $k => $v){ ?>
            <div class="group" signal="<?php echo $k; ?>">
                <div class="signal"> 
                    <span><?php echo $k; ?>:</span>
                </div>
            <div class="keys">
                <?php foreach(json_decode($v) as $i => $key) { ?>
                    <div class="key">
                        <span class="keyval"><?php echo $key; ?></span>
                        <span class="del">(X)</span>
                    </div>
                <?php } ?> 
            </div>
                <div class="add">
                    <div class="new">
                        <span class="newbind">ADD</span>
                    </div>
                </div>
            </div>
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
