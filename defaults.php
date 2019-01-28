<?php
    $defcfg=array( 
        "general"=>[
            "mute"=> true,

            "ANIMT"=>5,
            "FPS"=>60,
            "N_LEAVES"=>4,
            "N_BRANCHES"=>4,
            "treeN1_mult"=>0.4,
            "tree_rad_mult"=>1.6,

            "QUAD_COLS"=>2,
            "QUAD_ROWS"=>2,
            "QUAD_TOPPAD"=>20,
            "QUAD_RPAD"=>5,
            "QUAD_N_SHALLOW"=>3,
            "QUAD_N_DEEP"=>1,

            "GAMEPAD_POLL_INT"=>1,
    		"GAMEPAD_AXIS_TRESH0"=>0.5,
	    	"GAMEPAD_AXIS_TRESH1"=>0.5,
    		"GAMEPAD_MIN_T"=>80,
		    "BTN_MIN_T"=>80,
            "KB_INT"=>150,

            "DEBUG_OUTLINE"=>false,
            "LINEAR_SPOKES"=>false,
            "SHOW_STATS"=>true,
            "SHOW_AXIS"=>true
        ],
        "key"=>[
            "UP"=>'["KeyW","ArrowUp","GARN"]',
            "RIGHT"=>'["KeyD","ArrowRight","GARE"]',
            "DOWN"=>'["KeyS","ArrowDown","GARS"]',
            "LEFT"=>'["KeyA","ArrowLeft","GARW"]',

            "SELECT"=>'["KeyE","Space","GBTN_0","GBTN_5"]',
            "DELETE"=>'["KeyQ","Shift","GBTN_6"]'
            ],
        "tree"=>[
            "SELB0"=>'["GBTN_14"]',
            "SELB1"=>'["GBTN_12"]',
            "SELB2"=>'["GBTN_15"]',
            "SELB3"=>'["GBTN_15"]',

            "RESET"=>'["GBTN_13"]',

            "SELL0"=>'["GBTN_0"]',
            "SELL1"=>'["GBTN_1"]',
            "SELL2"=>'["GBTN_0"]',
            "SELL3"=>'["GBTN_1"]',

            "DELETE"=>'["GBTN_6"]',
        ],
        "quad"=>[
            "SELQ0"=>'["GBTN_4"]',
            "SELQ1"=>'["GBTN_5"]',
            "SELQ2"=>'["GBTN_6"]',
            "SELQ3"=>'["GBTN_7"]',
/*            "SELQ4"=>'["GBTN_0"]',
            "SELQ5"=>'["GBTN_1"]',
            "SELQ6"=>'["GBTN_0"]',
            "SELQ7"=>'["GBTN_1"]',*/
            "DELETE"=>'["GBTN_0"]',
            "RESET"=>'["GBTN_1"]'
        ]
    )
?>
