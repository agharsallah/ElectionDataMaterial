import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer';
import axios from 'axios';
import config from '../config';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
export default class FinalMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1, position: [35.9, 9.23]
        }
    }
    render() {
        const position = this.state.position;

        return (
            <div>
            <MenuDrawer  />
            <Map center={position} zoom={8} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
            <TileLayer
                url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
            />

            <LayersControl position="topright">
                <LayersControl.BaseLayer name="Google Map">
                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                    <TileLayer
                        attribution="&copy; MapBox "
                        url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                    <TileLayer
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

        </Map>
                Hi
            </div>
        );
    }
}