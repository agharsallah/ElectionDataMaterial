import React, { Component } from 'react';

class MapKey extends Component {

    render() {
         var grades = [0,...this.props.grades]
         console.log("mapkey grades",grades);
         console.log(this.props.colorSet);
        return (
             <div className="infoLegendStat legend">
                <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                {grades.map(function(object, i){
                    var bg=this.props.getColor(object + 1,this.props.colorSet,this.props.grades)
                    console.log('bbbbbbbbbb',bg);
                    return (
                            <div key={i+this.props.colorSet}>
                                <i style={{background:bg}}  ></i>
                                {(grades[i + 1] ? (grades[i]+' %  -  '+grades[i+1]+" % "): ' + '+grades[i]+" % " ) }
                                <br/>
                            </div>
                        )
                },this)}
            </div>
        );
    }
}

export default MapKey;