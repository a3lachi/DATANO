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

  componentDidMount(){
    console.log('dkhel left');
    console.log(this.props.arawkan);
  }


  render() {
    return(
      <div class="col-lg-2 border">

        <Groups arawkan={this.props}></Groups>

        <div class="col" style={{height : '40px'}}></div>

        <UpNext arawkan={this.props}></UpNext>
        
        
      </div>

    )
  }

}




export default Left ;