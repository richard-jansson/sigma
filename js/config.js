/*
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
*/
// Time in ms for animation 
var ANIMT=5;
var FPS=60;
// keys to select leaves 
//var dkeys=["W","D","S","A"];
// keys to select branches
//var sel_m=["Q","F"];
// keys to select branches
var sel_m=["U","O",";","H"]; // back to root branch 
var rst="N";
// backspace 
var bcksp="SPACE";
// N - amount of leaves per node 
// M - branches from each and every node
var N=4,M=4;

var treeN1_mult=0.4;
var tree_rad_mult=1.6;
// 
var mute=false;
/*  Keybindings for classic keyboard.
 *
 */ 
var kb_up="W";
var kb_rgt="D";
var kb_dwn="S";
var kb_lft="A";
var kb_sel="E";

var kb_0="Q";
var kb_1="E";
var kb_2="C";
var kb_3="Z";

var KB_INT=150;

/* 
 *  Keybindings for quad keyboard.
 */ 
/*var selq=["Q","W","E",
			"A","S","D",
			"Z","X","C"]; */
var selq=["Y","U","I",
			"H","J","K"];
var NUM_LEAVES=4;
var QUAD_COLS=4;
var QUAD_ROWS=2;
var QUAD_TOPPAD=20;
var QUAD_RPAD=5;
// FIXME throw error if less than QUAD_COLS * QUAD_ROWS
var QUAD_N_SHALLOW=7;
var QUAD_N_DEEP=1;

// Config for quad keyboard tree

/* 
 * Bindings for linear
 * 
 */ 
var lin_up="Q";
var lin_down="F";
var lin_sel="E";

var ling_up="P";
var ling_down="J";
var ling_sel="I";

var DEBUG_OUTLINE=false;
var LINEAR_SPOKES=false;
var SHOW_STATS=true;

var GAMEPAD_POLL_INT=1
var GAMEPAD_AXIS_TRESH0=0.5;
var GAMEPAD_AXIS_TRESH1=0.5;

var GAMEPAD_MIN_T=80
var BTN_MIN_T=80

var SHOW_AXIS=true;
// keys to select leaves 
var dkeys=["I","L","K","J"];


var gp_sel = 0;

/* iteration II conf values */
var gplin0_dwn = "6";
var gplin0_up = "4";
var gplin1_dwn = "7";
var gplin1_up = "5";
var gplin0_sel = "13";
var gplin1_sel = "0";
var gplin_del = "1";

// tree
var gptl_0 = "3";
var gptl_1 = "1";
var gptl_2 = "0";
var gptl_3 = "22";

var gptb_0 = "12";
var gptb_1 = "15";
var gptb_2 = "13";
var gptb_3 = "14";

var gpt_rst = "6"; 
var gpt_del = "7"; 
