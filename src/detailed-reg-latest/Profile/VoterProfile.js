import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle,CircleMarker } from 'react-leaflet';
import Control from 'react-leaflet-control';
import ReactLoading from 'react-loading';
import ThemeRadio from '../containers/pickFilter/ThemeRadio' ;
import ColorBrew from '../containers/dynamic color/ColorBrew';
import RaisedButton from 'material-ui/RaisedButton';
import  '../DetailedRegGovMapStyle.css' ;
import regression from 'regression';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import HistogramVoterProfile from './HistogramVoterProfile' ;
//import BarMaleFemaleDiff from './BarMaleFemaleDiff' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuDrawerVoterProfile from './MenuDrawerVoterProfile' ;
import DescriptionVoterProfile from './DescriptionVoterProfile' ;
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
//import SemiPie from './SemiPie' ;
import TooltipPie from './TooltipPie' ;
import {Link} from 'react-router-dom' ;
import Translate    from 'react-translate-component';
import counterpart from 'counterpart' ;

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class VoterProfile extends Component {
    constructor(props){
        super(props);
        //colorfun : function sent to the menu drawer then to the map key to process the color of the key squares 
        this.state={
            gouv_name:"",govForMunTooltip:"",munNumber:"",destroy:true,
            colorfun:this.getColorAgePercentage,
            keyTitleDiff:counterpart.translate('VoterProfile.keyTitleDiff18'),keyTitleRegPerc:counterpart.translate('VoterProfile.keyTitleRegPerc18')
            ,mapAge:"18-35",diffrenceArray:[],
            maleNumber:0,femaleNumber:0,trancheNumber:0,radioChart:"age",mapClicked:false,
            totalNumberOfReg:0,maleFemaleHistogram:[],clickedShapeName:counterpart.translate('HistogramVoterProfile.click'),
            dynamicPercentage:[30,34,38],tranchePercentage:0,allreg_sum:0,dynamicColor:["#f7fbff","#c6dbef","#6baed6","#084594"],
            selectedMapLevel:"gov",buttonLabelGov:"#00bcd4",buttonLabelMun:"black"
        }
    }
    
    //To take care of the behavior of button that change the map delimitation gov or mun
    MapLevelClick (index) {
        index==="gov" ? 
            this.setState({buttonLabelGov:"#00bcd4",buttonLabelMun:"black",selectedMapLevel:"gov"})
        :
        this.setState({buttonLabelMun:"#00bcd4",buttonLabelGov:"black",selectedMapLevel:"mun"})
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.mapAgeSlider);
        let keyColor,keyTitleDiff,keyTitleRegPerc,diffrenceArray=[],color,dynamicPercentage,dynamicColor;
        let mapAge=nextProps.mapAgeSlider;
         if (mapAge==="18-35") {
             keyTitleDiff=counterpart.translate('VoterProfile.keyTitleDiff18');
             keyTitleRegPerc=counterpart.translate('VoterProfile.keyTitleRegPerc18_latest')
             //get the diffrence between male and female -18-24- in each govenorate*deleted
            
            dynamicPercentage=[30,34,38];dynamicColor=["#f7fbff","#c6dbef","#6baed6","#084594"]
         }else if(mapAge==="36-40"){
            keyTitleRegPerc=counterpart.translate('VoterProfile.keyTitleRegPerc25_latest')
            
            dynamicPercentage=[10,11,12];dynamicColor=["#f7fcf5","#c7e9c0","#74c476","#005a32"]
         }else if(mapAge==="41-60"){
            keyTitleRegPerc=counterpart.translate('VoterProfile.keyTitleRegPerc36_latest')
            dynamicPercentage=[32,35,38];dynamicColor=["#f7fcf5","#c7e9c0","#74c476","#005a32"]
         }else if (mapAge==="+60"){
            keyTitleRegPerc=counterpart.translate('VoterProfile.keyTitleRegPerc50_latest')
            dynamicPercentage=[18,20,22];dynamicColor=["#fff7ec","#fee8c8","#fc8d59","#990000"]
         }else{
            keyTitleDiff=counterpart.translate('VoterProfile.keyTitleRegPerc18');
             keyTitleRegPerc=counterpart.translate('VoterProfile.keyTitleRegPerc18')
            dynamicPercentage=[30,34,38];dynamicColor=["#f7fbff","#c6dbef","#6baed6","#084594"]
            mapAge="18-35"
         }
         this.setState({mapAge,
                        dynamicPercentage,dynamicColor,keyTitleRegPerc
                        });

    }
    //get the value of the bar chart that control the Left chart and map (keep the same page : age profile)
    getRadioChart(value){
        this.setState({radioChart:value});
        value==="diffrence"?this.setState({ colorfun:this.getColorRegElg}):this.setState({ colorfun:this.getColorAgePercentage});
    }

    getColorRegElg(d) {
        if(d ==  "blue")      {return "#5895c5" }
        else                  {return "#d56147"}
    }  
    
    getColorAgePercentage(d,c1,grades) {
        if      (d >grades[2])       {return (c1[3]); }
        else if (d>grades[1])        {return (c1[2]);}
        else if (d>grades[0])        {return (c1[1]);}
        else                         {return (c1[0]);}
	}

    style(feature) {
        let property = feature.properties;
        let chosen,tranchePercentage;
        //for the map Coloring Male Vs Female | age percentage
        if (this.state.mapAge=="18-35") {
            /* (property.registration_gov_m_18_21+property.registration_gov_m_22_24)>(property.registration_gov_f_18_21+property.registration_gov_f_22_24)?
                chosen="blue":chosen="red"; */
            //18-24 percentage of all voters
            tranchePercentage=(property.reg_18_35*100)/property.allreg_sum
        }else if(this.state.mapAge=="36-40"){
            /* property.registration_gov_m_25_35>property.registration_gov_f_25_35 ? chosen="blue": chosen="red"; */
            tranchePercentage=(property.reg_36_40*100)/property.allreg_sum
        }else if(this.state.mapAge=="41-60"){
            /* property.registration_gov_m_36_50>property.registration_gov_f_36_50 ? chosen="blue": chosen="red"; */
            tranchePercentage=(property.reg_41_60*100)/property.allreg_sum
        }else{
            /* property.registration_gov_m_p51>property.registration_gov_f_p51 ? chosen="blue": chosen="red"; */
            tranchePercentage=(property.reg_p_60*100)/property.allreg_sum
        }
            /* if (this.state.radioChart==="difference") {
               return {
                    fillColor: this.getColorRegElg(chosen),
                    weight: 1,
                    opacity: 2,
                    color: 'white',
                    dashArray: '4',
                    fillOpacity: 0.8
                }; 
            }else{ */
                return {
                fillColor: this.getColorAgePercentage(tranchePercentage,this.state.dynamicColor,this.state.dynamicPercentage),
                color: 'black',
                weight: 1,
                fillOpacity: 0.8
            };
            /* } */
    }

    //style for the Map contour Line when we have municipality level map (So we can determine to which gov the mun elongs)
    contourStyle(){
            /* if (this.state.radioChart==="difference") {
                return {
                    weight: 6,
                    lineCap:"round",
                    color: 'black',
                }; 
            }else{ */
                return {
                color: 'black',
               weight: 6,
                lineCap:"butt",
            };
            //}   
    }

    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;
        let/*  maleNumber, femaleNumber, */tranchePercentage,allreg_sum,govForMunTooltip,trancheNumber;
        //Data to shoow in the tooltip
        if (this.state.mapAge=="18-35") {
            /* femaleNumber=property.registration_gov_f_18_21+property.registration_gov_f_22_24;
            maleNumber=property.registration_gov_m_18_21+property.registration_gov_m_22_24; */
            tranchePercentage= (property.reg_18_35*100)/property.allreg_sum; 
            trancheNumber= property.reg_18_35;
        }else if(this.state.mapAge=="36-40"){
           /*  maleNumber= property.registration_gov_m_25_35;
            femaleNumber=property.registration_gov_f_25_35; */
            tranchePercentage= (property.reg_36_40*100)/property.allreg_sum; 
            trancheNumber= property.reg_36_40;
        }else if(this.state.mapAge=="41-60"){
            /* maleNumber=property.registration_gov_m_36_50;
            femaleNumber=property.registration_gov_f_36_50; */
            tranchePercentage= (property.reg_41_60*100)/property.allreg_sum; 
            trancheNumber= property.reg_41_60;
        }else{
           /*  maleNumber= property.registration_gov_m_p51;
            femaleNumber= property.registration_gov_f_p51; */
            tranchePercentage= (property.reg_p_60*100)/property.allreg_sum; 
            trancheNumber= property.reg_p_60;
        }
        allreg_sum=property.allreg_sum;
        property.gouv_name?govForMunTooltip=","+property.gouv_name:govForMunTooltip=""
        this.setState({destroy:false,gouv_name:property.NAME_EN,govForMunTooltip,munNumber:property.munnumber,/* maleNumber,femaleNumber, */
                       tranchePercentage,allreg_sum,trancheNumber
                    });
        return layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 1
        });
	}
    resetFeature(e) {
	    var layer = e.target;
	     layer.setStyle({
	        weight: 5
	    });
        this.setState({destroy:true});
    }
    //for the histogram age BarChart
    clickedShape(e){
        let property=e.target.feature.properties;
        this.setState({
            maleFemaleHistogram:[property.reg_18_35,property.reg_36_40,property.reg_41_60,property.reg_p_60],
            totalNumberOfReg:property.reg_18_35+property.reg_36_40+property.reg_41_60+property.reg_p_60,
            radioChart:"age",mapClicked:true,clickedShapeName:property.NAME_EN,colorfun:this.getColorAgePercentage
        });
    }

    render() {
        const position = [34.85360, 11.8];
        //choose which shape to load based on the delimiattion
        let chosenSape,GeojsonKeyChanger;
        this.state.selectedMapLevel=="gov"?(chosenSape=this.props.shape,GeojsonKeyChanger="gov"):(chosenSape=this.props.munShape,GeojsonKeyChanger="mun")
        const GOV= <Translate type="text" content="VoterProfile.gov"/>
        const MUN= <Translate type="text" content="VoterProfile.mun"/>
        const TITLE= <Translate type="text" content="VoterProfile.title"/>
        const SUBTITLE= <Translate type="text" content="VoterProfile.subtitle"/>

        //tooltip
        const TOTALREG= <Translate type="text" content="VoterProfile.totalReg"/>
        const MALEREG= <Translate type="text" content="VoterProfile.maleReg"/>
        const FEMALEREG= <Translate type="text" content="VoterProfile.femaleReg"/>
        const VOTEDIFF= <Translate type="text" content="VoterProfile.voteDiff"/>
        const REGTRANCHE= <Translate type="text" content="VoterProfile.regTranche"/>
        const OTHERREG= <Translate type="text" content="VoterProfile.otherReg"/>

        return (
                <div style={{paddingTop:'10vh' }}>
                
                {this.props.shapeIsLoaded ? <div><Map minZoom={6} maxZoom={7} center={position} zoom={7} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0,backgroundColor:"white"}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                    />

                    <GeoJSON
                        key={GeojsonKeyChanger+this.props.key}
                        data= {chosenSape}
                        style={this.style.bind(this)} 
                        onEachFeature={
                            (feature, layer) => {
                                //sending shapes center to marker component
                                //layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:"tooltipnamear",direction:"right" })
                                //markerData.push({center:layer.getBounds().getCenter(),name:feature.properties.NAME_EN,name_ar:feature.properties.NAME_AR})
                                layer.on({mouseover: this.highlightFeature.bind(this)});
                                layer.on({mouseout: this.resetFeature.bind(this)});
                                layer.on({click: this.clickedShape.bind(this)});
                                //console.log(JSON.stringify (markerData))
                            }    
                        }
                        
                    >
                        {/* {this.state.radioChart==="difference"?
                        <Tooltip direction="bottom"  className="leafletTooltip" sticky={true} maxWidth={350} maxHeight={250} >
                                <div style={{zIndex:1501}}>
                                     <SemiPie title={this.state.gouv_name+" "+this.state.govForMunTooltip} male={this.state.maleNumber} female={this.state.femaleNumber} />
                                        <div style={{textAlign:"center",position:"relative",marginTop:"-45px"}}>
                                        <h4><b>{(this.state.maleNumber+this.state.femaleNumber).toLocaleString()} </b> {TOTALREG}  {this.state.mapAge} </h4>
                                        <h4><b>{(this.state.maleNumber).toLocaleString()}</b>  {MALEREG}  </h4>
                                        <h4><b>{(this.state.femaleNumber).toLocaleString()}</b>  {FEMALEREG} </h4>
                                        <h4><b>{(Math.abs(this.state.femaleNumber-this.state.maleNumber)).toLocaleString()}</b> {VOTEDIFF} </h4>
                                    </div>
                                
                                </div>
                        </Tooltip>: */}
                        <Tooltip direction="bottom" className="leafletTooltip" sticky={true} zIndex={2000} >
                            <div style={{zIndex:1501}} >
                                <TooltipPie 
                                    title={this.state.gouv_name+" "+this.state.govForMunTooltip}
                                    allReg={this.state.allreg_sum}
                                    chosenAge={this.state.mapAge} 
                                    registeredTranche={this.state.trancheNumber} 
                                />
                                    <div style={{textAlign:"center",position:"relative",marginTop:"-10px"}}>
                                        <h4><b>{(this.state.trancheNumber).toLocaleString() }</b>{REGTRANCHE}{this.state.mapAge}</h4>
                                        <h4><b>{(this.state.allreg_sum-(this.state.trancheNumber)).toLocaleString()}</b>{OTHERREG}</h4>
                                    </div>
                            </div>
                        </Tooltip>
                        {/* } */}

                    </GeoJSON>

                    {/* bottom Navigation To Change map : Governorate - Municipality */}

                    <div className="col-md-12" style={{zIndex:1500,position:"absolute",marginTop: "1vh"}} >
                    <div className="col-md-3">_</div>
                    <div className="col-md-3">
                        <RaisedButton onClick={this.MapLevelClick.bind(this,"gov")} label={GOV}  labelColor={this.state.buttonLabelGov} />
                        <RaisedButton onClick={this.MapLevelClick.bind(this,"mun")} label={MUN} style={{marginLeft:"1vh"}} labelColor={this.state.buttonLabelMun} />

                    </div>   
                    </div>    

                    {/*Left side ScatterPlot*/}
                    <div className="col-md-7" ></div>
                    <div className="col-md-5" style={{marginTop:"2vh",zIndex:1500}}>
                    {/* {this.state.radioChart==="difference" ?
                        <BarMaleFemaleDiff 
                            alldiffrenceArray={this.state.diffrenceArray} 
                            title={this.state.mapAge}
                        />
                    : */}
                        <HistogramVoterProfile
                        totalNumberOfReg={this.state.totalNumberOfReg}
                        mapClicked={this.state.mapClicked}
                        clickedShapeName={this.state.clickedShapeName}
                        maleFemaleHistogram={this.state.maleFemaleHistogram}
                        /> 
                    {/* } */}
                    </div>
                    
                    </Map>   
                    {/* Menu Drawer */}
                    <MenuDrawerVoterProfile getRadioChart={this.getRadioChart.bind(this)} colorSet={this.state.dynamicColor} grades={this.state.dynamicPercentage} getColor={this.state.colorfun} keyTitleRegPerc={this.state.keyTitleRegPerc} keyTitleDiff={this.state.keyTitleDiff} radioChart= {this.state.radioChart} />
                                        
                </div>
                :
                <div>
                    <div className="col-md-5"></div>
                    <div className="col-md-5" style={{marginTop:"43vh"}}>
                        <h2>"Loading Map"</h2>
                        <div style={{marginLeft:'70px'}} >
                            <ReactLoading type="bars" color="#444" className="react-Loader" delay={0} />
                        </div>
                    </div>
                </div>
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
  return {
    mapColor:state.changeMapColor,
    mapAgeSlider:state.popFilter,
  };
}

export default connect(mapStateToProps)(VoterProfile);