import React, { Component } from "react";



class Right extends Component{



    render(){
        var currInstru = this.props.currInstru
        
        if(currInstru.instru) {
            
            return(
                <div className="col-lg-3">
                    
                    <div id="infoz" className="col">
                        <div className="col">
                                <div className="row">
                                    Instruction : {currInstru.instru}
                                </div>
                                <div className="row">
                                    Task ID : {currInstru.taskId}
                                </div>
                                <div className="row">
                                    Created At : {currInstru.createdAt}
                                </div>
                                <div className="row">
                                    Urgency : {currInstru.urgency}
                                </div>
                                <div className="row">
                                    Original Image : 
                                </div>
                        </div>
                        
                        
                    </div>


                    <div className="col" style={{height : '20px'}}></div>
                    

                    <div id="zcrops" className="col">
                        <div className="row" id="ntatio" style={{height : '30px'}}>Annotations</div>
                        <div className="row" style={{height : '30px'}}></div>
                        <div id="cropat" className="col" style={{height:'550px' , display: 'flex' , justifyContent: 'center', flexDirection: 'column' , alignItems: 'center' , height: "100%"}} >
                            
                        </div>
                    </div>
                </div>
            )
        }
        else { return null}
    }

}




export default Right ;