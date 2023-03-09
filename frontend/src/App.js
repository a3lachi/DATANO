import React, { Component } from "react";
import axios from "axios";
import './components/Left.css'
import Styles from './components/Styles'
import './App.css'
import { canvas } from "canvas";
import { flushSync } from 'react-dom';



class App extends Component{

	allData = []

	firstCollecArray = [] 
	restCollec = [] 
	viewCollec = [] 
	currentInstru = []

	canvaCordX = ''
	canvaCordY = ''
	isCrop = 0
	theCropsCord = []
	tkhrbiqa = 0
	mainImage  = ''
	nbCrop = 1
	widthCrop = 0
	heightCrop = 0

    constructor(props){
      super(props);
      this.state = {
        collection: [],
        view: '',
        instru:'',
        qanva:[]
      }


      this.selectOnlyThis = this.selectOnlyThis.bind(this)
      this.chooseInstruction = this.chooseInstruction.bind(this)
      this.qsstiKanvaDown = this.qsstiKanvaDown.bind(this)
      this.qsstiKanvaUp = this.qsstiKanvaUp.bind(this)
      this.qsstiKanvaMove = this.qsstiKanvaMove.bind(this)      
	  this.delCrop = this.delCrop.bind(this)      
	  
    }


    selectOnlyThis(event){
      var myCheckbox = document.getElementsByName("myCheckbox");
      Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;  
      });
      event.target.checked = true;
      this.setState({view : event.target.id})
    }

    chooseInstruction(event){
    	this.instruId = event.target.id
    	// this.render()
    	flushSync(() => {
	      this.setState({instru : event.target.id})
	    })
	    this.friKanva()
      
    }


    componentDidMount() {
		var executed = false 
		if (!executed) {
			executed = true 
			this.refreshList();
		}
    }

    

    refreshList = () => {
      axios
        .get("/api/Instructions/")
        .then((res) => {this.setState({ collection: res.data } , function(){
			this.allData = res.dat;
			[this.firstCollecArray, this.restCollec, viewCollec, currentInstru]

		}) })
        .catch((err) => console.log(err));
    };

    getCollectionData(state) {
	  const data = state.collection;
	  const firstRow = data[0];
	  const restCollec = [];
	  const firstCollecArray = [];

	  for (let i = 1; i < data.length; i++) {
	    if (!restCollec.includes(data[i].collection) && data[i].collection !== firstRow.collection) {
	      restCollec.push(data[i].collection);
	    } else if (firstCollecArray.length < 1) {
	      firstCollecArray.push(data[i].collection);
	    }
	  }

	  const viewCollec = [];
	  for (let i = 0; i < data.length; i++) {
	    if (data[i].collection === state.view) {
	      viewCollec.push(data[i]);
	    }
	  }

	  let currentInstru = [];
	  for (let i = 0; i < data.length; i++) {
	    if (Object.is(data[i].id , Number(this.instruId))) {
	      currentInstru = data[i];
	    }
	  }

	  return [firstCollecArray, restCollec, viewCollec, currentInstru];
	}

	NavBar() {
		return(
				<nav className="navbar navbar-inverse navbar-fixed-top" >
			        <div className="container-fluid">
			          <div className="navbar-header">
			            <a  href="navDatano" className="navbar-brand" >DATANO API - Image Annotation</a>
			          </div>
			        </div>
		        </nav>
		)
	}
	  
	Left(data)
	{
		var [firstCollecArray, restCollec, viewCollec  ] =[ data[0] , data[1] , data[2] ] ;
		return(

              <div className="col-lg-2">

				<div>
					<div id="objectz" className="col">
					<div id='objectzName'className="row">
						Objects :
						
					</div>

					<div id='objectzList' className="row" >
						<div className="col" >
							{ firstCollecArray.map((item,index) => { return <div className="row" key={item.toString()}><input type="checkbox" name="myCheckbox" id={item.toString()} onClick={this.selectOnlyThis} />{item.toString()}</div>; }) }
							{ restCollec.map((item,index) => { return <div className="row" key={item.toString()}><input type="checkbox" name="myCheckbox" id={item.toString()} onClick={this.selectOnlyThis}  />{item.toString()}</div>; }) }
						</div>
					</div>
					</div>
				</div>

                <div className="col" style={{height : '40px'}}></div>

                <div id="lezobjet" className="col">
                    <div className="row">
                      Up Next 
                    </div>
                    <div className="row">
						
                      <div className="col" style={{height:'550px' , overflow : 'auto'}}>
					  	<div className="row" style={{height:'20px'}}></div>
                        {viewCollec.map((item,index) => { return <div className="row" key={item.id.toString()}><div className="col"><img alt={item.taskId.toString()} src={item.src.toString()} id={item.id.toString()} style={{width:'100%'}} onClick={this.chooseInstruction} onDrag={this.dragView} /><div style={{height:'20px'}}></div></div></div>; }) }
                      </div>
                      
                    </div>
                </div>
                
                
              </div>

      )
	}

	qsstiKanvaDown(event){		

		var imgHeit = document.getElementById('central').style.height
		imgHeit = imgHeit.slice(0,imgHeit.length-2)

		this.canvaCordX = Math.abs(event.pageX-(window.innerWidth*(2/12)) )*300/(window.innerWidth*(7/12))
		this.canvaCordY = (event.pageY - 102)*(150/imgHeit)

		var canvas = document.createElement('canvas');
		canvas.setAttribute('id','crp'+this.nbCrop.toString())
		canvas.style.height = '100%'
		canvas.style.width = '100%'
		canvas.addEventListener("mousedown", this.qsstiKanvaDown)
		canvas.addEventListener("mousemove", this.qsstiKanvaMove)
		canvas.addEventListener("mouseup", this.qsstiKanvaUp)

		document.getElementById('central').appendChild(canvas)

		this.isCrop = 1
	}

	qsstiKanvaMove(event){
		if (this.isCrop == 1) {
			
			var canvas = document.querySelector('#crp'+this.nbCrop.toString());
			var context = canvas.getContext("2d");
			
			var img = document.getElementById('imgCanva');

			var imgHeit = document.getElementById('central').style.height
			imgHeit = imgHeit.slice(0,imgHeit.length-2)


			var width = Math.abs((event.pageX-window.innerWidth*(2/12))*(300/(window.innerWidth*(7/12)))-this.canvaCordX )
			var height = Math.abs(   (event.pageY-102)*(150/imgHeit) - this.canvaCordY )

			this.heightCrop = height*imgHeit/150
			this.widthCrop = width*window.innerWidth*(7/12)/300

			console.log('RATIO IMAGE DIMS',img.width/img.height)
			console.log('RATIO IMAGE CANVAS',img.width/img.height)
			context.clearRect(0, 0, img.width, img.width);
			context.rect(this.canvaCordX , this.canvaCordY , width , height);
			context.globalAlpha = 0.3
			context.fillStyle = "#FF0000";
			context.fill();
		}
	}

	qsstiKanvaUp(event){
		this.isCrop = 0
		const  rayCord = [ Number(this.canvaCordX) , Number(this.canvaCordY) , this.widthCrop , this.heightCrop ]
		this.theCropsCord.push(rayCord)
		this.deleteCrop()
		this.nbCrop++		
		 
	}

	delCrop(event){
		var elem = document.querySelectorAll('#crp'+event.target.id.toString())
		elem.forEach(el => el.remove());
		this.nbCrop = this.nbCrop - 1
	}
	
	deleteCrop(){
		const qhba = this.theCropsCord
		var [cropX , cropY , cropWidth , cropHeight ] = qhba[qhba.length-1]

		var img = this.mainImage

		var imgHeit = document.getElementById('central').style.height
		imgHeit = imgHeit.slice(0,imgHeit.length-2)


		const canvas = document.createElement('canvas');
		canvas.width = this.widthCrop;
		canvas.height = this.heightCrop;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(img, this.canvaCordX*window.innerWidth*(7/12)/300, this.canvaCordY*imgHeit/150, this.widthCrop, this.heightCrop, 0, 0, this.widthCrop, this.heightCrop);






		var elem = document.createElement("div");
		elem.setAttribute("id", "crp"+this.nbCrop.toString());
		elem.setAttribute("className", "row");
		elem.setAttribute("style", "margin-bottom:20px;width:auto;height:auto;position:relative;text-align: center;padding-left:6px");


		var btnDeleteCrop = document.createElement('button');
		btnDeleteCrop.innerText = 'x'
		btnDeleteCrop.setAttribute("id", this.nbCrop.toString());
		btnDeleteCrop.setAttribute("class", "row close-button");
		btnDeleteCrop.addEventListener("click", this.delCrop);
		elem.appendChild(btnDeleteCrop);


		var croppedImg = new Image();
		croppedImg.setAttribute("style", "max-width: 100%; height: auto;");
		croppedImg.src = canvas.toDataURL();
		croppedImg.setAttribute("className", "row");
		elem.appendChild(croppedImg);

		document.querySelector('#cropat').prepend(elem);

	}



	Kanva(currInstru){
		return(
			
				<div id="central" className="row">
					
	                <canvas id="imgCanva" style={{width: '100%' , height: '100%'}} onMouseDown={this.qsstiKanvaDown} onMouseUp={this.qsstiKanvaUp} onMouseMove={this.qsstiKanvaMove} >
					</canvas>
					
	            </div>
	        
		)

		
	}


	friKanva(currInstru){
		var nva = document.querySelector('#imgCanva')

		// var rssm = document.querySelector('#crp1')		
		// var img = document.querySelector('#mainimage')
		if(nva && currInstru) {
			var ctx1 = nva.getContext("2d");
			// var ctx2 = rssm.getContext("2d");
			var img = new Image()
			
			img.onload = function(){
				ctx1.canvas.width = img.width;
  				ctx1.canvas.height = img.height;
				// ctx2.canvas.width = img.width;
  				// ctx2.canvas.height = img.height;
				document.getElementById('central').style.height = (((7/12)*(window.innerWidth))*(img.height)/(img.width)).toString()+"px"
				ctx1.drawImage(img,0,0);  
			}
			img.src = currInstru.src
			this.mainImage = img
		}
	}


	Center(currInstru) {
		return (

			<div id="santr" className="col-lg-7">

	              <div className="row">
	                
	              <div className="col" style={{height:'45px'}}> Central picture {currInstru.instru} </div>
	              </div>


	              	{this.Kanva(currInstru)}
	            	              	              


	              <div className="row" style={{height:'30px'}}></div>


	              <div className="row">
	                Message
	              </div>


	              {this.friKanva(currInstru)}
	         </div>

		)
	}



	Right(currentInstru){
		return(
			<div className="col-lg-3">
	            
	            <div id="infoz" className="col">
					<div className="row">
		            	Info 
		        	</div>
		            <div className="row">
		            	<div className="col">
			            	<div className="row">
			            		Instruction : {currentInstru.instru}
			            	</div>
			            	<div className="row">
			            		Task ID : {currentInstru.taskId}
			            	</div>
			            	<div className="row">
			            		Created At : {currentInstru.createdAt}
			            	</div>
			            	<div className="row">
			            		Urgency : {currentInstru.urgency}
			            	</div>
			            	<div className="row">
			            		Original Image : 
			            	</div>
			            </div>
		        	</div>
		        	
		        	
		        </div>


	            <div className="col" style={{height : '20px'}}></div>
	            

	            <div id="zcrops" className="col">
					<div className="row" style={{height : '30px'}}>Annotations</div>
					<div className="row" style={{height : '30px'}}></div>
					<div id="cropat" className="col" style={{height:'450px' , overflow : 'auto'}} >
			              
			        </div>

			        <div className="row" style={{height : '200px'}}>
			               
			        </div>
			    </div>
	        </div>
		)
	}






    render(){

    	var [firstCollecArray, restCollec, viewCollec, currentInstru] = this.getCollectionData(this.state)
      return(

        <main className="container-fluid">


          {this.NavBar()}

          
          <div className="row" >


          		{this.Left([firstCollecArray, restCollec, viewCollec, currentInstru])}


          		{this.Center(currentInstru)}
	        
	            
	         	{this.Right(currentInstru)}


          </div>

          

        </main>

    )
  }

}




export default App ;






// INSERT INTO auth_user (username, password, is_superuser, is_staff, first_name, last_name, email,is_active , date_joined)
// VALUES ('cosmic', 'pass', 1, 1, 'farawa', 'molchi', 'molchi@mol.io',1,  1);


// PRAGMA table_info(auth_user);