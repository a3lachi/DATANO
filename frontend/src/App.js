import React, { Component } from "react";
import axios from "axios";
import Nav from './components/Nav'
import ImageCropper from './components/ImageCropper'
import './components/Left.css'
import './App.css'
import { fabric } from "fabric";
import { canvas } from "canvas";






class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        collection: [],
        view: '',
        instru:''
      }
      this.selectOnlyThis = this.selectOnlyThis.bind(this)
      this.chooseInstruction = this.chooseInstruction.bind(this)
      this.cropCenter = this.cropCenter.bind(this)
      this.dragView = this.dragView.bind(this)
    }

    dragView(event){
    	console.log('RAK DRAGUI')
    }

    cropCenter(event){
    	console.log('BRKTI F TSWIRA')
    	console.log('X ',event.clientY,' -- Y ',event.clientY)
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
      this.setState({instru : event.target.id})
    }


    componentDidMount() {
      this.refreshList();
    }

    

    refreshList = () => {
      axios
        .get("/api/Instructions/")
        .then((res) => this.setState({ collection: res.data }))
        .catch((err) => console.log(err));
    };

    getCollectionData(state) {
	  const data = this.state.collection;
	  const firstRow = data[0];
	  const farsRow = state.view;
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
	    if (Object.is(data[i].id , Number(this.state.instru))) {
	      currentInstru = data[i];
	    }
	  }

	  return [firstCollecArray, restCollec, viewCollec, currentInstru];
	}
	  
	Left(data)
	{
		var [firstCollecArray, restCollec, viewCollec, currentInstru] = data ;
		return(

              <div class="col-lg-2 border">


                <div class="col border">
                  <div class="row border">
                      Objects :
                      
                  </div>

                  <div class="row border">
                    <div class="col border">
                        { firstCollecArray.map((item,index) => { return <div class="row"><input type="checkbox" name="myCheckbox" id={item} onClick={this.selectOnlyThis} /><label>{item}</label></div>; }) }
                        { restCollec.map((item,index) => { return <div class="row"><input type="checkbox" name="myCheckbox" id={item} onClick={this.selectOnlyThis}  /><label>{item}</label></div>; }) }
                    </div>
                  </div>
                </div>

                <div class="col" style={{height : '40px'}}></div>

                <div class="col border">
                    <div class="row border">
                      Up Next 
                    </div>
                    <div class="row border">
                      
                      <div class="col border">
                      	<div class="row" style={{height:'20px'}}></div>
                        {viewCollec.map((item,index) => { return <div class="row"><div class="col"><img src={item.src} id={item.id} style={{width:'100%'}} onClick={this.chooseInstruction} onDrag={this.dragView} /><div style={{height:'20px'}}></div></div></div>; }) }
                      </div>
                      
                    </div>
                </div>
                
                
              </div>

      )
	}

	Kanva() {
		// var canvas = new Canvas('kan');
		// fabric.Image.fromURL('https://www.travelandleisure.com/thmb/xhs5KqfgyqZwdEAqaWu_d7R2gR4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/blue0517-4dfc85cb0200460ab717b101ac07888f.jpg', function(img) {
		//   img.scale(0.5).set({
		//     left: 0,
		//     top:0
		//   });
		//   canvas.add(img).setActiveObject(img);
		// });

		var info = document.getElementById('kan');

		info.on({
			  'touch:drag': function() {
			    console.log('BRKTI F TSWIRA') ;
			  }
		})
	}



	Center(currInstru) {

		return (

			<div class="col-lg-7 border">

	              <div class="row border">
	                Central picture { currInstru.instru}
	              </div>


	              <div class="row border" id='mal3oba' style={{height: '200px'}} >
	                <canvas id="kan">Ml3oba hna {this.Kanva()}</canvas>
	              </div>


	              <div class="row border">

	              	<div class="col border" id="lol"  style={{position: 'relative'}}  onClick={this.cropCenter} ><img id="mainimage" src={currInstru.src} onDrag={this.dragView}/></div>
	                
	              </div>


	              <div class="row border" style={{height:'30px'}}></div>


	              <div class="row border">
	                Message
	              </div>



	         </div>
		)
	}



	Right(currentInstru){
		return(
			<div class="col-lg-3 border">
	            
	            <div class="col border">
					<div class="row">
		            	Info 
		        	</div>
		            <div class="row border">
		            	<div class="col border">
			            	<div class="row border">
			            		Instruction : {currentInstru.instru}
			            	</div>
			            	<div class="row border">
			            		Task ID : {currentInstru.taskId}
			            	</div>
			            	<div class="row border">
			            		Created At : {currentInstru.createdAt}
			            	</div>
			            	<div class="row border">
			            		Urgency : {currentInstru.urgency}
			            	</div>
			            	<div class="row border">
			            		Original Image : 
			            	</div>
			            </div>
		        	</div>
		        	
		        	
		        </div>


	            <div class="col" style={{height : '20px'}}></div>
	            

	            <div class="col border">
					<div class="row border">
			              Annotations 
			        </div>


			        <div class="row border" style={{height : '200px'}}>
			               
			        </div>
			    </div>
	        </div>
		)
	}






    render(){

    	var [firstCollecArray, restCollec, viewCollec, currentInstru] = this.getCollectionData(this.state)

      return(

        <main class="container-fluid">


          <Nav></Nav>

          
          <div class="row border">


          		{this.Left([firstCollecArray, restCollec, viewCollec, currentInstru])}


          		{this.Center(currentInstru)}
	        
	            
	         	{this.Right(currentInstru)}


          </div>



        </main>

    )
  }

}




export default App ;

