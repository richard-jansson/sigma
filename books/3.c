#include<stdio.h>

int main(){
	int c;
	while(EOF!=(c=getchar())){
		if(c!=13) putchar(c);
	}
}
