import React, { Component } from "react";
import axios from "axios";
import './components/Left.css'
import Styles from './components/Styles'
import './App.css'
import { canvas } from "canvas";
import Main from './components/Main'


class App extends Component{

	allData = []

	firstCollecArray = [] 
	restCollec = [] 
	viewCollec = [] 
	currentInstru = []

	canvaCordX = ''
	canvaCordY = ''
	isCrop = 0
	theCropsCord = []
	tkhrbiqa = 0
	mainImage  = ''
	nbCrop = 1
	widthCrop = 0
	heightCrop = 0

    constructor(props){
      super(props);
      this.state = {
        collection: [],
        view: '',
        instru:'',
        qanva:[]
      }


      
      this.qsstiKanvaDown = this.qsstiKanvaDown.bind(this)
      this.qsstiKanvaUp = this.qsstiKanvaUp.bind(this)
      this.qsstiKanvaMove = this.qsstiKanvaMove.bind(this)      
	  this.delCrop = this.delCrop.bind(this)      
	  
    }


    componentDidMount() {
		this.getData();
    }

    

    getData = () => {
      axios
        .get("/api/Instructions/")
        .then((res) => {this.setState({ collection: res.data } ) })
        .catch((err) => console.log(err));
    };

    getCollectionData(data) {

	  var firstRow = data[0];
	  var restCollec = [];
	  var firstCollecArray = [];

	  for (let i = 1; i < data.length; i++) {
	    if (!restCollec.includes(data[i].collection) && data[i].collection !== firstRow.collection) {
	      restCollec.push(data[i].collection);
	    } else if (firstCollecArray.length < 1) {
	      firstCollecArray.push(data[i].collection);
	    }
	  }

	  const viewCollec = [];
	  for (let i = 0; i < data.length; i++) {
	    if (data[i].collection === this.state.view) {
	      viewCollec.push(data[i]);
	    }
	  }

	  let currentInstru = [];
	  for (let i = 0; i < data.length; i++) {
	    if (Object.is(data[i].id , Number(this.instruId))) {
	      currentInstru = data[i];
	    }
	  }

	  return [firstCollecArray, restCollec, viewCollec, currentInstru];
	}

	NavBar() {
		return(
				<nav className="navbar navbar-inverse navbar-fixed-top" >
			        <div className="container-fluid">
			          <div className="navbar-header">
			            <a  href="navDatano" className="navbar-brand" >DATANO API - Image Annotation</a>
			          </div>
			        </div>
		        </nav>
		)
	}
	


    render(){

    	var [firstCollecArray, restCollec, viewCollec, currentInstru] = this.getCollectionData(this.state.collection)
      return(

        <main className="container-fluid">


          {this.NavBar()}

          
          <div className="row" >
				<Main data={this.state.collection} ></Main>


          </div>

          

        </main>

    )
  }

}




export default App ;






// INSERT INTO auth_user (username, password, is_superuser, is_staff, first_name, last_name, email,is_active , date_joined)
// VALUES ('cosmic', 'pass', 1, 1, 'farawa', 'molchi', 'molchi@mol.io',1,  1);


// PRAGMA table_info(auth_user);