function has_el(needle,stack){
	var ret=-1;
	for(var i=0;i<stack.length;i++) if(stack[i]==needle) return i;
	return ret;
}
