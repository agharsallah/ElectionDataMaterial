import React, { Component } from 'react';
import axios from 'axios' ;
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Marker,CircleMarker } from 'react-leaflet';
import config from '../config' ;
import Control from 'react-leaflet-control';
import MapKey from './MapKey' ;
class InvalidMap extends Component {
    constructor(props){
      super(props);
      this.state={shape:config.initShape,shapeIsLoaded:false,key:1,position:[34.9,11.23]}
    }
    
    componentWillMount() {
        let qString=config.apiUrl+'/api/reg/'+'deleg_parl';
        //console.log("qString",qString);
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
            this.setState({shape,key:'gov',shapeIsLoaded:true});
        }
        )
        .catch(function (error) {
            console.log(error);
        });
        
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.chosenNiveau);
        let qString=config.apiUrl+'/api/reg/'+'deleg_'+nextProps.chosenNiveau;
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

    resetHighlight(e) {
    	const layer = e.target;
	    return layer.setStyle({
	        weight: 1,
            fillOpacity: 0.7,
             color: 'white'
        });
    }
    
    highlightFeature(e) {
        const layer = e.target;
	    return layer.setStyle({
	        weight: 3,
	        color: '#666',
	        fillOpacity: 1
        });
        
        
    }
    
    getColor(d) {
	    return d > 10 ? '#67000d' :
	           d > 6  ? '#fb6a4a' :
               d == 'inexistant'? '#252525' :
               d == 'water'? '#54A4DE' :
	                      '#fee0d2';
    }
    
    style(feature) {
        let property=feature.properties
         var invalidPer=(property.spoiled+property.cancelled+property.blank)*100 / property.signingVoters
         if ( isNaN(invalidPer)) {invalidPer="inexistant"} 
         if ( property.circSubId==null) {invalidPer="water"} 
         return {
                fillColor: this.getColor(invalidPer),
                weight: 1,
                dashOffset:"10%",
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
            };

    }
    clickedShape(e){
        //for the histogram age BarChart
        let property=e.target.feature.properties;
        this.props.sendDataBack(property)
    }
    
    render() {
        const position = this.state.position;
        return (
            <Map center={position} zoom={7} style={{height: '90vh',position:'relative',backgroundColor:'white'}}>
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
                        layer.on({mouseover: this.highlightFeature.bind(this)});
                        layer.on({mouseout: this.resetHighlight.bind(this)});
                    }    
                }
            />

            <Control position="bottomright" >
                <MapKey colorSet={["#67000","#fb6a4a","#fee0d2"]} grades={[6,10]} getColor={this.getColor} keyTitle="Percentage of invalid ballot"  />
            </Control>
          </Map>        
        );
    }
}

export default InvalidMap;