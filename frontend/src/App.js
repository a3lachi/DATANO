import './App.css';
import React, { Component } from "react";
import axios from "axios";

import Nav from './components/Nav'
import Left from './components/Left'
import Right from './components/Right'
import Center from './components/Center'



class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      collection: []
    }
    console.log('App constructor')
  }

  componentDidMount(){
    this.refreshList();
  }

  refreshList = () => {
    axios.get("/api/Instructions")
      .then(response => {
        this.setState({ collection: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log('Bda yrendrei',this.state.collection);
    return (
      
      <main class="container-fluid">


        <Nav></Nav>
        
        <div class="row border">
          <Left leftData={this.state.ka} func={this.refreshList}></Left>

          <Center arawkan={this.state.collection}></Center>
          
          <Right arawkan={this.state.collection}></Right>
        
        </div>


      </main>
    );
  }
}


export default App;