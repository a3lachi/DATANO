import React, { Component } from "react";
import { flushSync } from 'react-dom';
import LeftUp from './LeftUp'
import LeftDown from './LeftDown'



class Left extends Component {
    constructor(props){
        super(props)
        this.state = {
            currCollectionId : 1,
            currInstruId : 1
        }


        this.selectCollection = this.selectCollection.bind(this)
        this.chooseInstruction = this.chooseInstruction.bind(this)

    }

    selectCollection(event){
        var myCheckbox = document.getElementsByName("myCheckbox");
        Array.prototype.forEach.call(myCheckbox,function(el){
          el.checked = false;  
        });
        event.target.checked = true;
        this.setState({currCollectionId : event.target.id})
    }

    chooseInstruction(event){
    	this.setState({currInstruId : event.target.id})
	    
	    // this.friKanva()
      
    }

    componentDidMount() {
		this.setState({ allData: this.props.data } )
    }

    listCollectionNames(data) {
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
                if (data[i].collection === this.state.currCollectionId) {
                    viewCollec.push(data[i]);
                }
            }
            return viewCollec
        }
        else { return null}
    }

    getCollectionData(data) {
        if(data && data[0]){
            const firstRow = data[0];
            const restCollec = [];

            for (let i = 1; i < data.length; i++) {
                if (!restCollec.includes(data[i].collection) && data[i].collection !== firstRow.collection) {
                    restCollec.push(data[i].collection);
                } 
            }
    
            
    
            let currentInstru = [];
            for (let i = 0; i < data.length; i++) {
            if (Object.is(data[i].id , Number(this.instruId))) {
                currentInstru = data[i];
            }
            }
    
            return [firstRow, restCollec, currentInstru];
            }
        else {
            return [ null , null , null , null ]
        }
      }

    render()
	{
        var [ firstRow, restCollec ] = this.listCollectionNames(this.props.data)
        var viewCollec = this.getViewCollection(this.props.data)

        if (firstRow && restCollec && viewCollec) {
            return (
                <div className="col-lg-2">
                    <LeftUp restCollec={restCollec} firstRow={firstRow} handler={this.selectCollection}/>
                    <LeftDown viewCollec={viewCollec} />
                </div> 
            ) 
        }
        else {return (null)}
	// 	return(

    //           

	// 			

    //             <div className="col" style={{height : '40px'}}></div>

    //             
                
                
    //           </div>

    //   )
	}
}



export default Left ;







