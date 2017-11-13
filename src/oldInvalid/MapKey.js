import React, { Component } from 'react';

class MapKey extends Component {

    render() {
         var grades = [0,...this.props.grades]
         console.log("mapkey grades",grades);
         
        return (
             <div className="info legend" style={{marginBottom:'11vh'}}>
                <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                {grades.map(function(object, i){
                    var bg=this.props.getColor(object + 1,this.props.colorSet,this.props.grades)
                    return (
                            <div key={i+this.props.colorSet}>
                                <i style={{background:bg}}  ></i>
                                {(grades[i + 1] ? (grades[i]+' %  -  '+grades[i+1]+" % "): ' + '+grades[i]+" % " ) }
                                <br/>
                            </div>
                        )
                },this)}
                <div style={{paddingTop:"0.5rem"}} >
                <i style={{background:"#c2e699"}}  ></i>Water
                </div>
                <div>
                <i style={{background:"#252525"}}  ></i>Unavailable
                </div>
            </div>
        );
    }
}

export default MapKey;