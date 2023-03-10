gill() { 
	git add * ; git commit -m 'code update' ; git push --all 
}

for i in {1..20} :
do
	gill ;
	sleep 120 ;

done
