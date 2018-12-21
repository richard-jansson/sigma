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
var ANIMT=10;
var FPS=20;
// keys to select leaves 
var dkeys=["W","D","S","A"];
// keys to select branches
var sel_m=["Q","F"];
// back to root branch 
var rst="SHIFT";
// backspace 
var bcksp="SPACE";
// N - amount of leaves per node 
// M - branches from each and every node
var N=4,M=2;

// 
var mute=true;

/* 
 *  Keybindings for classic keyboard.
 *
 */ 
var kb_up="W";
var kb_rgt="D";
var kb_dwn="S";
var kb_lft="A";
var kb_sel="E";

var KB_INT=150;

/* 
 *  Keybindings for quad keyboard.
 */ 
var selq=["Q","W","E",
			"A","S","D",
			"Z","X","C"];
var QUAD_COLS=3;
var QUAD_ROWS=3;
var QUAD_TOPPAD=20;
var QUAD_RPAD=5;

/* 
 * Bindings for linear
 * 
 */ 
var lin_up="Q";
var lin_down="F";
var lin_sel="E";
