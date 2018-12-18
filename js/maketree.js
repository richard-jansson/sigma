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

// FIXME global variable
dp=0; 
function rec(md,d,rc,n,i){
	var ret=[]
	
	// last step
	if(d+1 >= md){
	  console.log('"last" step @ '+d)
	 
	// one depth
	for(var x=0;x<(rc-n);x++){
	    var a=[] 
	   for(var y=0;y<rc;y++){
	      a.push(i[dp++]);
	   }
		ret.push(a)
	   
	}
	// deeper
	for(var x=0;x<n;x++){
	  var a=[]
	  for(var u=0;u<rc;u++){
	    var b=[]
	  	for(var v=0;v<rc;v++){
			if(typeof(i[dp])=="undefined") continue;
	      b.push(i[dp++])
	    }
	    a.push(b)
	  }
	  ret.push(a);
	}
	  
	 }else{
	  for(var x=0;x<rc;x++){
	     ret.push(rec(md,d+1,rc,n,i))
	  }
	  }
	return ret;
}

function maketree(i,r,c){
	var rc=r*c;
	var ndeep=1;
	
	var l=i.length;
	
	//var l=3;
	
	// find the absolutely maximal requirement
	var dhi=Math.ceil(Math.log(l)/Math.log(rc));
	var dlo=Math.floor(Math.log(l)/Math.log(rc));
	
	console.log("r="+r+" c="+c+" rc="+rc);
	console.log("max depth:" + dhi);
	console.log("input len="+l);
	console.log("capacity = rc^dhi = "+rc+"^"+dhi+" = "+Math.pow(rc,dhi));
	console.log("capacity = rc^dlo = "+rc+"^"+dlo+" = "+Math.pow(rc,dlo));
	
	caph=Math.pow(rc,dhi);
	caplo=Math.pow(rc,dlo);
	
	
	// need to space out this many on longer threads
	var o=l-caplo;
	console.log("overflow "+o);
	
	var no=Math.ceil(o/(rc*rc));
	console.log("need: "+no);
	
	// new capacity
	var pl=Math.pow(rc,dlo);
	console.log(rc+"^"+dlo+"="+pl);
	
	console.log((pl-no) +"+"+no*rc);
	
	
	q=rec(dlo,1,rc,no,i)
	
	console.log(q);
	
	console.log(JSON.stringify(q));

	return q;
}
