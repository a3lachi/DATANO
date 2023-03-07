gill() { 
	git add * ; git commit -m 'code update' ; git push --all 
}

for i in {1..200} :
do
	gill ;
	sleep 150 ;

done
