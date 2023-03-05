import React, { Component } from "react";
import axios from "axios";
import $ from 'jquery'


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





class UpNext extends Component{
  constructor(props){
    super(props);

  }


  render(){
    return(
      <div class="col border">
          <div class="row border">
            Up Next 
          </div>
          <div class="row border">
            Imagesssze 
          </div>
      </div>
    )
  }
}





class Left extends Component{
    constructor(props){
      super(props);
      this.state = {
        collection: []
      }

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

    firstCollection(){
      return <div class="row"><input type="checkbox" checked/><label>{this.state.collection.collection}</label></div> 
    }
    
    render(){
      const data = this.state.collection 

      const firstRow = data[0]

      let restCollec = []

      let firstCollecArray = []
      
      

      for(let i=1;i<data.length;i++){
        if (!restCollec.includes(data[i].collection) && data[i].collection!=firstRow.collection) {
          restCollec.push(data[i].collection) ;
        }
        else if(firstCollecArray.length<1){
          firstCollecArray.push(data[i].collection)
        } 
      }



       
      
      console.log('First element :',firstRow)
      return(

        <div class="col-lg-2 border">


          <div class="col border">
            <div class="row border">
                Objects :
            </div>

            <div class="row border">
              <div class="col border">
                  { firstCollecArray.map((item) => { return <div class="row"><input type="checkbox" checked='true'/><label>{item}</label></div>; }) }
                  { restCollec.map((item) => { return <div class="row"><input type="checkbox"/><label>{item}</label></div>; }) }
              </div>
            </div>
          </div>

          <div class="col" style={{height : '40px'}}></div>

          <UpNext></UpNext>
          
          
        </div>

    )
  }

}




export default Left ;

