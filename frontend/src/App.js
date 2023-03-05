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
      collection: [],
      ja:'jib'
    }
  }


  componentDidMount(){
    this.refreshList();
    console.log(this.state.collection)
  }

  refreshList = () => {
    axios
      .get("/api/Instructions")
      .then((res) => this.setState({ collection: res.data }))
      .catch((err) => console.log('err'));
  }

  render() {
    return (
      
      <main class="container-fluid">


        <Nav></Nav>
        
        <div class="row border">

          <Left arawkan={this.state.collection}></Left>

          <Center arawkan={this.state.collection}></Center>
          
          <Right arawkan={this.state.collection}></Right>
        
        </div>


      </main>
    );
  }
}


export default App;