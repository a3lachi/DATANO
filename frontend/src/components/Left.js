import React, { Component } from "react";



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

    }

    componentDidMount() {
      this.refreshList();
    }

    refreshList = () => {
      axios
        .get("/api/Instructions/")
        .then((res) => this.setState({ todoList: res.data }))
        .catch((err) => console.log(err));
    };
    
    render(){
      return(

        <div class="col-lg-2 border">


          <Groups></Groups>

          <div class="col" style={{height : '40px'}}></div>

          <UpNext></UpNext>
          
          
        </div>

    )
  }

}




export default Left ;

