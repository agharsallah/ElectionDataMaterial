import React, { Component } from 'react';
import  './../s.css' ;
class MapKey extends Component {
    /* getColor(d,c1) {
        if      (d >2)      {return (c1[2]); }
        else if (d >1)      {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
    } */
    getColor(listsNum,range,colorRange) {
        if      (listsNum ==range[3])      {return (colorRange[3]); }
        else if (listsNum ==range[2])      {return (colorRange[2]);}
        else if (listsNum ==range[1])      {return (colorRange[1]);}
        else if (isNaN(listsNum))    {return ('white')}
        else                  {return (colorRange[0]);}
	}
    render() {
         var range = this.props.range;
        return (
             <div className="info legend" style={{marginBottom:'11vh'}} >
                <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                {range.map(function(object, i){
                    //if(object=="Extended"){object=1}else if (object=="New"){object=2}else{object=3}
                    var bg= this.getColor(object,this.props.range,this.props.colorSet)
                    return (
                            <div key={i+this.props.colorSet}>
                                <i style={{background:bg}}  ></i>
                                { object===range[0] ?range[0]+' - '+range[1]:( object===range[1]?range[1]+1+' - '+range[2]:(object===range[2]?range[2]+1+' - '+range[3]:' + '+range[3])) }
                                <br/>
                            </div>
                        )
                },this)}

            </div>
        );
    }
}

export default MapKey;