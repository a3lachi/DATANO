import React, { Component } from "react";
import Crop from './Crop'


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
		
		this.qsstiKanvaDown = this.qsstiKanvaDown.bind(this)
		this.qsstiKanvaUp = this.qsstiKanvaUp.bind(this)
		this.qsstiKanvaMove = this.qsstiKanvaMove.bind(this)      
		this.delCrop = this.delCrop.bind(this)      	
	}

	qsstiKanvaDown(event){	
		

		var imgHeit = document.getElementById('central').style.height
		imgHeit = imgHeit.slice(0,imgHeit.length-2)

		this.canvaCordX = Math.abs(event.pageX-(window.innerWidth*(2/12)) )*300/(window.innerWidth*(7/12))
		this.canvaCordY = (event.pageY - 148)*(150/imgHeit)

		var canvas = document.createElement('canvas');
		canvas.setAttribute('id','crp'+this.nbCrop.toString())
		canvas.style.height = '100%'
		canvas.style.width = '100%'
		canvas.addEventListener("mousedown", this.qsstiKanvaDown)
		canvas.addEventListener("mousemove", this.qsstiKanvaMove)
		canvas.addEventListener("mouseup", this.qsstiKanvaUp)

		document.getElementById('central').appendChild(canvas)

		this.isCrop = 1
		console.log('DATA POINTS',this.canvaCordX ,this.canvaCordY)	
	}

	qsstiKanvaMove(event){
		if (this.isCrop === 1) {
			
			var canvas = document.querySelector('#crp'+this.nbCrop.toString());
			var context = canvas.getContext("2d");
			
			var img = document.getElementById('imgCanva');

			var imgHeit = document.getElementById('central').style.height
			imgHeit = imgHeit.slice(0,imgHeit.length-2)


			var width = Math.abs((event.pageX-window.innerWidth*(2/12))*(300/(window.innerWidth*(7/12)))-this.canvaCordX )
			var height = Math.abs(   (event.pageY-148)*(150/imgHeit) - this.canvaCordY )

			this.heightCrop = height*imgHeit/150
			this.widthCrop = width*window.innerWidth*(7/12)/300


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
		var img = this.mainImage

		var imgHeit = document.getElementById('central').style.height
		imgHeit = imgHeit.slice(0,imgHeit.length-2)


		const canvas = document.createElement('canvas');
		canvas.width = this.widthCrop;
		canvas.height = this.heightCrop;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(img, this.canvaCordX, this.canvaCordY, this.widthCrop, this.heightCrop, 0, 0, this.widthCrop, this.heightCrop);

		console.log('TOL OL3RD', this.widthCrop , this.heightCrop )
		console.log('NQITAT',this.canvaCordX,this.canvaCordY)
		


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
		var cntrl = document.getElementById('central')
		console.log('HAD ZBI ',nva)
		if(nva && currInstru && cntrl) {
			console.log('il entre')
			var ctx1 = nva.getContext("2d");
			

			var img = new Image()
			img.src = currInstru.src
			img.onload = function(){
				ctx1.canvas.width = img.width;
  				ctx1.canvas.height = img.height;
				cntrl.style.height = (((7/12)*(window.innerWidth))*(img.height)/(img.width)).toString()+"px"
				ctx1.drawImage(img,0,0);  
			}
			this.mainImage = img
		}
		console.log('ha lablan' ,this.mainImage)
	}
	
	componentDidUpdate() {
		this.drawImageOnKanva(this.props.currInstru);
    }

	render() {
		var currInstru = this.props.currInstru
		
		if (currInstru.instru) {
			return(

				<div id="santr" className="col-lg-7">

					<div id='foqcentral' className="row">
						<div id="instdir" className="col" > Instruction :</div><div className="col-10">  {currInstru.instru} </div>
					</div>

					<div className="row" style={{height:'20px'}}></div>


					<div id="central" className="row">
					
						<canvas id="imgCanva" style={{width: '100%' , height: '100%'}} onMouseDown={this.qsstiKanvaDown} onMouseUp={this.qsstiKanvaUp} onMouseMove={this.qsstiKanvaMove} >
						</canvas>
					
	            	</div>
													

					<div className="row" style={{height:'20px'}}></div>

					<div id="msgsection" className="row" >
						<textarea id="brr" placeholder="Comment.." width="100%" rows="5"></textarea>
					</div>
					{/* <div class="row flex justify-center">
						<div class="relative mb-3 xl:w-full"  data-te-input-wrapper-init>
							<textarea
							class="peer block h-1/2 w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
							id="exampleFormControlTextarea1"
							rows="6"
							placeholder="Comment..."></textarea>


							<label
							for="exampleFormControlTextarea1"
							class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
							>Comment</label
							>
						</div>
						</div> */}
					</div>

			)
		}
		else { return null}
	}

	
}



export default Center ;