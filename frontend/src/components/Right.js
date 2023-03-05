import React, { Component } from "react";



class Info extends Component{

	render(){
		return(
			<div class="col border">
				<div class="row border">
	            	Info 
	        	</div>
	            <div class="row border">
	            	<div class="col border">
		            	<div class="row border">
		            		Instruction :
		            	</div>
		            	<div class="row border">
		            		Task ID :
		            	</div>
		            	<div class="row border">
		            		Created At :
		            	</div>
		            	<div class="row border">
		            		Urgency :
		            	</div>
		            	<div class="row border">
		            		Original Image :
		            	</div>
		            </div>
	        	</div>
	        	
	        	
	        </div>
		)
	}
}


class Annotations extends Component{


	render(){
		return(
			<div class="col border">
				<div class="row border">
		              Annotations 
		        </div>


		        <div class="row border" style={{height : '200px'}}>
		               
		        </div>
		    </div>
		)
	}
}




class Right extends Component{



	render() {
		return(
			<div class="col-lg-3 border">
	            <Info class="row border" data={this.props}></Info>
	            <div class="col" style={{height : '20px'}}></div>
	            <Annotations></Annotations>
	        </div>
		)
	}
}


export default Right;