import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Translate from 'react-translate-component';

class Radio_state extends Component {

	
	render() {
		return (
			<div style={{position:'absolute',paddingTop:'18vh',paddingLeft:'2vh',width:'20%' }} >
	            <RadioButtonGroup onChange={this.props.handleMunState} valueSelected={this.props.stateFilter} name="etatmun" defaultSelected="total" style={{height:'55px !important',fontSize:'1.4vw'}} >
					<RadioButton
					//labelStyle={{color:'black'}}
					value="total"
					label={<Translate content="listsOverview.total"/>}
					 style={{marginTop:"7px"}}
					 />
					 <RadioButton
					 //labelStyle={{color:"#005288"}}
					 value="indep"
					 label={<Translate content="listsOverview.independent"/>}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					//labelStyle={{color:"#0096d6"}}
					value="party"
					label={<Translate content="listsOverview.party"/>}				        
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					//labelStyle={{color:"#BBDEFB"}}
					value="coalition"
					label={<Translate content="listsOverview.coalition"/>}
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
	        </div>	
		);
	}
}

export default Radio_state;