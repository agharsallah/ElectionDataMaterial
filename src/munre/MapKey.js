import React, { Component } from 'react';
import  './../s.css' ;
class MapKey extends Component {
    getColor(d,c1) {
        if      (d >2)      {return (c1[2]); }
        else if (d >1)      {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}
    render() {
         var grades = this.props.grades;
        return (
             <div className="info legend" style={{marginBottom:'11vh'}} >
                <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                {grades.map(function(object, i){
                    if(object=="Extended"){object=1}else if (object=="New"){object=2}else{object=3}
                    var bg= this.getColor(object,this.props.colorSet)
                    return (
                            <div key={i+this.props.colorSet}>
                                <i style={{background:bg}}  ></i>
                                { object===1 ?"Extended":( object===2?"New":"Old") }
                                <br/>
                            </div>
                        )
                },this)}

            </div>
        );
    }
}

export default MapKey;