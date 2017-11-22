import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Translate from 'react-translate-component';

const Radio_state = (props)=>{
	return(
			<div style={{position:'absolute',paddingTop:'18vh',paddingLeft:'2vh' }} >
	            <RadioButtonGroup onChange={props.handleMunState}  name="etatmun" defaultSelected="All" style={{height:'55px !important',fontSize:'1.4vw'}} >
					<RadioButton
					labelStyle={{color:'black'}}
					value="All"
					label={<Translate content="radioComp.all"/>}
					 style={{marginTop:"7px"}}
					 />
					 <RadioButton
					 labelStyle={{color:"#005288"}}
					 value="New"
					 label={<Translate content="radioComp.new"/>}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:"#0096d6"}}
					value="Old"
					label={<Translate content="radioComp.old"/>}				        
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					labelStyle={{color:"#BBDEFB"}}
					value="Extended"
					label={<Translate content="radioComp.extended"/>}
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
	        </div>	
	);
}
export default Radio_state