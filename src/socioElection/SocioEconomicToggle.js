import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import Translate from 'react-translate-component';

class SocioEconomicToggle extends Component {
    render() {
        return (
             <div className="yeartoggle" style={{ right: "0",top: "15%"}} >
               <h4 style={{marginBottom:"15px",fontWeight:"600",width:"220px"}}>
                    {<Translate content="TwoMaps.sociotitle"/>}
                </h4> 
	            <RadioButtonGroup onChange={this.props.HandleSocioParameter}  name="SocioEconomicToggle" defaultSelected="internetuse" >
					<RadioButton
					labelStyle={{color:'black'}}
					value="internetuse"
					label={<Translate content="TwoMaps.internetuse"/>}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="illetracy"
					label={<Translate content="TwoMaps.illetracy"/>}				        
					style={{marginTop:"7px"}}
					/>
					{/*<RadioButton
					labelStyle={{color:'black'}}
					value="higher_enrolment"
					label={<Translate content="TwoMaps.higher_enrolment"/>}				        
					style={{marginTop:"7px"}}
					/>*/}
				
				</RadioButtonGroup>
             </div>
        );
    }
}

export default SocioEconomicToggle;