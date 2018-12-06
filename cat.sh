#!/bin/bash
echo "var levels = {"
for f in chapters/*json;do
	CHAP=$(echo $f | cut -d "." -f1 | cut -d "/" -f2 )
	echo "$CHAP : $( cat $f ),"
done
echo "}"
