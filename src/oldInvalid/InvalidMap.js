import React, { Component } from 'react';
import axios from 'axios' ;
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Marker,CircleMarker } from 'react-leaflet';
import config from '../config' ;
import Control from 'react-leaflet-control';
import MapKey from './MapKey' ;
class InvalidMap extends Component {
    constructor(props){
      super(props);
      this.state={shape:config.initShape,shapeIsLoaded:false,key:1,position:[34.4,9.8]}
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
        let qString=config.apiUrl+'/api/reg/'+'deleg_'+nextProps.chosenNiveau;
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
            this.setState({shape,key:'gov',shapeIsLoaded:true,key:nextProps.chosenNiveau});
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
	    return d > 10 ? '#bd0026' :
               d > 6  ? '#fd8d3c' :
               d > 3  ? '#fecc5c' :               
               d == 'inexistant'? '#252525' :
               d == 'water'? '#54A4DE' :
	                      '#ffffb2';
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
        const layer = e.target;
	    return layer.setStyle({
	        weight: 6,
	        color: '#666',
	        fillOpacity: 1
        });
    }
    
    render() {
        const position = this.state.position;
        return (
            <Map center={position} zoom={7} style={{height: '98vh',position:'relative',backgroundColor:'white'}}>
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
                <MapKey colorSet={["#67000","#fb6a4a","#fee0d2"]} grades={[3,6,10]} getColor={this.getColor} keyTitle="Percentage of invalid ballot"  />
            </Control>
            <Control position="topright" >
            <p>Click on a shape for more info</p>
        </Control>
          </Map>        
        );
    }
}

export default InvalidMap;