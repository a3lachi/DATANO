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



class Left extends Component{
    constructor(props){
      super(props);
      this.state = {
        collection: [],
        view:1
      }
      this.selectOnlyThis = this.selectOnlyThis.bind(this)
    }

    handleCollecClick(){
      this.setState({view : 2})
    }
   

    selectOnlyThis(event){
      var myCheckbox = document.getElementsByName("myCheckbox");
      Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;    
      });
      event.target.checked = true;
      this.setState({view : event.target.id})
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

    fireBut(){
      console.log('brekti')
    }

    viewCollection(viewCollec){
      viewCollec.map((item,index) => { return <div class="row">{item}</div>; })
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

      let viewCollec = []

      for(let i=0;i<data.length;i++)
      {
        if (!viewCollec.includes(data[i].collection) && data[i].collection==firstRow.collection) {
          viewCollec.push(data[i].createdAt) ;
        }
      }

      return(

        <div class="col-lg-2 border">


          <div class="col border">
            <div class="row border">
                Objects :
                <button onClick={this.fireBut}>SHOOT</button>
            </div>

            <div class="row border">
              <div class="col border">
                  { firstCollecArray.map((item) => { return <div class="row"><input type="checkbox" name="myCheckbox" id={1} onClick={this.selectOnlyThis} /><label>{item}</label></div>; }) }
                  { restCollec.map((item,index) => { return <div class="row"><input type="checkbox" id={index+2} name="myCheckbox" onClick={this.selectOnlyThis} /><label>{item}</label></div>; }) }
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
                  {this.viewCollection}
                </div>
              </div>
          </div>
          
          
        </div>

    )
  }

}




export default Left ;

