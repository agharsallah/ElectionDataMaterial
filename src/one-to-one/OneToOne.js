import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker,Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer' ;
import './s.css' 
import axios from 'axios';
import config from '../config';
import ReactLoading from 'react-loading';

class OneToOne extends Component {
    constructor(props) {
        super(props);
        this.state = { shape: config.initShape, shapeIsLoaded: false, key: 1, position: [35.9, 9.23],
            validSamplingArray: [1000, 1100, 1200, 1300, 1400, 1500],circleColorArr:['#7fc97f','#beaed4','#fdc086','#ffff99','#386cb0','#f0027f'],
            opacityCircle:0.5,votingCenters:[],delimitation:config.initShape,etat:'notloaded'
        }
    }
    componentWillMount() {
        let qString = config.apiUrl + '/api/shape/dataSample300-2000VCs';
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi',
                'Access-Control-Allow-Origin': '*',
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
           
        })
        .then(response => {
            this.setState({votingCenters:JSON.parse(response.data.data)});


        })
        .catch(function (error) {
            console.log(error);
        });
        let qString2 = config.apiUrl + '/api/shape/correct_mun_delimitation';

        axios({
            method: 'get',
            url: qString2,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
           
        })
        .then(response => {
            this.setState({delimitation:JSON.parse(response.data.data),etat:'loaded'});
        })
        .catch(function (error) {
            console.log(error);
        });
    
    }
    style(feature) {
            return {
                weight: 3,
                opacity: 1,
                color: 'green',
                dashArray: '',
                fillOpacity: 0.1
            };
	}
    getSampling(validSamplingArray,circleColorArr,opacityCircle){
        if ( Array.isArray(validSamplingArray) && Array.isArray(circleColorArr)) {
            console.log('passed');
            console.log(circleColorArr);
            this.setState({validSamplingArray,circleColorArr});
            if (!isNaN(parseFloat(opacityCircle))) {
                this.setState({opacityCircle});
            }
        }else{
            console.log('Error in received data from input');
        }
    }



    render() {
        const position = this.state.position;
        var sampleRadius=this.state.validSamplingArray
        var circleColorArr=this.state.circleColorArr
        var numerOfp1000,numerOf800,numerOf700,numerOf600,numerOf500,numerOfm500;
        var opacityCircle=this.state.opacityCircle;
        var etatKey=this.state.etat
        return (
            <div>
            <MenuDrawer getSampling={this.getSampling.bind(this)} />
            {etatKey=='loaded'?
            <Map center={position} zoom={8} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
                <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                />
                <GeoJSON
                    data={this.state.delimitation}
                    key={etatKey}
                    style={this.style.bind(this)}
                    onEachFeature={
                        (feature, layer) => {
                            layer.on({click: layer.bindPopup(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"right" })});
                            //layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"right" })
                        }    
                    }
                /> 
                {/* Loop through the json of points and draw our VCs */}

                {(this.state.votingCenters).map(function (obj, i) {
                    var radius,colorFill
                    if (obj.sum>=1000) {
                        radius=sampleRadius[0]
                        colorFill=circleColorArr[0]
                    }else if(obj.sum>=800){
                        radius=sampleRadius[1]
                        colorFill=circleColorArr[1]
                    }else if(obj.sum>=700){
                        radius=sampleRadius[2]
                        colorFill=circleColorArr[2]
                    }else if(obj.sum>=600){
                        radius=sampleRadius[3]
                        colorFill=circleColorArr[3]
                    }else if(obj.sum>=500){
                        radius=sampleRadius[4]
                        colorFill=circleColorArr[4]
                    }else{
                        radius=sampleRadius[5]
                        colorFill=circleColorArr[5]
                    }
                   return (<Circle radius={radius} key={i} fillOpacity={opacityCircle} fillColor={colorFill} center={[obj.lat,obj.lon]}>
                        <Popup>
                            <span>
                            <h4>polling_name: {obj.polling}</h4>
                            <h4>mun_name: {obj.mun}</h4>
                            <h4>radius is : {radius} m</h4>
                            <h4>number of registered: {obj.sum} </h4>
                            </span>
                        </Popup>
                    </Circle>)
                })}
                {/* {G_data_sample.map(function (obj, i) {
                    <CircleMarker position={[obj.lon, obj.lat]}>
                        <Popup>
                            <span>
                            <h4>polling_name: {obj.polling}</h4>
                            <h4>mun_name: {obj.mun}</h4>
                            </span>
                        </Popup>
                    </CircleMarker>
                })} */}

            </Map>:<div>
            <div className='col-md-5'></div>
            <div className='col-md-5' style={{ marginTop: '43vh' }}>
                <h2 >'Loading Map'</h2>
                <div style={{ marginLeft: '70px' }}>
                    <ReactLoading type='bars' color='#444' className='react-Loader' delay={0} />
                </div>
            </div>
        </div>}
</div>
        );
    }
}

export default OneToOne;