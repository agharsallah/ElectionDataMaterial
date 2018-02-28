import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer';
import './s.css'
import axios from 'axios';
import config from '../config';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import XlsExport from './xls-export';

class OneToOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shape: config.initShape, shapeIsLoaded: false, key: 1, position: [35.9, 9.23],
            validSamplingArray: [1000, 1100, 1200, 1300, 1400, 1500], circleColorArr: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f'],
            opacityCircle: 0.5,
            votingCenters: [],allVotingCenters:[],showAll:true,
            delimitation: config.initShape, etat: 'notloaded',
            checkBoxData: [false, false, false, false, false, false],
            xlsExport:[]
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
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        })
            .then(response => {
                this.setState({ allVotingCenters: JSON.parse(response.data.data),  votingCenters: JSON.parse(response.data.data) });

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
                this.setState({ delimitation: JSON.parse(response.data.data), etat: 'loaded' });
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
    //Trigered when button Update clicked Action when user specify the sampling radius | Opacity | color Change
    getSampling(validSamplingArray, circleColorArr, opacityCircle) {
        if (Array.isArray(validSamplingArray) && Array.isArray(circleColorArr)) {
            console.log('passed');
            console.log(circleColorArr);
            this.setState({ validSamplingArray, circleColorArr,showAll:true });
            if (!isNaN(parseFloat(opacityCircle))) {
                this.setState({ opacityCircle });
            }
        } else {
            console.log('Error in received data from input');
        }
    }

    getCheckBoxDelete(checkBoxData) {
        console.log(checkBoxData);
        //console.log(JSON.parse(checkBoxData.arrayToDeleteNum));
        //we get the index of the array we're gone delete - this index value is in the checkbox -
        var storedNum = JSON.parse(checkBoxData.arrayToDeleteNum)
        //we define the array of checkbox -which ones are true and which are false
        var addArray = this.state.checkBoxData//ex addArray=[false,true,false,false]
        addArray[storedNum] = checkBoxData.deleteBool // ex addArray[0]=true
        console.log(addArray);

        this.setState({ checkBoxData: addArray,showAll:true });
    }
    getCircleToDelete(toDelete){
        console.log(toDelete);

        var tempArray;
        tempArray=(this.state.votingCenters).filter(function(el) {
            return el.polling !== toDelete;
        });
        var xls = new XlsExport(tempArray, 'String');
        console.log(tempArray);
        this.setState({votingCenters:tempArray,showAll:false,xlsExport:xls});
    }
    render() {
        const position = this.state.position;
        var sampleRadius = this.state.validSamplingArray
        var circleColorArr = this.state.circleColorArr
        var numerOfp1000, numerOf800, numerOf700, numerOf600, numerOf500, numerOfm500;
        var etatKey = this.state.etat, checkBoxData = this.state.checkBoxData, opacityCircle = this.state.opacityCircle;
        //var {etatKey,checkBoxData,opacityCircle}=this.state
        return (
            <div>
                <MenuDrawer getSampling={this.getSampling.bind(this)} xlsSave={this.state.xlsExport} getCheckBoxDelete={this.getCheckBoxDelete.bind(this)} />
                {etatKey == 'loaded' ?
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
                                    layer.on({ click: layer.bindPopup(feature.properties.LABEL, { permanent: false, className: "tooltipnamear", direction: "right" }) });
                                    //layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"right" })
                                }
                            }
                        />
                        {/* Loop through the json of points and draw our VCs */}

                        {this.state.showAll?(this.state.allVotingCenters).map(function (obj, i) {
                            var radius, colorFill, weight = 2
                            if ((obj.sum >= 1000) && (checkBoxData[0] == false)) {
                                radius = sampleRadius[0]
                                colorFill = circleColorArr[0]
                            } else if ((obj.sum >= 800&&obj.sum <1000) && (checkBoxData[1] == false)) {
                                radius = sampleRadius[1]
                                colorFill = circleColorArr[1]
                            } else if ((obj.sum >= 700&&obj.sum <800) && (checkBoxData[2] == false)) {
                                radius = sampleRadius[2]
                                colorFill = circleColorArr[2]
                            } else if ((obj.sum >= 600&&obj.sum <700) && (checkBoxData[3] == false)) {
                                radius = sampleRadius[3]
                                colorFill = circleColorArr[3]
                            } else if ((obj.sum >= 500&&obj.sum <600) && (checkBoxData[4] == false)) {
                                radius = sampleRadius[4]
                                colorFill = circleColorArr[4]
                            } else if ((obj.sum >= 0&&obj.sum <500) && (checkBoxData[5] == false)) {
                                radius = sampleRadius[5]
                                colorFill = circleColorArr[5]
                            } else {
                                radius = 0
                                colorFill = 'black',
                                    weight = 0
                            }
                            return (<Circle radius={radius} key={i} fillOpacity={opacityCircle} weight={weight} fillColor={colorFill} center={[obj.lat, obj.lon]}>
                                <Popup>
                                    <span>
                                        <h4>polling_name: {obj.polling}</h4>
                                        <h4>mun_name: {obj.mun}</h4>
                                        <h4>radius is : {radius} m</h4>
                                        <h4>number of registered: {obj.sum} </h4>
                                        <button className='btn-warning col-md-offset-5' onClick={this.getCircleToDelete.bind(this, obj.polling)}>Delete</button>

                                    </span>
                                </Popup>
                            </Circle>)
                        },this)

                    :
                    /* REPEATING THE SAME BLOCK AS ABOVE BUT WIth DIfFEreNT VCs  */
                    (this.state.votingCenters).map(function (obj, i) {
                        var radius, colorFill, weight = 2
                        if ((obj.sum >= 1000) && (checkBoxData[0] == false)) {
                            radius = sampleRadius[0]
                            colorFill = circleColorArr[0]
                        } else if ((obj.sum >= 800&&obj.sum <1000) && (checkBoxData[1] == false)) {
                            radius = sampleRadius[1]
                            colorFill = circleColorArr[1]
                        } else if ((obj.sum >= 700&&obj.sum <800) && (checkBoxData[2] == false)) {
                            radius = sampleRadius[2]
                            colorFill = circleColorArr[2]
                        } else if ((obj.sum >= 600&&obj.sum <700) && (checkBoxData[3] == false)) {
                            radius = sampleRadius[3]
                            colorFill = circleColorArr[3]
                        } else if ((obj.sum >= 500&&obj.sum <600) && (checkBoxData[4] == false)) {
                            radius = sampleRadius[4]
                            colorFill = circleColorArr[4]
                        } else if ((obj.sum >= 0&&obj.sum <500) && (checkBoxData[5] == false)) {
                            radius = sampleRadius[5]
                            colorFill = circleColorArr[5]
                        } else {
                            radius = 0
                            colorFill = 'black',
                                weight = 0
                        }

                        return (<Circle radius={radius} key={i} fillOpacity={opacityCircle} weight={weight} fillColor={colorFill} center={[obj.lat, obj.lon]}>
                            <Popup>
                                <span>
                                    <h4>polling_name: {obj.polling}</h4>
                                    <h4>mun_name: {obj.mun}</h4>
                                    <h4>radius is : {radius} m</h4>
                                    <h4>number of registered: {obj.sum} </h4>
                                    <button className='btn-warning col-md-offset-5'  onClick={this.getCircleToDelete.bind(this, obj.polling)}>Delete</button>

                                </span>
                            </Popup>
                        </Circle>)
                    },this)
                    
                    }
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

                    </Map> : <div>
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