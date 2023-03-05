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
      collection: [
        {name: 'Billy', role: 'admin'},
        {name: 'Sally', role: 'contributor'}
      ],
      ja:'jib'
    }
  }


  componentDidMount(){
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/Instructions")
      .then((res) => this.setState({ collection: res.data }))
      .catch((err) => console.log('err'));
  }

  showData(){  

    let Hah = this.state.collection  ;
    return (
        <div>Mal
          { Hah.map(instru => (
                <div>
                    <p>{instru.createdAt}</p>
                    <p>{instru.status}</p>
                </div>
          ))}
        </div>
    )
  }

  louhData(){
    let Hah = this.state.collection  ;
    return (<div>{ <p>{Hah[0].createdAt}</p> }</div>)
  }

  render() {
    return (
      
      <main class="container-fluid">


        <Nav></Nav>
        
        <div class="row border">

          <Left arawkan={this.louhData()}></Left>

          <Center arawkan={this.louhData()}></Center>
          
          <Right arawkan={this.louhData()}></Right>
        
        </div>


      </main>
    );
  }
}


export default App;