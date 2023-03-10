import React, { Component } from "react";


class LeftDown extends Component {
    

    render(){

        var viewCollec = this.props.viewCollec

        
            if(viewCollec && viewCollec[0]){
                return (
                    <div id="lezobjet" className="col">
                        <div id='apnxt' className="row">
                        Up Next 
                        </div>

                        <div className="row">
                            
                        <div className="col" style={{height:'550px' , overflow : 'auto'}}>
                            <div className="row" style={{height:'20px'}}></div>
                            {viewCollec.map((item,index) => { return <div className="row" key={item.id.toString()}><div className="col"><img alt={item.taskId.toString()} src={item.src.toString()} id={item.id.toString()} style={{width:'100%'}} onClick={this.props.handler} /><div style={{height:'20px'}}></div></div></div>; }) }
                        </div>
                        
                        </div>
                    </div>
                )
            }
            else { return null}
    }


}




export default LeftDown ;