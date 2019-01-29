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

function __input_get_signal(code){
    if(code==" ") code="Space"; 
    for(var k in this.bindings){
        for(var k1 in this.bindings[k]){
            if(this.bindings[k][k1].toUpperCase()==code) return k;
            if(this.bindings[k][k1]=="Key"+code.toUpperCase()) return k;
            if(this.bindings[k][k1]==code) return k;
            if(this.bindings[k][k1].toUpperCase()==code) return k;
        }
    }
    return false;
}

function inputo(block){
    var cdata=cfg[block];
    var bindings={};
    console.log(cdata);
    for(k in cdata){
        var bind=JSON.parse(cdata[k]);
        bindings[k]=bind;
    }

    return {bindings:bindings,getSignal:__input_get_signal};
}
