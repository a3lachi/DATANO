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
  constructor(props) {
    super(props);
    console.log('Left constructor')
  }

  async componentDidMount() {
    console.log("Ha data li wsslat left ",this.props.leftData);
  }


  render() {
    return(
      <div class="col-lg-2 border">

        <Groups data={this.props.leftData}></Groups>

        <div class="col" style={{height : '40px'}}></div>

        <UpNext data={this.props.arawkan}></UpNext>
        
        
      </div>

    )
  }

}




export default Left ;