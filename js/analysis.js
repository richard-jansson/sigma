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
function sortX(o){
	list=[];
	for(var k in o){
		if(k==" ") continue;
		list[k]=o[k];
	}
	var max=-1000;	
	var max_k=false;
	sorted=[];
	var n=0;
	for(var k in list) n++;

	while(n){
		max=-1000;
		for(var k in list){
			if(list[k] > max){
				max=list[k];
				max_k=k;
			}
		}
		sorted.push(max_k);
		delete list[max_k];
		n--;
	}
	
	return sorted;
}
