#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<assert.h>

int main(int argc,char *argv[]){
	FILE *fd=fopen(argv[1],"r");
	assert(fd);

	char *line=NULL;
	ssize_t len;
	int nread;
	int slen;
	
	printf("[\"");
	while((nread=getline(&line,&len,fd)!=-1)){
//		printf("%i:%s",strlen(line),line);
		if(strlen(line)==2){
			printf("\",\n\"");
		}else{
			slen=strlen(line);
			line[slen-2]=' ';
			line[slen-1]='\0';

			for(int i=0;i<slen-2;i++){
				if(line[i]!='"') printf("%c",line[i]);
				else printf("\\\"");
			}
			printf(" ");
//			printf("%s",line);
		}
	}
	printf("\"]\n");

	fclose(fd);
	return 0;
}
