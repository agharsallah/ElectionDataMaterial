import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, CircleMarker } from 'react-leaflet';
import { Redirect, withRouter, Link, NavLink, Route } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Translate from 'react-translate-component';
import LayoutTranslated from '../LayoutTranslated';
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
import ListsOverviewGov from './ListsOverviewGov';
class ListsOverviewMun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateFilter: 'total', shapeIsLoaded: false, position: [34.5, 7.5],
            munShape: config.initShape, shape: config.initShape,
            buttonLabelGeneral: 'black', buttonLabelGov: 'black', buttonLabelMun: '#00bcd4', selectedMapLevel: 'mun',//these states colors for mun|gove buttons
            range: [2, 4, 6, 8], // these states are fo the map style & mapkey
            candidatesNumber: 45150, chosenListsNumberCount: 0, chosenAvgListNum: 0, chosenMaxListNum: 0, chosenMinListNum: 0// these states are for the upper box info
            , highLowButton: 'none'//these state for the high|low style on the map
        }
        this.getClickedRectangle = this.getClickedRectangle.bind(this)
    }

    componentWillMount() {
        let qString = config.apiUrl + '/api/candidatesListNumMap';
        //before the components mount I'm gone load and do the calculation of both the municipal and governorate shapes
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
            params: {
                type: 'mun',
                timeOfCollection: '00h',
                dateOfCollection: '05-04'
            }
        })
            .then(response => {
                var munAllLists = [], featuresData = JSON.parse(response.data.data).features,
                    munListsNumberCount = 0, munIndListsNumberCount = 0, munCoalListsNumberCount = 0, munPartyListsNumberCount = 0,
                    munAvgListNum = 0, munIndAvgListNum = 0, munCoalAvgListNum = 0, munPartyAvgListNum = 0,
                    munIndepList = [], munCoalList = [], munPartyList = []
                featuresData.map((element, i) => {
                    munAllLists.push({ value: parseInt(element.properties.total_lists) })
                    munIndepList.push({ value: parseInt(element.properties.independents) })
                    munCoalList.push({ value: parseInt(element.properties.coalitions) })
                    munPartyList.push({ value: parseInt(element.properties.parties) })
                    //calulating the total independent coalition party list number
                    munListsNumberCount += parseInt(element.properties.total_lists);
                    munIndListsNumberCount += parseInt(element.properties.independents);
                    munCoalListsNumberCount += parseInt(element.properties.coalitions);
                    munPartyListsNumberCount += parseInt(element.properties.parties);
                })

                //calulating the avg list number
                munAvgListNum = munListsNumberCount / featuresData.length
                munIndAvgListNum = munIndListsNumberCount / featuresData.length
                munCoalAvgListNum = munCoalListsNumberCount / featuresData.length
                munPartyAvgListNum = munPartyListsNumberCount / featuresData.length

                munAllLists.sort(function (a, b) { return b.value - a.value })
                munIndepList.sort(function (a, b) { return b.value - a.value })
                munCoalList.sort(function (a, b) { return b.value - a.value })
                munPartyList.sort(function (a, b) { return b.value - a.value })
                this.setState({
                    munShape: JSON.parse(response.data.data), shapeKey: 'mun', shapeIsLoaded: true,
                    munAllLists, munListsNumberCount, munAvgListNum: munAvgListNum.toFixed(0),
                    munMaxListNum: munAllLists[0].value, munMinListNum: munAllLists[munAllLists.length - 1].value,

                    munIndListsNumberCount, munIndAvgListNum: munIndAvgListNum.toFixed(0),
                    munIndMaxListNum: munIndepList[0].value, munIndMinListNum: munIndepList[munIndepList.length - 1].value,

                    munCoalListsNumberCount, munCoalAvgListNum: munCoalAvgListNum.toFixed(0),
                    munCoalMaxListNum: munCoalList[0].value, munCoalMinListNum: munCoalList[munCoalList.length - 1].value,

                    munPartyListsNumberCount, munPartyAvgListNum: munPartyAvgListNum.toFixed(0),
                    munPartyMaxListNum: munPartyList[0].value, munPartyMinListNum: munPartyList[munPartyList.length - 1].value,

                    munChosenListsNumberCount: munListsNumberCount, munChosenAvgListNum: munAvgListNum.toFixed(0), munChosenMaxListNum: munAllLists[0].value, munChosenMinListNum: munAllLists[munAllLists.length - 1].value

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
        //highLow btn is for specific colored shape 
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
            edgeData = this.state.munChosenMaxListNum;
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
            edgeData = this.state.munChosenMinListNum;
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
            console.log('ERROR Unkown chack Lists Overview Mun Line 158');
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

        //if the cosen level is municipality
        if (pickedLevel == 'total') {
            this.setState({
                range: [2,4,6,8],
                munChosenListsNumberCount: this.state.munListsNumberCount,
                munChosenAvgListNum: this.state.munAvgListNum,
                munChosenMaxListNum: this.state.munMaxListNum,
                munChosenMinListNum: this.state.munMinListNum
            });
        } else if (pickedLevel == 'indep') {
            this.setState({
                range: [0, 2, 4, 6],
                munChosenListsNumberCount: this.state.munIndListsNumberCount,
                munChosenAvgListNum: this.state.munIndAvgListNum,
                munChosenMaxListNum: this.state.munIndMaxListNum,
                munChosenMinListNum: this.state.munIndMinListNum
            });
        } else if (pickedLevel == 'coalition') {
            this.setState({
                range: [0, 1, 2, 3],
                munChosenListsNumberCount: this.state.munCoalListsNumberCount,
                munChosenAvgListNum: this.state.munCoalAvgListNum,
                munChosenMaxListNum: this.state.munCoalMaxListNum,
                munChosenMinListNum: this.state.munCoalMinListNum
            });
        } else {
            this.setState({
                range: [0, 2, 4, 6],
                munChosenListsNumberCount: this.state.munPartyListsNumberCount,
                munChosenAvgListNum: this.state.munPartyAvgListNum,
                munChosenMaxListNum: this.state.munPartyMaxListNum,
                munChosenMinListNum: this.state.munPartyMinListNum
            });
        }
    }
    MapLevelClick(index) {
        index === 'general' ?
            this.setState({ buttonLabelGeneral: '#00bcd4', buttonLabelGov: 'black', buttonLabelMun: 'black', selectedMapLevel: 'general', stateFilter: 'total', range: [0, 50, 80, 100] })
            :
            index === 'gov' ?
                this.setState({ buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', buttonLabelGeneral: 'black', selectedMapLevel: 'gov', stateFilter: 'total', range: [0, 50, 80, 100] })
                :
                this.setState({ buttonLabelMun: '#00bcd4', buttonLabelGov: 'black', buttonLabelGeneral: 'black', selectedMapLevel: 'mun', stateFilter: 'total', range: [2, 4, 6, 8] })
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
            this.setState({ highLowButton: 'none' });
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
        pickedLevelState == 'total' ? (picked = 'Total', candidatesArrayList = this.state.munAllLists) :
            (pickedLevelState == 'indep' ? (picked = 'Independent', candidatesArrayList = this.state.munIndepList) :
                (pickedLevelState == 'coalition' ? (picked = 'Coalition', candidatesArrayList = this.state.munCoalList) :
                    (picked = 'Party', candidatesArrayList = this.state.munPartyList)))

        //decision on wht to give to the barchart according to what we have in the radiobutton


        //decision on which shape to load municipal or governorate
        var shapeToSelect, shapeKey, chosenListsNumberCount, chosenMaxListNum, chosenMinListNum, chosenAvgListNum, delimitation, delimitationTitle

        shapeKey = 'mun';
        shapeToSelect = this.state.munShape;
        //decision for the boxes values - dynamic whenever (radio button) changes and or (Mun|gov button) changes
        chosenListsNumberCount = this.state.munChosenListsNumberCount;
        chosenAvgListNum = this.state.munChosenAvgListNum;
        chosenMaxListNum = this.state.munChosenMaxListNum;
        chosenMinListNum = this.state.munChosenMinListNum;
        delimitation = ' per mun'//for Boxes title
        delimitationTitle = ' per municipality (05-04-2018)' //for main view title
        //Decision whether to show reset button or not
        var resetDataRectangle;
        this.state.highLowButton == 'lowest' || this.state.highLowButton == 'highest' ? resetDataRectangle = <DataRectangle identifier='none' regValue='Reset' title='' getClickedRectangle={this.getClickedRectangle} /> : null
        return (
            <div>

                {/* If the clicked button is general Load General Component /general/GeneralViz Else load maps from here */}
                {this.state.selectedMapLevel == 'general' ? <ListsOverviewGen /> : this.state.selectedMapLevel == 'gov' ? <ListsOverviewGov /> :
                    <div>
                        <HeaderHelmet />
                        <LayoutTranslated home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
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
                                                <Map center={position} zoom={7} maxZoom={7} minZoom={7} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
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

export default ListsOverviewMun;