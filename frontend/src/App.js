import React, { Component } from "react";
import axios from "axios";
import Nav from './components/Nav'
import Right from './components/Right'
import Center from './components/Center'
import ImageCropper from './components/ImageCropper'
import './components/Left.css'



class Groups extends Component{

  constructor(props){
    super(props);

  }

  classGroups(props){
    console.log(props.createdAt)
    return(null)
  }

  render(){
    return(
      <div class="col border">
        <div class="row border">
            Objects :
        </div>
        {this.classGroups(this.props)}
        <div class="row border">
            List of Objects
        </div>
      </div>
      )
  }
}





class Left extends Component{
    constructor(props){
      super(props);
      this.state = {
        collection: [],
        view: '',
        instru:''
      }
      this.selectOnlyThis = this.selectOnlyThis.bind(this)
      this.chooseInstruction = this.chooseInstruction.bind(this)
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
	  const data = state.collection;
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
	    if (data[i].id === this.state.instru) {
	      currentInstru = data[i];
	    }
	  }

	  return [firstCollecArray, restCollec, viewCollec, currentInstru];
	}


    render(){

    	var dataCollection = this.getCollectionData(this.state)

    	let firstCollecArray = dataCollection[0]
    	let restCollec = dataCollection[1]
    	let viewCollec = dataCollection[2]
    	let currentInstru = dataCollection[3]
    	console.log("data dyalna ",dataCollection)
      // const data = this.state.collection 


      // const firstRow = data[0]
      // var farsRow = this.state.view


      // let restCollec = []
      // let firstCollecArray = []
     
      

      // for(let i=1;i<data.length;i++){
      //   if (!restCollec.includes(data[i].collection) && data[i].collection!==firstRow.collection) {
      //     restCollec.push(data[i].collection) ;
      //   }
      //   else if(firstCollecArray.length<1){
      //     firstCollecArray.push(data[i].collection)
      //   } 
      // }


      // let viewCollec = [] ;

      // for(let i=0;i<data.length;i++)
      // {
      //   if (data[i].collection==this.state.view) {
      //     viewCollec.push(data[i]) ;
      //   }
      // }


      // let currentInstru = []
      // for(let i=0;i<data.length;i++)
      // {
      //   if (data[i].id==this.state.instru) {
      //     currentInstru = data[i] ;
      //   }
      // }


      return(

        <main class="container-fluid">


          <Nav></Nav>
          
          <div class="row border">

          <div class="col-lg-2 border">


            <div class="col border">
              <div class="row border">
                  Objects :
                  
              </div>

              <div class="row border">
                <div class="col border">
                    { firstCollecArray.map((item,index) => { return <div class="row"><input type="checkbox" name="myCheckbox" id={item} onClick={this.selectOnlyThis} /><label>{item}</label></div>; }) }
                    { restCollec.map((item,index) => { return <div class="row"><input type="checkbox" name="myCheckbox" id={item} onClick={this.selectOnlyThis} /><label>{item}</label></div>; }) }
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
                    {viewCollec.map((item,index) => { return <div class="row"><img src={item.src} style={{width:'100%'}} /><button name="buttonImg" id={item.id} onClick={this.chooseInstruction}>{item.taskId}</button></div>; }) }
                  </div>
                  
                </div>
            </div>
            
            
          </div>
          
          
          <div class="col-lg-7 border">
              <div class="row border">
                Central picture {currentInstru.instru}
              </div>
              <div class="row border">

              <div class="col border" id="lol"  style={{position: 'relative'}} ><img id="mainimage" src={currentInstru.src} /></div>
                
              </div>
              <div class="row border" style={{height:'30px'}}>
                
              </div>
              <div class="row border">
                Message
              </div>
          </div>
            
          <Right data={currentInstru}></Right>
          </div>

        </main>

    )
  }

}




export default Left ;

