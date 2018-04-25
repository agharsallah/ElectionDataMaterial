import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import InputRange from 'react-input-range';

import { connect } from "react-redux";
import { getPopValue } from "../../../actions/index";
import { bindActionCreators } from "redux";

import 'react-input-range/lib/css/index.css'
class PopSliderFilterLatest extends Component {
    constructor(props) {
            super(props);
            this.state = {
                mapAge: 0,
                disabling:true,
                name:["18-35","36-40","41-60","+60"]
            };
    }
    
    handleChange(value){
        this.setState({ mapAge:value });
        let ageString;
        value==0?ageString="18-35":(value==1?ageString="36-40":(value==2?ageString="41-60":ageString="+60") )
        this.props.getPopValue(ageString)
    }
    formatLabel(value,type){
        return this.state.name[value]
    }
    render() {
        return (
                <InputRange
                        style={{fontSize:"2rem !important"}}
                        maxValue={3}
                        minValue={0}
                        formatLabel={this.formatLabel.bind(this)}
                        step={1}
                        value={this.state.mapAge}
                        onChange={this.handleChange.bind(this)} />
        );
    }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getPopValue }, dispatch);
}
function mapStateToProps(state) {

  console.log("PopSlider Coponent Youhoo",state.PopCheckbox);
  return {
    PopCheckbox: state.PopCheckbox,
    radioFilterPicker:state.radioFilterPicker
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopSliderFilterLatest);
