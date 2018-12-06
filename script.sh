#!/bin/bash
cp pg768.txt tmp.txt

gcc t.c -o tojson

CHAPTER=0
while true;do
	echo "wc -l " 
	wc -l tmp.txt
	CHPLFT=$( grep -n CHAPTER tmp.txt | wc -l | cut -d " " -f1 ) 
	echo "CHPLFT: $CHPLFT"
	if [[ $CHPLFT -eq "0" ]];then 
		break;
	fi
	START=$( grep -n CHAPTER tmp.txt | cut -d ":" -f1 | head -n1)
	END=$( grep -n CHAPTER tmp.txt | cut -d ":" -f1 | head -n2 | tail -n1)
	
	ENDA=$( wc -l tmp.txt | cut -d " " -f1) 
	
	LEN=$(( END-START -3 ))
	echo "S=$START E=$END L=$LEN"
	
	head -n $(( END -1 )) tmp.txt | tail -n $LEN > chapters/$CHAPTER.txt
	./tojson chapters/$CHAPTER.txt > chapters/$CHAPTER.json
	echo "CHAPTER: $CHAPTER"
	CHAPTER=$(( CHAPTER+1 ))

	cp tmp.txt foo.txt
	tail -n $(( ENDA - $END )) foo.txt > tmp.txt
done

#CHAPTER=$(( CHAPTER+1 ))
echo "CHAP: $CHAPTER"
ENDA=$( wc -l tmp.txt | cut -d " " -f1) 


tail -n $(( ENDA -2 ))  tmp.txt > chapters/$CHAPTER.txt
./tojson chapters/$CHAPTER.txt > chapters/$CHAPTER.json

./cat.sh > js/levels.js
