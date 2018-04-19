import React, { Component } from 'react';
import Translate from 'react-translate-component';

export default class IsieImage extends Component {
    render() {
        const ImageDetail = <Translate type='text' content='listsOverview.ImageDetail' />//Image from the official document of ISIE

        return (
            <div style={{marginTop:'4vh'}}>        
            <h4>{ImageDetail} </h4>
            <img src="img/party-rank-03-03-18.jpg" alt="lists distribution tunisie election" style={{width:'100%'}}/>

            </div>
        );
    }
}