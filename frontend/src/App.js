import React, { Component } from "react";
import axios from "axios";
import Nav from './components/Nav'
import Right from './components/Right'
import Center from './components/Center'
import ImageCropper from './components/ImageCropper'
import './components/Left.css'



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
        view: '',
        instru:''
      }
      this.selectOnlyThis = this.selectOnlyThis.bind(this)
      this.chooseInstruction = this.chooseInstruction.bind(this)
    }

    cursor(){
      const lol = document.getElementById('lol');
      const image = document.getElementById('image');
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      let isDragging = false;
      let startX;
      let startY;
      let endX;
      let endY;

      // Add event listeners to the image element to handle the mouse events
      image.addEventListener('mousedown', handleMouseDown);
      image.addEventListener('mousemove', handleMouseMove);
      image.addEventListener('mouseup', handleMouseUp);

      function handleMouseDown(event) {
        isDragging = true;
        startX = event.offsetX;
        startY = event.offsetY;
      }

      function handleMouseMove(event) {
        if (!isDragging) return;

        endX = event.offsetX;
        endY = event.offsetY;

        // Clear the canvas and draw the selected area
        canvas.width = lol.offsetWidth;
        canvas.height = lol.offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(startX, startY, endX - startX, endY - startY);
      }

      function handleMouseUp(event) {
        isDragging = false;

        // Calculate the selected area and crop the image
        const x = Math.min(startX, endX);
        const y = Math.min(startY, endY);
        const width = Math.abs(startX - endX);
        const height = Math.abs(startY - endY);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

        // Replace the image with the cropped image
        image.src = canvas.toDataURL();
      }
    }

    selectOnlyThis(event){
      var myCheckbox = document.getElementsByName("myCheckbox");
      Array.prototype.forEach.call(myCheckbox,function(el){
        el.checked = false;  
      });
      event.target.checked = true;
      this.setState({view : event.target.id})
    }

    chooseInstruction(event){
      this.setState({instru : event.target.id})

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


      const firstRow = data[0]
      var farsRow = this.state.view


      let restCollec = []
      let firstCollecArray = []
     
      

      for(let i=1;i<data.length;i++){
        if (!restCollec.includes(data[i].collection) && data[i].collection!==firstRow.collection) {
          restCollec.push(data[i].collection) ;
        }
        else if(firstCollecArray.length<1){
          firstCollecArray.push(data[i].collection)
        } 
      }


      let viewCollec = [] ;

      for(let i=0;i<data.length;i++)
      {
        if (data[i].collection==this.state.view) {
          viewCollec.push(data[i]) ;
        }
      }


      let currentInstru = []
      for(let i=0;i<data.length;i++)
      {
        if (data[i].id==this.state.instru) {
          currentInstru = data[i] ;
        }
      }


      console.log('viewCollec ',currentInstru)


      return(

        <main class="container-fluid">


          <Nav></Nav>
          
          <div class="row border">

          <div class="col-lg-2 border">


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
          
          
          <div class="col-lg-7 border">
              <div class="row border">
                Central picture {currentInstru.instru}
              </div>
              <div class="row border">

              <div class="col border" id="lol"  style={{position: 'relative'}} ><img id="mainimage" src={currentInstru.src} /></div>
                
              </div>
              <div class="row border" style={{height:'30px'}}>
                
              </div>
              <div class="row border">
                Message
              </div>
          </div>
            
          <Right data={currentInstru}></Right>
          </div>

        </main>

    )
  }

}




export default Left ;

