import React, { Component } from 'react';

class MapKey extends Component {
    constructor(props){
        super(props)
        this.state={selectedSet:this.props.selectedSet}
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({selectedSet:nextProps.selectedSet});

    } 
    
    render() {
         var grades = this.props.grades;
         var getColor=this.props.getColor;

        return (
             <div className="infoLeg legend" style={{marginBottom:'10vh'}}>
                <p style={{marginLeft:"10px"}}>{this.props.title}</p>
                {grades.map(function(object, i){
                    var bg=getColor(object + 1,this.state.selectedSet)
                    return (
                            <div key={i}>
                                <i style={{background:bg}}  ></i>
                                {(grades[i + 1] ? (grades[i]+' - '+grades[i+1]+' %' ): '+ '+grades[i]+' %') }
                                <br/>
                            </div>
                        )
                },this)}
                <i style={{background:"#dddddd"}} ></i> {"inexistant"}
            </div>
        );
    }
}

export default MapKey;