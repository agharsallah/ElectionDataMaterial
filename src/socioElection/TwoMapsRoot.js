import React, { Component } from 'react';
import RegistrationMap from './RegistrationMap'
import YearToggle from './YearToggle';
import SocioEconomicToggle from './SocioEconomicToggle';
import ElectionSubject from './ElectionSubject';

import Translate from 'react-translate-component';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class TwoMapsRoot extends Component {
    constructor(props){
        super(props);
                this.state={SelectedYear:"2011",socioparam:"internetuse",elecSubject:"registration",sets:["#9ecae1", "#639eca", "#3072b1", "#084594"]} ;
    }
    HandleYear (event){this.setState({SelectedYear:event.target.value})};
    HandleSocioParameter (event){this.setState({socioparam:event.target.value})};
    HandleElecSubject (event){this.setState({elecSubject:event.target.value})};
    GetSelectedSets(e){this.setState({sets:e});}
    render() {
    
    return(
        <div style={{position:"relative"}}>
            <YearToggle HandleYear={this.HandleYear.bind(this)} />
            <SocioEconomicToggle HandleSocioParameter={this.HandleSocioParameter.bind(this)}/>
            <ElectionSubject HandleElecSubject={this.HandleElecSubject.bind(this)}/>
        {/*<AggregationToggle HandleAggregation={this.HandleYear.bind(this)} />*/}
              <hr className="yeartoggle" style={{width:"1px", backgroundColor: 'black',  height:"520px",left:"50%"}} />
             <RegistrationMap style={{position:"absolute"}} SelectedYear={this.state.SelectedYear} socioparam={this.state.socioparam} elecSubject={this.state.elecSubject} GetSelectedSets={this.state.sets} />
        </div>
    )
        
    }
}

export default TwoMapsRoot;