import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router-dom' ;
import ThemeRadio from '../containers/pickFilter/ThemeRadio' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MapKey from '../MapKey' ;
import PopSliderFilter from '../containers/sliderFilter/PopSliderFilter' ;

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;

class MenuDrawerRegVsElig extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true,mapGender:"All"};
    }
    handleToggle() {this.setState({open: !this.state.open})}
    
    handleMapGender(e,value){
        this.setState({mapGender:value});
        this.props.getMapGender(value)
    }
    componentWillReceiveProps(nextProps) {
        nextProps.mapGender!==undefined ?
        this.setState({mapGender:nextProps.mapGender}):console.log('nothing');
    }
    
    render() {
        const MENU= <Translate type="text" content="MenuDrawer.MENU"/>
        const GENDERRADIO= <Translate type="text" content="MenuDrawer.GENDERRADIO"/>
        const MAPKEY= <Translate type="text" content="MenuDrawer.MAPKEY"/>
        const ALL= <Translate type="text" content="MenuDrawer.ALL"/>
        const FEMALE= <Translate type="text" content="MenuDrawer.FEMALE"/>
        const MALE= <Translate type="text" content="MenuDrawer.MALE"/>
        const BACK= <Translate type="text" content="MenuDrawer.BACK"/>

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
                        containerStyle={{top:"0vh",position:"absolute"}}
                        onRequestChange={(open) => this.setState({open})}
                        zDepth={2}
                >
                    <AppBar title={MENU} onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

                    <div>
                        <ThemeRadio styles={{borderRadius:"10px",paddingLeft:"2vh"}} defaultSelected="pop" />
                    </div>

                    {/* Left chart controller */}
                    <div style={{paddingTop:"2vh",paddingLeft:"2vh"}}>
                        <h4 >
                            {GENDERRADIO}
                        </h4>   
                    </div>
                    <div  style={{paddingLeft:"2vh"}}>
                                <RadioButtonGroup name="activeVoterChart"  onChange={this.handleMapGender.bind(this)} valueSelected={this.state.mapGender} >
                                    <RadioButton
                                        value="All"
                                        label={ALL}
                                    />
                                    <RadioButton
                                        value="Female"
                                        label={FEMALE}
                                    />
                                    <RadioButton
                                        value="Male"
                                        label={MALE}
                                    />
                                </RadioButtonGroup>
                    </div>
                    {/* Map Key */}
                    <div style={{paddingTop:"1vh",paddingLeft:"2vh"}}>
                        <h4 >
                            {MAPKEY} :
                        </h4>   
                    </div>
                   
                        <div style={{padding:"1vh"}}>
                            <MapKey  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitle} key={this.state.MapGender}/>
                        </div>
                    
                
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

export default MenuDrawerRegVsElig;