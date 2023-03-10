import React, { Component } from "react";
import { canvas } from "canvas";



class Center extends Component{

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
			currI : ""
		}
		
		this.qsstiKanvaDown = this.qsstiKanvaDown.bind(this)
		this.qsstiKanvaUp = this.qsstiKanvaUp.bind(this)
		this.qsstiKanvaMove = this.qsstiKanvaMove.bind(this)      
		this.delCrop = this.delCrop.bind(this)      	
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

	drawImageOnKanva(currInstru){
		
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
			console.log('DKHEL ISSAWB CANVA', currInstru )
		}
	}

	render() {
		var currInstru = this.props.currInstru
		console.log('ooooooo ',currInstru)
		if (currInstru.instru) {
			return(

				<div id="santr" className="col-lg-7">

					<div id='foqcentral' className="row">
						<div className="col" > Instruction to follow :  {currInstru.instru} </div>
					</div>

					<div className="row" style={{height:'30px'}}></div>


					<div id="central" className="row">
					
						<canvas id="imgCanva" style={{width: '100%' , height: '100%'}} onMouseDown={this.qsstiKanvaDown} onMouseUp={this.qsstiKanvaUp} onMouseMove={this.qsstiKanvaMove} >
						</canvas>
					
	            	</div>
													


					<div className="row" style={{height:'30px'}}></div>


					<div className="row">
						Message
					</div>


					{this.drawImageOnKanva(currInstru)}
				</div>

			)
		}
		else { return null}
	}

	
}



export default Center ;