import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Translate from 'react-translate-component';

const Radio_state = (props)=>{
	return(
			<div style={{position:'absolute',paddingTop:'32vh',paddingLeft:'3vh',zIndex:"1500" }} >
	            <RadioButtonGroup onChange={props.handleMunState}  name="etatmun" defaultSelected="parl" style={{height:'55px !important',fontSize:'1.4vw'}} >
					<RadioButton
					labelStyle={{color:'black'}}
					value="parl"
					label='Parliamentary 2014'
					 style={{marginTop:"7px"}}
					 />
					 <RadioButton
					 labelStyle={{color:"#005288"}}
					 value="pres"
					 label='Presidential 2014'
					 style={{marginTop:"7px"}}
					 />
					
				</RadioButtonGroup>
	        </div>	
	);
}
export default Radio_state