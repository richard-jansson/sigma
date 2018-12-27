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
/*
Copyright (C) 2018  Richard Jansson

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

function maketree(i,r,c,n,m){
	var ret=[],queue=[];	
	
	for(var i=0;i<n;i++){
		// shallow quad
		var sq=[];
		for(var j=0;j<r*c;j++){	
			var v=set.shift();
			if(typeof(v)=="undefined"){
				ret.push(sq);
				return ret;
			}
			sq.push(v);
		}
		ret.push(sq);
	}

	// We push the deeper on the queue, so that the shallow
	// quadrants are rendered first. That is the more frequent
	// the symbol, the closer it should be to the tree root
	for(var i=0;i<m;i++){
		ret.push([]);
		queue.push(ret[n+i]);
	}
	
	while(queue.length){
		var curr=queue.shift();	

		for(var i=0;i<n;i++){
			// shallow quad
			var sq=[];
			for(var j=0;j<r*c;j++){	
				var v=set.shift();
				if(typeof(v)=="undefined") return ret;
				sq.push(v);
			}
			curr.push(sq);
		}
		for(var i=0;i<m;i++){
			curr.push([]);
			queue.push(curr[n+i]);
		}
	}

	return ret;
}





































































































