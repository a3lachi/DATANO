import './App.css';
import React, { Component } from "react";


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
  }

  

  render() {
    return (
      
      <main class="container-fluid">


        <Nav></Nav>
        
        <div class="row border">
          <Left leftData={this.state.ka} ></Left>

          <Center arawkan={this.state.collection}></Center>
          
          <Right arawkan={this.state.collection}></Right>
        
        </div>


      </main>
    );
  }
}


export default App;