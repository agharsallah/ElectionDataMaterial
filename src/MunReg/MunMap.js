import React, { Component } from 'react';
import axios from 'axios' ;
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Marker,CircleMarker } from 'react-leaflet';
import config from '../config' ;
class MunMap extends Component {
    constructor(props){
      super(props);
      this.state={shape:config.initShape,shapeIsLoaded:false,key:1,position:[36.65,10.23]}
    }
    
    componentWillMount() {
        let governorate=((this.props.chosenGov.substring(8)).slice(0, -1));
        let qString=config.apiUrl+'/api/reg/'+governorate+'_gov';
        //console.log("qString",qString);
        let position=config[governorate];
        console.log('PPPPPPOOOOO',position);
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            let shape=JSON.parse(response.data.data)
            let property=shape.features[0].properties;
            console.log(this);
            this.props.sendHistoDataBack({
                maleHistogram:[-(property.m_18_21+property.m_22_24),-property.m_25_35,-property.m_36_50,-property.m_p51],
                femaleHistogram:[(property.f_18_21+property.f_22_24),property.f_25_35,property.f_36_50,property.f_p51],
                maleFemaleHistogram:[(property.f_18_21+property.f_22_24)+(property.m_18_21+property.m_22_24),property.f_25_35+property.m_25_35,property.f_36_50+property.m_36_50,property.f_p51+property.m_p51]
                ,mapClicked:true,clickedShapeName:property.NAME_EN
            })
            this.props.sendRectangleDataBack({
                population:property.pop,
                area:property.area,
                chairs:property.chairs,
                munNumber:property.number
            })
            this.setState({shape,key:'gov',shapeIsLoaded:true,position
            });
        }
        )
        .catch(function (error) {
            console.log(error);
        });
        
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.chosenNiveau);
        let governorate=((this.props.chosenGov.substring(8)).slice(0, -1));        
        let qString=config.apiUrl+'/api/reg/'+governorate+'_'+nextProps.chosenNiveau;
        //console.log('qs2',qString);
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            this.setState({shape:JSON.parse(response.data.data),key:nextProps.chosenNiveau,shapeIsLoaded:true
            });
            //console.log(response.data.data);
        }
        )
        .catch(function (error) {
            console.log(error);
        });
    }
    
    style(feature) {
        let property = feature.properties;
        
               return {
                    fillColor: '#cadfae',
                    color: '#53b0e8',weight: 3,
                }; 
           
    }
    clickedShape(e){
        //for the histogram age BarChart
        let property=e.target.feature.properties;
        let m_18_21=Number(property.m_18_21) , m_22_24=Number(property.m_22_24) , m_25_35=Number(property.m_25_35) , m_36_50=Number(property.m_36_50) , m_p51=Number(property.m_p51);
        let f_18_21=Number(property.f_18_21) , f_22_24=Number(property.f_22_24) , f_25_35=Number(property.f_25_35) , f_36_50=Number(property.f_36_50) , f_p51=Number(property.f_p51);
        
        this.props.sendHistoDataBack({
            maleHistogram:[-(m_18_21+m_22_24),-m_25_35,-m_36_50,-m_p51],
            femaleHistogram:[(f_18_21+f_22_24),f_25_35,f_36_50,f_p51],
            maleFemaleHistogram:[(f_18_21+f_22_24)+(m_18_21+m_22_24),f_25_35+m_25_35,f_36_50+m_36_50,f_p51+m_p51]
            ,mapClicked:true,clickedShapeName:property.NAME_EN
        })
        
        //mierda I have diffrent shapes feautures name 
        let population,chairs,munNumber;
        property.pop==undefined ?  population=property.POP: population=property.pop
        property.chairs==undefined ?  chairs=property.chair: chairs=property.chairs
        property.munNumber==undefined ?  munNumber=property.state: population=property.munNumber
        
        this.props.sendRectangleDataBack({
            population:population,
            area:property.area,
            chairs:chairs,
            munNumber:munNumber
        })
    }
    
    render() {
        const position = this.state.position;
        return (
            <Map center={position} zoom={8} style={{height: '55vh',position:'relative',backgroundColor:'white'}}>
            <TileLayer
            url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
            />
            <GeoJSON
                key={this.state.key}
                data= {this.state.shape}
                style={this.style.bind(this)} 
                onEachFeature={
                    (feature, layer) => {
                        //sending shapes center to marker component
                        layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:'tooltipnamear',direction:'right' })
                        layer.on({click: this.clickedShape.bind(this)});
                        /* layer.on({mouseover: this.highlightFeature.bind(this)});
                        layer.on({mouseout: this.resetFeature.bind(this)}); */
                    }    
                }
            />
{/*             <Marker position={position}>
              <Popup>
                <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
              </Popup>
            </Marker> */}
          </Map>        
        );
    }
}

export default MunMap;