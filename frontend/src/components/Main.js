import React, { Component } from "react";
import LeftUp from './LeftUp'
import LeftDown from './LeftDown'
import Center from './Center'
import Right from './Right'




class Main extends Component {


    constructor(props){
        super(props)
        this.state = {
            currCollectionName:"",
            currInstruId : "",
            isCcollectionSelected : false
        }


        this.selectCollection = this.selectCollection.bind(this)
        this.selectInstruction = this.selectInstruction.bind(this)

    }





    // HANDLERZZ changent states,,, render() kitssna/kikhdm b new state 
    selectCollection(event){
        var myCheckbox = document.getElementsByName("myCheckbox");
        Array.prototype.forEach.call(myCheckbox,function(el){
          el.checked = false;  
        });
        event.target.checked = true;

        // event.target.id  coresponds to NAME
        this.setState({ isCcollectionSelected: true , currCollectionName: event.target.id   })
    }

    selectInstruction(event){
	    this.setState({currInstruId : event.target.id})      
    }    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////





    //// BUSINESS LOGICCCC           //////////////////////////////////////////////////////////////////////////////
    getCollectionNames(data) {
        if(data && data[0]){
            const firstRow = data[0];
            const restCollec = [];

            for (let i = 1; i < data.length; i++) {
                if (!restCollec.includes(data[i].collection) && data[i].collection !== firstRow.collection) {
                    restCollec.push(data[i].collection);
                } 
            }
            return [ firstRow.collection , restCollec ]
        }
        else {
            return [null, null]
        }
    }

    getViewCollection(data){
        if(data) {
            const viewCollec = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].collection === this.state.currCollectionName) {
                    viewCollec.push(data[i]);
                }
            }
            return viewCollec
        }
        else { return null }
    }

    getInstruction(data){
        if(data){
            let currentInstru = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == Number(this.state.currInstruId)) {
                    currentInstru = data[i];
                }
            }
            return currentInstru
        }
        else { return null}
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






    render(){

        var [ firstRow, restCollec ] = this.getCollectionNames(this.props.data)
        var viewCollec = this.getViewCollection(this.props.data)
        var currInstru = this.getInstruction(this.props.data)


        if (firstRow && restCollec ) {
            return (
                <>
                    <div className="col-lg-2">
                        <LeftUp restCollec={restCollec} firstRow={firstRow} handler={this.selectCollection}/>
                        
                        <div className="col" style={{height : '40px'}}></div>

                        <LeftDown viewCollec={viewCollec} handler={this.selectInstruction} />

                        {/* {viewCollec[0] ? <LeftDown         /> : nulll }                    where to handle business lgic ?                                            */} 
                    
                    </div> 

                    <Center currInstru={currInstru} />

                    <Right currInstru={currInstru} />
                </>
            ) 
        }
        else {return (null)}
	}


}



export default Main ;







