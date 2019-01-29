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
        "menu"=>[
            "SELECT"=>'["GBTN_7","GBTN_0","Enter","Space","KeyE"]',
            "UP"=>'["ArrowUp","KeyW","GARN","GALN","GBTN_12"]',
            "DOWN"=>'["ArrowDown","KeyS","GARS","GALS","GBTN_13"]'
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
            "SELB0"=>'["GALNW","KeyQ"]',
            "SELB1"=>'["GALNE","KeyE"]',
            "SELB2"=>'["GALSE","KeyC"]',
            "SELB3"=>'["GALSW","KeyZ"]',

            "RESET"=>'["GBTN_10","ShiftLeft"]',

            "SELL0"=>'["KeyW","GARN"]',
            "SELL1"=>'["GARE","KeyD"]',
            "SELL2"=>'["GARS","KeyS"]',
            "SELL3"=>'["GARW","KeyA"]',

            "DELETE"=>'["GBTN_11","Space"]',
        ],
        "quad"=>[
            "SELQ0"=>'["GARNW","GALNW","KeyE"]',
            "SELQ1"=>'["GARNE","GALNE","KeyR"]',
            "SELQ2"=>'["GARSW","GALSW","KeyD"]',
            "SELQ3"=>'["GARSE","GALSE","KeyF"]',
            "DELETE"=>'["GBTN_7","GBTN_11","Space"]',
            "RESET"=>'["GBTN_6","GBTN_10","ShiftLeft"]'
        ],
        "linear"=>[
            "DYNUP"=>'["KeyW","ArrowUp","GARN"]',
            "DYNDOWN"=>'["KeyD","ArrowRight","GARE"]',
            "DYNSELECT"=>'["KeyD","ArrowRight","GARE"]',
            "STATUP"=>'["KeyW","ArrowUp","GARN"]',
            "STATDOWN"=>'["KeyD","ArrowRight","GARE"]',
            "STATSELECT"=>'["KeyD","ArrowRight","GARE"]',
            "DELETE"=>'["KeyD","ArrowRight","GARE"]'
        ]
    )
?>
