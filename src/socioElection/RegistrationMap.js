import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKey from './MapKey.js';
import PieChart from './PieChart'
const { BaseLayer, Overlay } = LayersControl;

class RegistrationMap extends Component {
    constructor(props){
        super(props);
        this.state={GeoLayer:G_2maps_ins_data,ElectionYear:"2011",ElectioParameter:"registration",SocialParameter:"internetuse",title:"",titleSocio:""}
    }
    componentWillUnmount() {
        
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ElectionYear:nextProps.SelectedYear});
        this.setState({ElectioParameter:nextProps.elecSubject});
        this.setState({SocialParameter:nextProps.socioparam});
    }
    
    getColor(d,c1) {
        if      (d > 60)      {return (c1[3]); }
        else if (d > 50)      {return (c1[2]);}
        else if (d>40)        {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	    
	}
    getColorSocio(d,c1) {
        if      (d > 40)      {return (c1[3]); }
        else if (d > 30)      {return (c1[2]);}
        else if (d>20)        {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	    
	}
    style(feature) {
        const RegPer11=((feature.properties.registred11*100)/(feature.properties.potentialVoters11));
        const RegPer14=((feature.properties.registred14*100)/(feature.properties.potentialVoters14));
        const Turnout11=((feature.properties.SigningVoters11*100)/(feature.properties.potentialVoters11));
        const Turnout14=((feature.properties.SigningVoters14*100)/(feature.properties.potentialVoters14));
        let Percentage;
        if (this.state.ElectionYear=="2011" && this.state.ElectioParameter=="registration") 
            {Percentage=RegPer11;}
        else if (this.state.ElectionYear=="2014" && this.state.ElectioParameter=="registration")
            {Percentage=RegPer14;}
        else if (this.state.ElectionYear=="2011" && this.state.ElectioParameter=="turnout")
            {Percentage=Turnout11;}
        else
             {Percentage=Turnout14;}

        return {
            fillColor: this.getColor(Percentage,this.props.GetSelectedSets),
	        weight: 0.5,
		    opacity: 1,
            dashArray: '0',
		    color: 'white',
		    fillOpacity: 0.8
	    };
	}
    stylesocio(feature) {
        const internet=((feature.properties.internet_use*100)/(feature.properties.potentialVoters14))
        const higher_ed=((feature.properties.higer_education_enrolement*100)/(feature.properties.potentialVoters14))
        const illetracy=((feature.properties.illetracy*100)/(feature.properties.potentialVoters14))
        let percentage;
        if (this.state.SocialParameter=="internetuse")
           { percentage=internet;console.log(this.state.SocialParameter)}
        else if (this.state.SocialParameter=="illetracy")
            percentage=illetracy;
        else if (this.state.SocialParameter=="higher_enrolment")
            percentage=higher_ed;
        return {
            fillColor: this.getColorSocio(percentage,this.props.GetSelectedSets),
	        weight: 0.5,
		    opacity: 1,
            dashArray: '0',
		    color: 'white',
		    fillOpacity: 0.8
	    };
	}

    render() {
        const position = [34.9, 11.9];
        let grades = [0,40, 50, 60 ];
        let gradesSocio = [0,20, 30, 40 ];
        const GeoLayer = this.state.GeoLayer;
        return (
        <Map maxZoom={18} center={position} maxZoom={8} minZoom={6} zoom={7} className="initialposition" style={{height:'98vh',marginTop:'8vh',position:"relative",zIndex:0}} attributionControl={false}>

                    <GeoJSON data= {G_2maps_ins_data}  
                            style={this.stylesocio.bind(this)}    
                            onEachFeature={
                                (feature, layer) => {
                                    layer.bindPopup(feature.properties.NAME_EN);
                                     layer.bindTooltip(feature.properties.NAME_EN+'<br/>'+feature.properties.internet_use,{ permanent: false})
                                }
                            }
                    />
                    
                   <GeoJSON data= {G_Pv_Parlimentary} 
                        style={this.style.bind(this)} 
                        onEachFeature={
                                (feature, layer) => {
                                layer.bindPopup(feature.properties.NAME_EN);
                                layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false})
                                }
                        } 
                    />
                    
                    <div className="two-elm-container">
                    
                     <Control position="topright"  >
                       {(this.state.destroy==false)?<PieChart ElectionYear={this.state.ElectionYear} name={this.state.name} circname={this.state.circname} registred14={this.state.registred14} registred11={this.state.registred11} potentialVoters14={this.state.potentialVoters14} potentialVoters11={this.state.potentialVoters11} RegPer11={this.state.RegPer11} RegPer14={this.state.RegPer14} destroy={this.state.destroy} />:<div></div>}
                    </Control>
                     
                </div>

                    <Control position="bottomright" >
                            <MapKey title="% of social parameter" grades={gradesSocio} getColor={this.getColorSocio} selectedSet={this.props.GetSelectedSets} />
                    </Control>
                     <Control position="bottomleft" >
                            <MapKey title="% of Election data" grades={grades} getColor={this.getColor} selectedSet={this.props.GetSelectedSets} />
                    </Control>
        </Map>
        );
    }
}

export default RegistrationMap;