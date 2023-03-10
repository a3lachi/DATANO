import React, { Component } from "react";
import { flushSync } from 'react-dom';



class LeftUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            currCollectionId : 1,
            currInstruId : 1
        }
    }

    render() {

        var firstRow = this.props.firstRow
        var restCollec = this.props.restCollec

        return(
            <div>
 				<div id="objectz" className="col">
    			<div id='objectzName'className="row">
 					Objects :
                
				</div>

				<div id='objectzList' className="row" >
 					<div className="col" >
 						<div className="row" key={firstRow.toString()}><input type="checkbox" name="myCheckbox" id={firstRow.toString()} onClick={this.props.handler.selectCollection} />{firstRow.toString()}</div>
						{ restCollec.map((item,index) => { return <div className="row" key={item.toString()}><input type="checkbox" name="myCheckbox" id={item.toString()} onClick={this.props.handler.selectCollection}  />{item.toString()}</div>; }) }
 					</div>
				</div>
				</div>
			</div>
        )

	}
}




export default LeftUp ;

