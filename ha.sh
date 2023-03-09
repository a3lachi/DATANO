gill() { 
	git add * ; git commit -m 'code update' ; git push --all 
}

for i in {1..10} :
do
	gill ;
	sleep 200 ;

done
