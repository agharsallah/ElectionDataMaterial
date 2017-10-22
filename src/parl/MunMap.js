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
        let governorate=((this.props.chosenGov.substring(8)).slice(0, -1));        
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
    	featuresLayer.resetStyle(e.target);
    	 info.update();
    }
    
    highlightFeature(e) {
	    var layer = e.target;
	    layer.setStyle({
	        weight: 5,
	        color: '#666',
	        fillOpacity: 1
	    });

	    info.update(layer.feature.properties);
	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	        layer.bringToFront();
	    }
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
                fillOpacity: 0.6
            };

    }
    clickedShape(e){
        //for the histogram age BarChart
        let property=e.target.feature.properties;

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
                        /* layer.on({mouseover: this.highlightFeature.bind(this)});
                        layer.on({mouseout: this.resetFeature.bind(this)}); */
                    }    
                }
            />
          </Map>        
        );
    }
}

export default MunMap;