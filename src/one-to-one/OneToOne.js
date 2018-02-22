import React, { Component } from 'react';
import axios from 'axios';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker,Circle, CircleMarker } from 'react-leaflet';
import config from '../config';
class OneToOne extends Component {
    constructor(props) {
        super(props);
        this.state = { shape: config.initShape, shapeIsLoaded: false, key: 1, position: [35.9, 10.23] }
    }

    render() {
        const position = this.state.position;
        return (
            <Map center={position} zoom={9} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
                <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                />
               {/*  <GeoJSON
                    key={this.state.key}
                    data={G_mungeo}
                /> */}
                {/* Loop through the json of points and draw our VCs */}

                {G_data_sample.map(function (obj, i) {
                    var radius
                    if (obj.sum>1000) {
                        radius=1000
                    }else{
                        radius=500
                    }
                   return (<Circle radius={radius} center={[obj.lat,obj.lon]}>
                        <Popup>
                            <span>
                            <h4>polling_name: {obj.polling}</h4>
                            <h4>mun_name: {obj.mun}</h4>
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
            </Map>
        );
    }
}

export default OneToOne;