import React, { Component } from "react";




class Left extends Component {

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







    render(){

      return(
        
              <div class="col-lg-2 border">


                <Left data="" ></Left>


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





      )
    }
}








