import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKey from './MapKey.js';
//import PieChart from './PieChart'
import TooltipPie from './TooltipPie' ;
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
        const internet=((feature.properties.internet_use*100)/(feature.properties.population_10))
        const higher_ed=((feature.properties.higer_education_enrolement*100)/(feature.properties.population_10))
        const illetracy=((feature.properties.illetracy*100)/(feature.properties.population_10))
        let percentage;
        if (this.state.SocialParameter=="internetuse")
           { percentage=internet;}
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
    highlightFeatureSocio(e){
        const property = e.target.feature.properties;
        if (this.state.SocialParameter=="internetuse")
        this.setState({socioProperty:property.internet_use,socioPercentage:((property.internet_use*100)/property.population_10),population_10Property:property.population_10,cityProperty:property.CIRC_Name,delegProperty:property.NAME_EN});
        else if (this.state.SocialParameter=="illetracy")
        this.setState({socioProperty:property.illetracy,socioPercentage:((property.illetracy*100)/property.population_10),population_10Property:property.population_10,cityProperty:property.CIRC_Name,delegProperty:property.NAME_EN});
    }
    highlightFeatureElection(e){
        const property = e.target.feature.properties;
        const RegPer11=((property.registred11*100)/(property.potentialVoters11));
        const RegPer14=((property.registred14*100)/(property.potentialVoters14));
        const Turnout11=((property.SigningVoters11*100)/(property.potentialVoters11));
        const Turnout14=((property.SigningVoters14*100)/(property.potentialVoters14));

        if (this.state.ElectionYear=="2011" && this.state.ElectioParameter=="registration") 
            this.setState({socioProperty:property.registred11,socioPercentage:RegPer11,population_10Property:property.potentialVoters11,cityProperty:property.CIRC_Name,delegProperty:property.NAME_EN});
        
        else if (this.state.ElectionYear=="2014" && this.state.ElectioParameter=="registration")
            this.setState({socioProperty:property.registred14,socioPercentage:RegPer14,population_10Property:property.potentialVoters14,cityProperty:property.CIRC_Name,delegProperty:property.NAME_EN});            
        
        else if (this.state.ElectionYear=="2011" && this.state.ElectioParameter=="turnout")
            this.setState({socioProperty:property.SigningVoters11,socioPercentage:Turnout11,population_10Property:property.registred11,cityProperty:property.CIRC_Name,delegProperty:property.NAME_EN});
            
        else
            this.setState({socioProperty:property.SigningVoters14,socioPercentage:Turnout14,population_10Property:property.registred14,cityProperty:property.CIRC_Name,delegProperty:property.NAME_EN});
            
        }
    render() {
        const position = [34.9, 11.9];
        let grades = [0,40, 50, 60 ];
        let gradesSocio = [0,20, 30, 40 ];
        const GeoLayer = this.state.GeoLayer;
        let tooltipLegend
        this.state.SocialParameter=='illetracy'?tooltipLegend='Illetrate people :':tooltipLegend='Internet use :'
        return (
        <Map maxZoom={18} center={position} maxZoom={8} minZoom={7} zoom={7} className="initialposition" style={{height:'98vh',marginTop:'8vh',position:"relative",zIndex:0}} attributionControl={false}>

                    <GeoJSON data= {G_2maps_ins_data}  
                            style={this.stylesocio.bind(this)}    
                            onEachFeature={
                                (feature, layer) => {
                                    //layer.bindPopup(feature.properties.NAME_EN);
                                    layer.on({mouseover: this.highlightFeatureSocio.bind(this)});
                                     //layer.bindTooltip(feature.properties.NAME_EN+'<br/>'+feature.properties.internet_use,{ permanent: false})
                                }
                            }
                    >
                    <Tooltip direction="bottom"  className="leafletTooltip" sticky={true} maxWidth={350} maxHeight={250} >
                    <div style={{zIndex:1501}}>
                        <TooltipPie 
                        title={this.state.delegProperty+","+this.state.cityProperty}
                        allPopulation={this.state.population_10Property}
                        chosenParam={this.state.SocialParameter} 
                        socioPercentage={this.state.socioPercentage} 
                        />
                        <div style={{textAlign:"center",position:"relative"}}>
                        <h4><b>{tooltipLegend} </b>  {this.state.socioProperty} person </h4>
                        <h4><b>Population over 10 : </b>  {this.state.population_10Property} person </h4>
                        </div>
                    
                    </div>
                    </Tooltip>
                    </GeoJSON>
                   <GeoJSON data= {G_Pv_Parlimentary} 
                        style={this.style.bind(this)} 
                        onEachFeature={
                                (feature, layer) => {
                                //layer.bindPopup(feature.properties.NAME_EN);
                                ///layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false})
                                layer.on({mouseover: this.highlightFeatureElection.bind(this)});
                                }
                        } 
                    >
                        <Tooltip direction="bottom"  className="leafletTooltip" sticky={true} maxWidth={350} maxHeight={250} >
                            <div style={{zIndex:1501}}>
                                <TooltipPie 
                                title={this.state.delegProperty+","+this.state.cityProperty}
                                allPopulation={this.state.population_10Property}
                                chosenParam={this.state.ElectioParameter} 
                                chosenYear={this.state.ElectioParameter} 
                                socioPercentage={this.state.socioPercentage} 
                                />                            
                            </div>
                        </Tooltip>
                    </GeoJSON>
                    
                <div className="two-elm-container">
                    
                    {/* <Control position="topright">
                       {(this.state.destroy==false)?<PieChart ElectionYear={this.state.ElectionYear} name={this.state.name} circname={this.state.circname} registred14={this.state.registred14} registred11={this.state.registred11} potentialVoters14={this.state.potentialVoters14} potentialVoters11={this.state.potentialVoters11} RegPer11={this.state.RegPer11} RegPer14={this.state.RegPer14} destroy={this.state.destroy} />:<div></div>}
                    </Control> */}
                     
                </div>

                    <Control position="bottomright">
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