import './App.css';
import React, { Component } from "react";
import axios from "axios";



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
      .then((res) => this.setState({ collection: Object.values(res.data) }))
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

  render() {
    return (
      
      <main class="container-fluid">

        <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a href="" class="navbar-brand" >DATANO API - Image Annotation</a>
          </div>
        </div>
        </nav>
        
        <div class="row">
          <div class="col-lg-2 border">
            <div class="row border">
              Objects 
            </div>
            <div class="row border">
              Up Next 
            </div>
            
          </div>
          <div class="col-lg-7 border">
            <div class="row border">
              Central picture 
            </div>
            <div class="row border">
              {this.showData()}
            </div>
          </div>
          <div class="col-lg-3 border">
            <div class="row border">
              Info 
            </div>
            <div class="row border">
              Annotations 
            </div>
            
          </div>
        </div>

        <div class="row">
        </div>


      </main>
    );
  }
}
export default App;