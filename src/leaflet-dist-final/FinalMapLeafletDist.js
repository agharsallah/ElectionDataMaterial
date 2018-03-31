import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer';
import axios from 'axios';
import config from '../config';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import './s.css'

export default class FinalMapLeafletDist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1, position: [35.9, 9.23],
            delimitation: config.initShape, delimitationConsistantMun: config.initShape, etat: 'notloaded',
            govDelimitation: config.initShape, delimitationConsistantGov: config.initShape
            , munBorder: true, govBorder: false, toggleKey: 'mun', toggleKeyg: 'gov' // this state to toggle the mun|gov -> show or hide


        }
    }
    componentWillMount() {
        let qString2 = 'http://inscription.tunisieelection.org:8080/api/shape/correct_mun_delimitation';

        axios({
            method: 'get',
            url: qString2,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },

        })
            .then(response => {
                this.setState({ delimitation: JSON.parse(response.data.data), updateMapButtonBlocked: false, etat: 'loaded', delimitationConsistantMun: JSON.parse(response.data.data) });
            })
            .catch(function (error) {
                console.log(error);
            });
        let qString3 = config.apiUrl + '/api/shape/gov_delimitation';

        axios({
            method: 'get',
            url: qString3,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },

        })
            .then(response => {
                // console.log(response.data.data);
                this.setState({ delimitationConsistantGov: JSON.parse(response.data.data) });
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '',
            fillOpacity: 0.1,
            fill: false
        };
    }
    styleGovDelim(feature) {
        return {
            weight: 3,
            opacity: 1,
            color: 'green',
            dashArray: '',
            fillOpacity: 0.1,
            fill: false
        };
    }

    getBorderSelection(checkboxBorder) {
        console.log(checkboxBorder);
        if (checkboxBorder.munBorder) {
            console.log(checkboxBorder);
            //if the munborder is toggeled we inject the mun borders in the shape
            this.setState({ delimitation: this.state.delimitationConsistantMun, toggleKey: 'munBorder' });
        } else {
            //console.log('ffff');
            //if the munborder is switched off we inject an empty shape
            this.setState({ delimitation: config.initShape, toggleKey: 'noMunBorder' });
        }
        if (checkboxBorder.govBorder) {
            this.setState({ govDelimitation: this.state.delimitationConsistantGov, toggleKeyg: 'govBorder' });
        } else {
            this.setState({ govDelimitation: config.initShape, toggleKeyg: 'noGovBorder' });
        }

        //console.log(munBorder, govBorder);
    }
    render() {

        let { position, toggleKey, toggleKeyg, etat } = this.state;
        console.log(etat);
        return (
            <div>
                <MenuDrawer getBorderSelection={this.getBorderSelection.bind(this)} />
                {etat == 'loaded' ?
                    <Map center={position} zoom={8} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
                        <TileLayer
                            url='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                        />
                        {/* mun Geojson */}
                        <GeoJSON
                            data={this.state.delimitation}
                            key={toggleKey}
                            style={this.style.bind(this)}
                            onEachFeature={
                                (feature, layer) => {
                                    layer.on({ click: layer.bindPopup(feature.properties.LABEL, { permanent: false, className: "tooltipnamear", direction: "right" }) });
                                }
                            }
                        />
                        {/* Gov geojson */}
                        <GeoJSON
                            data={this.state.govDelimitation}
                            key={toggleKeyg}
                            style={this.styleGovDelim.bind(this)}

                        />
                        {/* Loop through the json of points and draw our VCs */}
                        {
                            (G_L_data_AaronMaps).map(function (obj, i) {
                                var radius, colorFill, weight = 0.1
                                if (obj.treata =='L-Gratitude') {
                                    radius = 2400
                                    colorFill = 'green'
                                } else if (obj.treata =='L-Intentions') {
                                    radius = 2400
                                    colorFill = 'yellow'
                                } else if (obj.treata =='L-Pressure') {
                                    radius = 2400
                                    colorFill = 'red'
                                }else {
                                    radius = 0
                                    colorFill = 'black',
                                        weight = 0
                                }
                                return (<Circle radius={radius} key={i} fillOpacity={0.3} weight={weight} fillColor={colorFill} center={([obj.lat, obj.lon])}>
                                    <Popup>
                                        <span>
                                            <h4>id: <b>{obj.id}</b></h4>
                                            <h5>VC name: <b>{obj.center_name}</b></h5>
                                            <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                            <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                            <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                            <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                            <h4>radius is : <b>{radius} m</b></h4>
                                            <h4>Parl 2014 turnout VC level: <b>{(obj.signingvoters_par14 * 100 / obj.registeredvoters_par14).toFixed(2)} %</b></h4>
                                            <h4>Pres 2014 turnout VC level:  <b>{(obj.signingvoters_pres14 * 100 / obj.registeredvoters_pres14).toFixed(2)} %</b></h4>
                                            <h4>number of registered 2018: <b>{obj.registeredvoters_mun18}</b> </h4>
                                            <h4>Rural Per: <b>{Number(obj.ruralper).toFixed(2)}%</b> </h4>
                                            <h4>Urban Per: <b>{Number(obj.urbanper).toFixed(2)}%</b> </h4>
                                            <h4>Unemployment Per: <b>{Number(obj.unemploymentpercentage).toFixed(2)}%</b> </h4>
                                            <h4>Mun State: <b>{obj.state}</b> </h4>
                                            {/* <button className='btn-warning col-md-offset-5' onClick={this.getCircleToDelete.bind(this, obj.center_name_ar)}>Delete</button> */}

                                        </span>
                                    </Popup>
                                </Circle>)
                            }, this)
                        }
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer name="satellite streets mapbox">
                                <TileLayer
                                    url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="streets-mapbox" checked={true}>
                                <TileLayer
                                    attribution="&copy; MapBox "
                                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Mapnik-OpenStreetMap">
                                <TileLayer
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                    </Map> : <div>
                        <div className='col-md-4'></div>
                        <div className='col-md-5' style={{ marginTop: '43vh', textAlign: 'center' }}>
                            <h2 >'Loading Map'</h2> <h3>this might take a minute, sorry for the inconvenience !</h3>
                            <div style={{ marginLeft: '40%' }}>
                                <ReactLoading type='bars' color='#444' className='react-Loader' delay={0} />
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}