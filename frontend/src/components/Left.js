import React, { Component } from "react";
import axios from "axios";

import Nav from './Nav'
import Right from './Right'
import Center from './Center'




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
        view: ''
      }
      this.selectOnlyThis = this.selectOnlyThis.bind(this)
      this.selectFirst = this.selectFirst.bind(this)
    }


    renderCollection(view){
      console.log('HAD ZBI ',view)
    }


    selectOnlyThis(event){
      var myCheckbox = document.getElementsByName("myCheckbox");
      Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;  
      });
      event.target.checked = true;
      this.setState({view : event.target.id})
      this.renderCollection(event.target.id)
      

    }

    selectFirst(event){
      var myCheckbox = document.getElementsByName("myCheckbox");
      Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;  
      });
      event.target.checked = true;
      this.setState({view : ''})
      this.renderCollection(event.target.id)

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


    render(){

      const data = this.state.collection 

      const farsRow = data[0]

      const firstRow = data[0]
      console.log('KHSSO YKON IMG  ',firstRow)
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

      if (this.state.view.length>1) {
          farsRow.collection = this.state.view ;
          console.log('la rah dkhel')
      }

      let viewCollec = []

      for(let i=0;i<data.length;i++)
      {
        if (data[i].collection==farsRow.collection) {
          viewCollec.push(data[i].createdAt) ;
        }
      }
      console.log('firstrow ',farsRow)

      return(
        <main class="container-fluid">


          <Nav></Nav>
          
          <div class="row border">

          <div class="col-lg-2 border">


            <div class="col border">
              <div class="row border">
                  Objects :
                  <button onClick={this.fireBut}>SHOOT</button>
              </div>

              <div class="row border">
                <div class="col border">
                    { firstCollecArray.map((item,index) => { return <div class="row"><input type="checkbox" name="myCheckbox" id={item} onClick={this.selectFirst} /><label>{item}</label></div>; }) }
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
                    {viewCollec.map((item,index) => { return <div class="row"><button name="buttonImg" onclick={this.chooseInstruction}>{item}</button></div>; }) }
                  </div>
                </div>
            </div>
            
            
          </div>
          
          
          <Center></Center>
            
          <Right></Right>
          </div>

        </main>

    )
  }

}




export default Left ;

