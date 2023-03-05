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
    console.log('App constructor')
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // // async refreshList() {
  // //   try {
  // //     console.log("APP RCOMPO DID MOUNT")
  // //     const res = await axios.get("/api/Instructions");
  // //     this.setState({ collection: res.data });
  // //   } catch (err) {
  // //     console.log(err);
  // //   }
  // // }
  // refreshList = () => {
  //   axios
  //     .get("/api/Instructions")
  //     .then((res) => this.setState({ collection: res.data }))
  //     .catch((err) => console.log('err'));
  // }


  // tell(){
  //   console.log('Tell data f App ',this.state.collection)
  // }

  render() {
    console.log('Bda yrendrei');
    {this.refreshList()}
    return (
      
      <main class="container-fluid">


        <Nav></Nav>
        
        <div class="row border">
          {this.tell()}
          <Left leftData={this.state.ja}></Left>

          <Center arawkan={this.state.collection}></Center>
          
          <Right arawkan={this.state.collection}></Right>
        
        </div>


      </main>
    );
  }
}


export default App;