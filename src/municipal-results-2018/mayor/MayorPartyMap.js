import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl } from 'react-leaflet';
import ReactLoading from 'react-loading';
import axios from 'axios';
import config from '../../config'
import Control from 'react-leaflet-control';
import Translate from 'react-translate-component';

export default class MayorPartyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shapeIsLoaded: false, shape_mun: config.initShape, shape_gov: config.initShape, key: 1
        }
    }
    componentWillMount() {
        let qString2 = `${config.apiUrl}/api/shape/gov_munelection_valid_blank_reg`;
        axios({
            method: 'get',
            url: qString2,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        })
            .then(response => {
                this.setState({ shape_gov: JSON.parse(response.data.data), });
            })
            .catch(function (error) {
                console.log(error);
            });
        let qString = `${config.apiUrl}/api/shape/mayor_results`;
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        })
            .then(response => {
                this.setState({ shape_mun: JSON.parse(response.data.data), shapeIsLoaded: true });
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    getColorGender(property, color) {
        if (property == 'Independent') { return (color[0]); }
        else if (property == 'Political party') { return (color[1]); }
        else if (property == 'Coalition') { return (color[2]); }
        else { return '#F2F2F0' }
    }
    style(feature) {
        const property = feature.properties;
        // if the radio button filter is per result paint the map selon a certain prop Sinon paint selon another property
        /*  if (this.props.filter == 'per gender') { */
        let PROPERTY = property.list_type;
        return {
            fillColor: this.getColorGender(PROPERTY, ['#059BA5', '#FF9C3C', '#FFE396']),
            weight: 1.2,
            opacity: 0.9,
            color: 'grey',
            dashArray: '1',
            fillOpacity: 0.9
        }
        //}
    }

    styleGovLimiter(feature) {
        return {
            fillColor: 'none',
            weight: 2.5,
            opacity: 2,
            color: 'black',
            dashArray: '3',
            fillOpacity: 1
        };
    }
    highlightFeature(e) {
        const layer = e.target;
        const property = e.target.feature.properties;

        this.setState({
            nom: property.NAME_EN, destroy: false,
            mayorName: property.pres_name,
            mayorGender: property.mayor_gender,
            listType: property.list_type,
            listName: property.list_name
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
        this.setState({ destroy: true });
    }
    render() {

        const HOVER = <Translate type='text' content='map.hover' />//Hover Over the map for more info
        const LOADING = <Translate type='text' content='map.loading' />//Loading Map
        let partyTooltipColor, genderTooltipColor, listTypeTooltip;
        this.state.listName == 'Ennahdha' ? partyTooltipColor = '#147CA3' : this.state.listName == 'Nidaa Tounes' ? partyTooltipColor = '#E10000' : partyTooltipColor = '#262727'
        this.state.listType == 'Independent' ? listTypeTooltip = '#059BA5' : this.state.listType == 'Political party' ? listTypeTooltip = '#FF9C3C' : listTypeTooltip = '#FFE396'
        return (
            <div >
                {this.state.shapeIsLoaded ? <Map maxZoom={9} center={[34.79, 9.8]} keyboard={false} scrollWheelZoom={false} zoom={7} minZoom={5} style={{ height: "95vh", width: "100%", position: "relative" }}>
                    <TileLayer
                        url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                    />

                    <GeoJSON
                        /* key={this.props.filter} */
                        data={this.state.shape_mun}
                        style={this.style.bind(this)}
                        onEachFeature={
                            (feature, layer) => {
                                layer.on({ mouseover: this.highlightFeature.bind(this) });
                                layer.on({ mouseout: this.resetFeature.bind(this) });
                            }
                        }
                    >
                        <Tooltip direction="bottom" className="leafletTooltip" sticky={true} >
                            <div>
                                <h3 style={{ textAlign: 'center' }}>{this.state.nom}</h3>
                                <h4>Mayor : {(this.state.mayorName)} - <span /* style={{color:genderTooltipColor}} */> {this.state.mayorGender == 'M' ? 'Male' : this.state.mayorGender == 'F' ? 'Female' : 'none'}</span></h4>
                                <h4>List Name :  <span style={{ color: partyTooltipColor }}> {this.state.listName}</span> </h4>
                                <h4>List Type :<span style={{ color: listTypeTooltip }} > {this.state.listType} </span> </h4>
                            </div>
                        </Tooltip>
                    </GeoJSON>
                    <GeoJSON
                        /* key={'b'+this.props.filter} */
                        data={this.state.shape_gov}
                        style={this.styleGovLimiter.bind(this)}
                    />
                    <Control position="topright" >
                        <h5>{HOVER}</h5>
                    </Control>
                    <Control position="bottomright" >
                        <div>
                            <div className="info legend" style={{ marginTop: '18vh' }} >
                                <i style={{ background: '#FF9C3C' }}  ></i>Party
                        <br />
                                <i style={{ background: '#059BA5' }}  ></i>Independent
                        <br />

                                <i style={{ background: '#FFE396' }}  ></i>Coalition
                        </div>
                        </div>
                    </Control>

                </Map> :
                    <div>
                        <div className="col-md-5"></div>
                        <div className="col-md-5" style={{ marginTop: "20vh" }}>
                            <h2>{LOADING}</h2>
                            <div style={{ marginLeft: "70px" }}>
                                <ReactLoading type="bars" color="#444" className="react-Loader" delay={0} />
                            </div>
                        </div>
                    </div>

                }
            </div>

        );
    }
}