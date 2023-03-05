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

    selectOnlyThis(zid){
      var myCheckbox = document.getElementsByName("myCheckbox");
      console.log('Dkhelti khawi ',myCheckbox)
      Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;
        console.log('You clicked a collection.',el.name);
        
      });
      zid.checked = true;
      
      
    }

    componentDidMount() {
      this.refreshList();
    }

    fireBut(){
      console.log('Button');
    }

    refreshList = () => {
      axios
        .get("/api/Instructions/")
        .then((res) => this.setState({ collection: res.data }))
        .catch((err) => console.log(err));
    };

    
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
                <button onClick={this.fireBut()}>SHOOT</button>
            </div>

            <div class="row border">
              <div class="col border">
                  { firstCollecArray.map((item) => { return <div class="row"><input type="checkbox" name="myCheckbox" id="1" onClick={this.selectOnlyThis(this)} /><label>{item}</label></div>; }) }
                  { restCollec.map((item,index) => { return <div class="row"><input type="checkbox" id={index+2} name="myCheckbox" onClick={this.selectOnlyThis(this)} /><label>{item}</label></div>; }) }
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

