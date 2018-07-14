import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Translate from 'react-translate-component';

export default class MapControl extends Component {
    handleRadioChange(e,value){
        this.props.sendMapFilterValue(value)
    }
    render() {
        const PER_GENDER = <Translate type='text' content='Mayor_results.perGender' />//Per Gender
        const PER_LIST = <Translate type='text' content='Mayor_results.perList' />//Per List Type
        const SELECT_THEME = <Translate type='text' content='Mayor_results.select' />//Select map Theme :
        
        return (
            <div>
                <h4 className="subheaderTitle">{SELECT_THEME} </h4>
                <RadioButtonGroup name="theme" defaultSelected="per gender" onChange={this.handleRadioChange.bind(this)} >
                    <RadioButton
                        value="per gender"
                        label={PER_GENDER}
                        style={{marginBottom :'10px'}}
                    />
                    <RadioButton
                        value="per list"
                        label={PER_LIST}
                    />
                </RadioButtonGroup>
            </div>
        );
    }
}