import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router-dom' ;
import ThemeRadio from '../containers/pickFilter/ThemeRadio' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MapKeyVoterProfile from './MapKeyVoterProfile' ;
import MapKey from '../MapKey' ;
import PopSliderFilterLatest from '../containers/sliderFilter/PopSliderFilter_latest' ;
//import Select from 'react-select';

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;

class MenuDrawerVoterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true,radioChart:"age"};
    }
    handleToggle() {this.setState({open: !this.state.open})}
    
    handleRadioChart(e,value){
        this.setState({radioChart:value});
        this.props.getRadioChart(value)
    }
    componentWillReceiveProps(nextProps) {
        nextProps.radioChart!==undefined ?
        this.setState({radioChart:nextProps.radioChart}):console.log('nothing');
    }
    ChosenGouv(){
        
    }
    render() {
        const SLIDERTITLE= <Translate type="text" content="MenuDrawer.SLIDERTITLE"/>
        const OPTIONTITLE= <Translate type="text" content="MenuDrawer.OPTIONTITLE"/>
        const MALE_FEMALE_DIFF= <Translate type="text" content="MenuDrawer.MALE_FEMALE_DIFF"/>
        const AGEPER= <Translate type="text" content="MenuDrawer.AGEPER"/>
        const MAPKEY= <Translate type="text" content="MenuDrawer.MAPKEY"/>
        const BACK= <Translate type="text" content="MenuDrawer.BACK"/>
        const MENU= <Translate type="text" content="MenuDrawer.MENU"/>
       
        return (
            <div>
                <RaisedButton
                style={{position: "absolute",left: "2vh",top: "50vh",zIndex:500}}
                label={_t('statDrawer.open')}
                primary={true}
                onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={"15%"}
                        open={this.state.open}
                        openSecondary={false}
                        containerStyle={{top:"10vh",height:"98%",zIndex:"900",position:"absolute"}}
                        onRequestChange={(open) => this.setState({open})}
                        zDepth={2}
                        style={{fontSize:"12px",fontWeight:700}}
                >
                    <AppBar title={MENU} onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

                    <div>
                        <ThemeRadio styles={{borderRadius:"10px",paddingLeft:"2vh",}} defaultSelected="profile" />
                    </div>
                    
                    {/* Slider filter */}
                    <div style={{padding:"2vh"}}>
                        <h4 >
                            {SLIDERTITLE}
                        </h4>  
                    </div>
                    <div style={{paddingRight:"4vh",paddingLeft:"4vh"}}>  
                        <PopSliderFilterLatest />
                    </div>  

                    {/* Left chart controller */}
                   {/*  <div style={{paddingTop:"5vh",paddingLeft:"2vh"}}>
                        <h4 >
                            {OPTIONTITLE}
                        </h4>   
                    </div>
                    <div  style={{paddingLeft:"2vh"}}>
                                <RadioButtonGroup name="activeVoterChart"  onChange={this.handleRadioChart.bind(this)} valueSelected={this.state.radioChart} >

                                    <RadioButton
                                        value="age"
                                        label=  {AGEPER}
                                    />
                                    <RadioButton
                                    value="difference"
                                    label={MALE_FEMALE_DIFF}
                                />
                                    </RadioButtonGroup>
                    </div> */}
                    {/* Map Key */}
                    <div style={{paddingTop:"1vh",paddingLeft:"2vh"}}>
                        <h4 >
                           {MAPKEY}
                        </h4>   
                    </div>
                    {
                        this.state.radioChart==="difference"?
                        <div style={{padding:"1vh"}}>
                            <MapKeyVoterProfile  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitleDiff} key={this.state.radioChart}/>
                        </div>:
                        <div style={{padding:"1vh"}}>
                            <MapKey  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitleRegPerc} key={this.state.radioChart}/>
                        </div>
                    }
                    {/* <Select
                        clearable={false}
                        name="zoom chooser"
                        placeholder={_t('MenuDrawer.zoomplaceholder')}
                        value={{"lat":35.29675548466403,"lng":8.568429592276134}}
                        options={options}
                        onChange={this.ChosenGouv.bind(this)}
                    /> */}
                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <RaisedButton label={BACK} 
                        containerElement={<Link to="/" />} 
                        linkButton={true} />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default MenuDrawerVoterProfile;