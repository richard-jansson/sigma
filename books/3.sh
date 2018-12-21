#!/bin/bash
INP=3.txt
TMP=tmp
cp 3.txt tmp
N=0

echo 'books[3]={' > 3.js

while true;do
	TL=$( wc -l tmp | cut -d " " -f1)
	if [ $TL -eq 0 ];then 
		break
	fi
	echo $TL

	L1=$(grep -n "第" $TMP | head -n1 | cut -d ":" -f1)
	echo "$N : [" >> 3.js
	head -n $(( L1-1 )) tmp | sed "s/^\(.*\)$/\"\1\",/g"  >> 3.js
	echo '""],' >> 3.js
#	echo "rest" 
	tail -n $(( TL - L1-1 )) tmp > t2
	cp t2 tmp
	N=$((N+1))
done

echo '}' >> 3.js

gcc 3.c -o 3 
cp 3.js tmp 
cat tmp | ./3 > 3.js
