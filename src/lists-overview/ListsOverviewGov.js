import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, CircleMarker } from 'react-leaflet';
import { Redirect, withRouter, Link, NavLink, Route } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Translate from 'react-translate-component';
import Layout from '../Layout';
import HeaderHelmet from '../HeaderHelmet';
import MapKey from './MapKey';
import Control from 'react-leaflet-control';
import ReactLoading from 'react-loading';
import Radio_state from './Radiobutton_state.js';
import RaisedButton from 'material-ui/RaisedButton';
import BasicColumnRankedLists from './BasicColumnRankedLists';
import DataRectangle from './DataRectangle';
import './s.css'
import TooltipPie from './TooltipPie';
import ListsOverviewGen from './general/ListsOverviewGen';
import ListsOverviewMun from './ListsOverviewMun';

class ListsOverviewGov extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateFilter: 'total', shapeIsLoaded: false, position: [37.5, 7.5],
            munShape: config.initShape, shape: config.initShape,
            buttonLabelGeneral: 'black', buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', selectedMapLevel: 'gov',//these states colors for mun|gove buttons
            range: [0, 50, 80, 100], // these states are fo the map style & mapkey
            candidatesNumber: 45150, chosenListsNumberCount: 0, chosenAvgListNum: 0, chosenMaxListNum: 0, chosenMinListNum: 0// these states are for the upper box info
            , highLowButton: 'none'//these state for the high|low style on the map
        }
        this.getClickedRectangle = this.getClickedRectangle.bind(this)
    }

    componentWillMount() {
       
        //before the components mount I'm gone load and do the calculation of both the municipal and governorate shapes
        let qString = config.apiUrl + '/api/candidatesListNumMap';
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
            params: {
                type: 'gov',
                timeOfCollection: '18h',
                dateOfCollection: '03-03'
            }
        })
            .then(response => {
                //console.log(response.data.data);
                var allLists = [], allGouvname = [], featuresData = JSON.parse(response.data.data).features,
                    listsNumberCount = 0, indListsNumberCount = 0, coalListsNumberCount = 0, partyListsNumberCount = 0,
                    avgListNum = 0, indAvgListNum = 0, coalAvgListNum = 0, partyAvgListNum = 0,
                    indepList = [], coalList = [], partyList = []
                featuresData.map((element, i) => {
                    allLists.push({ value: parseInt(element.properties.total_lists), gouv: element.properties.NAME_EN })

                    indepList.push({ value: parseInt(element.properties.independents), gouv: element.properties.NAME_EN })
                    coalList.push({ value: parseInt(element.properties.coalitions), gouv: element.properties.NAME_EN })
                    partyList.push({ value: parseInt(element.properties.parties), gouv: element.properties.NAME_EN })
                    //calculating the candidates number
                    /* candidatesNumber = (element.properties.total_lists + 3) * element.properties.chairs */

                    //calulating the total independent coalition party list number
                    listsNumberCount += element.properties.total_lists;
                    indListsNumberCount += element.properties.independents;
                    coalListsNumberCount += element.properties.coalitions;
                    partyListsNumberCount += element.properties.parties;
                })
                //calulating the avg list number
                avgListNum = listsNumberCount / featuresData.length
                indAvgListNum = indListsNumberCount / featuresData.length
                coalAvgListNum = coalListsNumberCount / featuresData.length
                partyAvgListNum = partyListsNumberCount / featuresData.length

                allLists.sort(function (a, b) { return b.value - a.value })
                indepList.sort(function (a, b) { return b.value - a.value })
                coalList.sort(function (a, b) { return b.value - a.value })
                partyList.sort(function (a, b) { return b.value - a.value })
                this.setState({
                    shape: JSON.parse(response.data.data), shapeKey: 'gov', shapeIsLoaded: true,
                    allLists, listsNumberCount, avgListNum: avgListNum.toFixed(0),
                    maxListNum: allLists[0].value, minListNum: allLists[allLists.length - 1].value,

                    indepList, indListsNumberCount, indAvgListNum: indAvgListNum.toFixed(0),
                    indMaxListNum: indepList[0].value, indMinListNum: indepList[indepList.length - 1].value,

                    coalList, coalListsNumberCount, coalAvgListNum: coalAvgListNum.toFixed(0),
                    coalMaxListNum: coalList[0].value, coalMinListNum: coalList[coalList.length - 1].value,

                    partyList, partyListsNumberCount, partyAvgListNum: partyAvgListNum.toFixed(0),
                    PartyMaxListNum: partyList[0].value, PartyMinListNum: partyList[partyList.length - 1].value,

                    chosenListsNumberCount: listsNumberCount, chosenAvgListNum: avgListNum.toFixed(0), chosenMaxListNum: allLists[0].value, chosenMinListNum: allLists[allLists.length - 1].value

                });
            }
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    style(feature) {
        //check for what we have checked as filter subject : total List || independent ||
        const etat = this.state.stateFilter; var activeData;
        if (this.state.highLowButton == 'none') {

            if (etat == 'total') {
                activeData = feature.properties.total_lists;
            } else if (etat == 'indep') {
                activeData = feature.properties.independents;
            } else if (etat == 'coalition') {
                activeData = feature.properties.coalitions;
            } else {
                activeData = feature.properties.parties;
            }
            return {
                fillColor: this.getColor(activeData, this.state.range, ['#BBDEFB', '#7DAFD5', '#0096d6', '#005288']),
                color: 'black',
                weight: 1,
                fillOpacity: 0.7
            };
        } else if (this.state.highLowButton == 'highest') {// we are treating the case where the user clicks to see the highest lists of mun
            let activeData, edgeData;
            edgeData = this.state.chosenMaxListNum 
            if (etat == 'total') {
                activeData = feature.properties.total_lists;
            } else if (etat == 'indep') {
                activeData = feature.properties.independents;
            } else if (etat == 'coalition') {
                activeData = feature.properties.coalitions;
            } else {
                activeData = feature.properties.parties;
            }
            return {
                fillColor: this.getOneColor(activeData, edgeData, '#6ed665'),
                color: 'black',
                weight: 1,
                fillOpacity: 0.7
            };
        } else if (this.state.highLowButton == 'lowest') {// we are treating the case where the user clicks to see the lowesr lists of mun
            let activeData, edgeData;
            edgeData = this.state.chosenMinListNum 
            if (etat == 'total') {
                activeData = feature.properties.total_lists;
            } else if (etat == 'indep') {
                activeData = feature.properties.independents;

            } else if (etat == 'coalition') {
                activeData = feature.properties.coalitions;
            } else {
                activeData = feature.properties.parties;
            }
            return {
                fillColor: this.getOneColor(activeData, edgeData, '#d67964'),
                color: 'black',
                weight: 1,
                fillOpacity: 0.7
            };
        } else {
            console.log('ERROR');
        }
    }

    getColor(listsNum, range, colorRange) {
        if (listsNum > range[3]) { return (colorRange[3]); }
        else if (listsNum > range[2]) { return (colorRange[2]); }
        else if (listsNum > range[1]) { return (colorRange[1]); }
        else if (isNaN(listsNum)) { return ('white') }
        else { return (colorRange[0]); }
    }
    getOneColor(activeData, edgeData, Color) {
        if (activeData == edgeData) { return (Color); }
        else { return ('white'); }
    }
    clickedShape(e) {
        //for the histogram age BarChart
        let property = e.target.feature.properties;
        let url = '/munreg/' + property.gouv_name + '/';
        //window.location =url;
        this.setState({ redirect: true, url: url })
    }
    chosenNiveau(event) {
        console.log('dddddddddddd', event.currentTarget.value);
        let pickedLevel = event.currentTarget.value
        this.setState({ stateFilter: pickedLevel });
        //setting the range of the style as soon we get the value from the radio button
        if (this.state.selectedMapLevel == 'gov') {
            if (pickedLevel == 'total') {
                this.setState({
                    range: [0, 50, 80, 100],
                    chosenListsNumberCount: this.state.listsNumberCount,
                    chosenAvgListNum: this.state.avgListNum,
                    chosenMaxListNum: this.state.maxListNum,
                    chosenMinListNum: this.state.minListNum
                });
            } else if (pickedLevel == 'indep') {
                this.setState({
                    range: [0, 20, 40, 60],
                    chosenListsNumberCount: this.state.indListsNumberCount,
                    chosenAvgListNum: this.state.indAvgListNum,
                    chosenMaxListNum: this.state.indMaxListNum,
                    chosenMinListNum: this.state.indMinListNum
                });
            } else if (pickedLevel == 'coalition') {
                this.setState({
                    range: [0, 5, 7, 9],
                    chosenListsNumberCount: this.state.coalListsNumberCount,
                    chosenAvgListNum: this.state.coalAvgListNum,
                    chosenMaxListNum: this.state.coalMaxListNum,
                    chosenMinListNum: this.state.coalMinListNum
                });
            } else {
                this.setState({
                    range: [0, 30, 40, 50],
                    chosenListsNumberCount: this.state.partyListsNumberCount,
                    chosenAvgListNum: this.state.partyAvgListNum,
                    chosenMaxListNum: this.state.PartyMaxListNum,
                    chosenMinListNum: this.state.PartyMinListNum
                });
            }
        }
    }
    MapLevelClick(index) {
        index === 'general' ?
            this.setState({ buttonLabelGeneral: '#00bcd4', buttonLabelGov: 'black', buttonLabelMun: 'black', selectedMapLevel: 'general', stateFilter: 'total', range: [0, 50, 80, 100] })
            :
            index === 'gov' ?
                this.setState({ buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', buttonLabelGeneral: 'black', selectedMapLevel: 'gov', stateFilter: 'total', range: [0, 50, 80, 100] })
                :
                this.setState({ buttonLabelMun: '#00bcd4', buttonLabelGov: 'black', buttonLabelGeneral: 'black', selectedMapLevel: 'mun', stateFilter: 'total', range: [0, 1, 3, 6] })
    }
    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;
        var govName;
        property.GOUV ? govName = '- ' + property.GOUV : govName = ''
        this.setState({
            gouv_name: property.NAME_EN,
            totalTooltip: parseInt(property.total_lists),
            independentsTooltip: parseInt(property.independents),
            coalitionTooltip: parseInt(property.coalitions),
            partiesTooltip: parseInt(property.parties),
            govNameForMunTooltip: govName
        });
    }
    //this function intercepts whenever the client clicks on the min|or max datarectangle
    getClickedRectangle(e) {
        let buttonClicked = e.currentTarget.dataset.id
        if (buttonClicked == 'highest' || buttonClicked == 'lowest') {
            this.setState({ highLowButton: buttonClicked });

        } else {
            this.setState({ highLowButton: 'none', position: [37.5, 7.5] });
        }
    }
    render() {
        const position = this.state.position;
        let url = this.state.url;
        const GOV = <Translate type='text' content='VoterProfile.gov' />
        const MUN = <Translate type='text' content='VoterProfile.mun' />
        //decision for the boxes Text - dynamic whenever radio button changes ontop of the map
        var picked; var pickedLevelState = this.state.stateFilter;
        var candidatesArrayList;
        pickedLevelState == 'total' ? (picked = 'Total', candidatesArrayList = this.state.allLists) :
            (pickedLevelState == 'indep' ? (picked = 'Independent', candidatesArrayList = this.state.indepList) :
                (pickedLevelState == 'coalition' ? (picked = 'Coalition', candidatesArrayList = this.state.coalList) :
                    (picked = 'Party', candidatesArrayList = this.state.partyList)))
        //decision on wht to give to the barchart according to what we have in the radiobutton

        //decision on which shape to load municipal or governorate
        var shapeToSelect, shapeKey;
        var chosenListsNumberCount, chosenMaxListNum, chosenMinListNum, chosenAvgListNum, delimitation, delimitationTitle
       
            shapeKey = 'gov';

            shapeToSelect = this.state.shape

            //decision for the boxes values - dynamic whenever (radio button) changes and or (Mun|gov button) changes
            chosenListsNumberCount = this.state.chosenListsNumberCount;
            chosenAvgListNum = this.state.chosenAvgListNum;
            chosenMaxListNum = this.state.chosenMaxListNum;
            chosenMinListNum = this.state.chosenMinListNum;
            delimitation = ' per gov '
            delimitationTitle = ' per governorate (03-03-2018)' //for main view title

        
        //Decision whether to show reset button or not
        var resetDataRectangle;
        this.state.highLowButton == 'lowest' || this.state.highLowButton == 'highest' ? resetDataRectangle = <DataRectangle identifier='none' regValue='Reset' title='' getClickedRectangle={this.getClickedRectangle} /> : null
        return (
            <div>


                {/* If the clicked button is general Load General Component /general/GeneralViz Else load maps from here */}
                {this.state.selectedMapLevel == 'general' ? <ListsOverviewGen /> :this.state.selectedMapLevel == 'mun' ? <ListsOverviewMun /> :
                    <div>
                    <HeaderHelmet/>
                        <Layout home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
                        <section className='latest-news-card ' style={{ paddingTop: '10vh' }}>
                            <h5 className='section-title' style={{ textAlign: 'center', fontSize: '30px' }} >{'Number Of Total Lists' + delimitationTitle}</h5>
                            <section className='container-fluid' style={{ marginBottom: '10px' }}>
                                <div className='row no-gutter col-md-offset-1'>
                                    <DataRectangle imgLink='/img/sum.svg' identifier='none' regValue={chosenListsNumberCount} title={picked + ' lists number'} getClickedRectangle={this.getClickedRectangle} />
                                    <DataRectangle imgLink='/img/candidates.svg' identifier='none' regValue={this.state.candidatesNumber} title='Candidates number' getClickedRectangle={this.getClickedRectangle} />
                                    <DataRectangle imgLink='/img/average.PNG' identifier='none' regValue={chosenAvgListNum} title={'Average ' + picked + ' Lists number' + delimitation} getClickedRectangle={this.getClickedRectangle} />
                                    <DataRectangle imgLink='/img/increaseArrow.svg' identifier='highest' regValue={chosenMaxListNum} title={'Highest ' + picked + ' Lists number' + delimitation} getClickedRectangle={this.getClickedRectangle} />
                                    <DataRectangle imgLink='/img/decreaseArrow.svg' identifier='lowest' regValue={chosenMinListNum} title={'Lowest ' + picked + ' Lists number' + delimitation} getClickedRectangle={this.getClickedRectangle} />
                                    {resetDataRectangle}
                                </div>
                            </section>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-10 '>
                                        <article className='card'>

                                            {this.state.shapeIsLoaded ?
                                                <Map center={position} zoom={7} maxZoom={7} minZoom={7} style={{ height: '100%', position: 'relative', backgroundColor: 'white' }}>
                                                    {/* <GeoJSON
                                    data= {this.state.shape}
                                    style={this.styleCirc.bind(this)}
                                /> */}
                                                    <GeoJSON
                                                        key={'a' + shapeKey + this.state.highLowButton}
                                                        data={shapeToSelect}
                                                        style={this.style.bind(this)}
                                                        onEachFeature={
                                                            (feature, layer) => {
                                                                layer.on({ mouseover: this.highlightFeature.bind(this) });
                                                            }
                                                        }
                                                    >
                                                        <Tooltip direction="bottom" className="leafletTooltip" sticky={false} zIndex={2000} >
                                                            <div style={{ zIndex: 1501 }} >
                                                                <h4><b>{this.state.totalTooltip}</b> Total lists | <b>{this.state.partiesTooltip}</b> <span style={{ color: '#8e3426' }}>Party List</span></h4>
                                                                <h4><b>{this.state.independentsTooltip}</b> <span style={{ color: '#f6aea3' }}>Independent List </span> | <b>{this.state.coalitionTooltip}</b> <span style={{ color: '#457daf' }}>Coalition List </span></h4>

                                                                <TooltipPie
                                                                    city={this.state.gouv_name + ' ' + this.state.govNameForMunTooltip}
                                                                    partyTooltip={this.state.partiesTooltip}
                                                                    independentTooltip={this.state.independentsTooltip}
                                                                    coalitionTooltip={this.state.coalitionTooltip}
                                                                />

                                                            </div>
                                                        </Tooltip>
                                                    </GeoJSON>

                                                    <Control position='topright' >
                                                        <MapKey colorSet={['#BBDEFB', '#7DAFD5', '#0096d6', '#005288']} range={this.state.range} keyTitle='Candidates Lists Number' />
                                                    </Control>

                                                    <div className='col-md-4 col-md-offset-1' style={{ zIndex: 1, position: 'absolute', marginTop: '5vh' }} >
                                                        <div className='col-md-12'>
                                                            <RaisedButton onClick={this.MapLevelClick.bind(this, 'general')} label='General' labelColor={this.state.buttonLabelGeneral} />
                                                            <RaisedButton onClick={this.MapLevelClick.bind(this, 'gov')} label={GOV} labelColor={this.state.buttonLabelGov} style={{ marginLeft: '10px' }} />
                                                            <RaisedButton onClick={this.MapLevelClick.bind(this, 'mun')} label={MUN} style={{ marginLeft: '1vh' }} labelColor={this.state.buttonLabelMun} style={{ marginLeft: '10px' }} />

                                                        </div>
                                                    </div>

                                                    <Radio_state stateFilter={this.state.stateFilter} handleMunState={this.chosenNiveau.bind(this)} />
                                                    {/*Left side top column chart*/}
                                                    <div className='col-md-6 col-xs-12' style={{ marginTop: '40vh', zIndex: 500 }}>
                                                        {
                                                            <BasicColumnRankedLists
                                                                title='Total candidates lists number'
                                                                allLists={candidatesArrayList}
                                                                spec={'list' + this.state.stateFilter}
                                                                ytitle='Candidates Lists Number'
                                                                subtitle={this.props.regDate + '-2017'}
                                                            />}
                                                    </div>
                                                </Map>
                                                :
                                                <div>
                                                    <div className='col-md-5'></div>
                                                    <div className='col-md-5' style={{ marginTop: '43vh' }}>
                                                        <h2 >'Loading Map'</h2>
                                                        <div style={{ marginLeft: '70px' }}>
                                                            <ReactLoading type='bars' color='#444' className='react-Loader' delay={0} />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </article>{/* /.card */}
                                    </div>{/* /.col-md-12 */}
                                </div>{/* /.row */}
                            </div>{/* /.container */}
                        </section>
                    </div>
                }
            </div>

        );
    }
}

export default ListsOverviewGov;