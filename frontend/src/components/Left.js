import React, { Component } from "react";
import axios from "axios";


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
    
    render(){
      const data = this.state.collection 

      let firstCollec = data[0]

      let collec = new Array(firstCollec) 

      for(let i=1;i<data.length;i++){
        if (!collec.includes(data[i].collection)) {
          collec.push(data[i].collection) ;
        };
      }
      
      console.log('Data li wslat l left :',firstCollec.collection)
      return(

        <div class="col-lg-2 border">


          <div class="col border">
            <div class="row border">
                Objects :
            </div>

            <div class="row border">
              <div class="col border">
                  { collec.map((item) => { return <div class="row"><input type="checkbox"/><label>{item}</label></div>; }) }
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

