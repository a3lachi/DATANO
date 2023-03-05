import React, { Component } from "react";



class Groups extends Component{

  render(){
    return(
      <div class="col border">
        <div class="row border">
            Objects :
        </div>
        <div class="row border">
            List of Objects
        </div>
      </div>
    )
  }
}

class UpNext extends Component{

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

  render() {
    return(
      <div class="col-lg-2 border">

        <Groups arawkan={this.props.taz}></Groups>

        <div class="col" style={{height : '40px'}}></div>

        <UpNext arawkan={this.props.taz}></UpNext>
        
        
      </div>

    )
  }

}




export default Left ;