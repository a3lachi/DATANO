import React, { Component } from "react";
import { canvas } from "canvas";



class Right extends Component{

    render(){
    var currentInstru = this.props.currentInstru

    if(currentInstru.instru) {
        
            return(
                <div className="col-lg-3">
                    
                    <div id="infoz" className="col">
                        <div className="row">
                            Info 
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    Instruction : {currentInstru.instru}
                                </div>
                                <div className="row">
                                    Task ID : {currentInstru.taskId}
                                </div>
                                <div className="row">
                                    Created At : {currentInstru.createdAt}
                                </div>
                                <div className="row">
                                    Urgency : {currentInstru.urgency}
                                </div>
                                <div className="row">
                                    Original Image : 
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>


                    <div className="col" style={{height : '20px'}}></div>
                    

                    <div id="zcrops" className="col">
                        <div className="row" style={{height : '30px'}}>Annotations</div>
                        <div className="row" style={{height : '30px'}}></div>
                        <div id="cropat" className="col" style={{height:'450px' , overflow : 'auto'}} >
                            
                        </div>

                        <div className="row" style={{height : '200px'}}>
                            
                        </div>
                    </div>
                </div>
            )
        }
    }
    else { return null}

}




export default Right ;