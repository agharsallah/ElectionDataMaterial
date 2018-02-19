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
class ListsOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false, stateFilter: 'total', shapeIsLoaded: false,
            munShape: config.initShape, shape: config.initShape,
            buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', selectedMapLevel: 'gov',//these states colors for mun|gove buttons
            range: [0, 10, 20, 30], // these states are fo the map style & mapkey
            candidatesNumber: 0, chosenlistsNumberCount: 0, chosenavgListNum: 0, chosenmaxListNum: 0, chosenminListNum: 0// these states are for the upper box info

        }
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
                timeOfCollection: '15h',
                dateOfCollection: '16-02'
            }
        })
            .then(response => {
                //console.log(response.data.data);
                var allLists = [], allGouvname = [], candidatesNumber = 0, featuresData = JSON.parse(response.data.data).features,
                    listsNumberCount = 0, indListsNumberCount = 0, coalListsNumberCount = 0, partyListsNumberCount = 0,
                    avgListNum = 0, indAvgListNum = 0, coalAvgListNum = 0, partyAvgListNum = 0,
                    indepList = [], coalList = [], partyList = []
                featuresData.map((element, i) => {
                    allLists.push({ value: parseInt(element.properties.total_lists), gouv: element.properties.NAME_EN })

                    indepList.push({ value: parseInt(element.properties.independents) })
                    coalList.push({ value: parseInt(element.properties.coalitions) })
                    partyList.push({ value: parseInt(element.properties.parties) })
                    //calculating the candidates number
                    candidatesNumber = (element.properties.total_lists + 3) * element.properties.chairs
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
                    allLists, candidatesNumber, listsNumberCount, avgListNum: avgListNum.toFixed(0),
                    maxListNum: allLists[0].value, minListNum: allLists[allLists.length - 1].value,

                    indListsNumberCount, indAvgListNum: indAvgListNum.toFixed(0),
                    indMaxListNum: indepList[0].value, indMinListNum: indepList[indepList.length - 1].value,

                    coalListsNumberCount, coalAvgListNum: coalAvgListNum.toFixed(0),
                    coalMaxListNum: coalList[0].value, coalMinListNum: coalList[coalList.length - 1].value,

                    partyListsNumberCount, partyAvgListNum: partyAvgListNum.toFixed(0),
                    PartyMaxListNum: partyList[0].value, PartyMinListNum: partyList[partyList.length - 1].value,

                    chosenlistsNumberCount: listsNumberCount, chosenavgListNum: avgListNum.toFixed(0), chosenmaxListNum: allLists[0].value, chosenminListNum: allLists[allLists.length - 1].value

                });
            }
            )
            .catch(function (error) {
                console.log(error);
            });

        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
            params: {
                type: 'mun',
                timeOfCollection: '15h',
                dateOfCollection: '16-02'
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
                    munListsNumberCount += element.properties.total_lists;
                    munIndListsNumberCount += element.properties.independents;
                    munCoalListsNumberCount += element.properties.coalitions;
                    munPartyListsNumberCount += element.properties.parties;
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
                    munShape: JSON.parse(response.data.data), shapeKey: 'mun',
                    munAllLists, munListsNumberCount, munAvgListNum: munAvgListNum.toFixed(0),
                    munMaxListNum: munAllLists[0].value, munMminListNum: munAllLists[munAllLists.length - 1].value,

                    munIndListsNumberCount, munIndAvgListNum: munIndAvgListNum.toFixed(0),
                    munIndMaxListNum: munIndepList[0].value, munIndMinListNum: munIndepList[munIndepList.length - 1].value,

                    munCoalListsNumberCount, munCoalAvgListNum: munCoalAvgListNum.toFixed(0),
                    munCoalMaxListNum: munCoalList[0].value, munCoalMinListNum: munCoalList[munCoalList.length - 1].value,

                    munPartyListsNumberCount, munPartyAvgListNum: munPartyAvgListNum.toFixed(0),
                    munPartyMaxListNum: munPartyList[0].value, munPartyMinListNum: munPartyList[munPartyList.length - 1].value,

                    munChosenlistsNumberCount: munListsNumberCount, munChosenavgListNum: munAvgListNum.toFixed(0), munChosenmaxListNum: munAllLists[0].value, munChosenminListNum: munAllLists[munAllLists.length - 1].value

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

    }
    getColor(listsNum, range, colorRange) {
        if (listsNum > range[3]) { return (colorRange[3]); }
        else if (listsNum > range[2]) { return (colorRange[2]); }
        else if (listsNum > range[1]) { return (colorRange[1]); }
        else if (isNaN(listsNum)) { return ('white') }
        else { return (colorRange[0]); }
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
        if (this.state.selectedMapLevel=='gov') {
            if (pickedLevel == 'total') {
                this.setState({
                    range: [0, 10, 20, 30],
                    chosenlistsNumberCount: this.state.listsNumberCount,
                    chosenavgListNum: this.state.avgListNum,
                    chosenmaxListNum: this.state.maxListNum,
                    chosenminListNum: this.state.minListNum
                });
            } else if (pickedLevel == 'indep') {
                this.setState({
                    range: [0, 5, 10, 15],
                    chosenlistsNumberCount: this.state.indListsNumberCount,
                    chosenavgListNum: this.state.indAvgListNum,
                    chosenmaxListNum: this.state.indMaxListNum,
                    chosenminListNum: this.state.indMinListNum
                });
            } else if (pickedLevel == 'coalition') {
                this.setState({
                    range: [0, 5, 10, 15],
                    chosenlistsNumberCount: this.state.coalListsNumberCount,
                    chosenavgListNum: this.state.coalAvgListNum,
                    chosenmaxListNum: this.state.coalMaxListNum,
                    chosenminListNum: this.state.coalMinListNum
                });
            } else {
                this.setState({
                    range: [0, 5, 10, 15],
                    chosenlistsNumberCount: this.state.partyListsNumberCount,
                    chosenavgListNum: this.state.partyAvgListNum,
                    chosenmaxListNum: this.state.PartyMaxListNum,
                    chosenminListNum: this.state.PartyMinListNum
                });
            }
        }else{ //if the cosen level is municipality
            if (pickedLevel == 'total') {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenlistsNumberCount: this.state.munListsNumberCount,
                    munChosenavgListNum: this.state.munAvgListNum,
                    munChosenmaxListNum: this.state.munMaxListNum,
                    munChosenminListNum: this.state.munMinListNum
                });
            } else if (pickedLevel == 'indep') {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenlistsNumberCount: this.state.munIndListsNumberCount,
                    munChosenavgListNum: this.state.munIndAvgListNum,
                    munChosenmaxListNum: this.state.munIndMaxListNum,
                    munChosenminListNum: this.state.munIndMinListNum
                });
            } else if (pickedLevel == 'coalition') {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenlistsNumberCount: this.state.munCoalListsNumberCount,
                    munChosenavgListNum: this.state.munCoalAvgListNum,
                    munChosenmaxListNum: this.state.munCoalMaxListNum,
                    munChosenminListNum: this.state.munCoalMinListNum
                });
            } else {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenlistsNumberCount: this.state.munPartyListsNumberCount,
                    munChosenavgListNum: this.state.munPartyAvgListNum,
                    munChosenmaxListNum: this.state.munPartyMaxListNum,
                    munChosenminListNum: this.state.munPartyMinListNum
                });
            }
        }
       
    }
    MapLevelClick(index) {
        index === 'gov' ?
            this.setState({ buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', selectedMapLevel: 'gov',stateFilter:'total',range: [0, 10, 20, 30] })
            :
            this.setState({ buttonLabelMun: '#00bcd4', buttonLabelGov: 'black', selectedMapLevel: 'mun',stateFilter:'total',range: [0, 3, 6, 9] })
    }
    render() {
        const position = [37.5, 7.5];
        let url = this.state.url;
        const GOV = <Translate type='text' content='VoterProfile.gov' />
        const MUN = <Translate type='text' content='VoterProfile.mun' />
        //decision for the boxes ontop of the map
        var picked; var pickedLevelState = this.state.stateFilter
        pickedLevelState == 'total' ? picked = 'Total' : (pickedLevelState == 'indep' ? picked = 'Independent' : (pickedLevelState == 'coalition' ? picked = 'Coalition' : picked = 'Party'))
        //decision on which shape to load municipal or governorate
        var shapeToSelect,shapeKey;
        if (this.state.selectedMapLevel=='gov') {
            shapeKey='gov';
            shapeToSelect=this.state.shape
        }else{
            shapeKey='mun';
            shapeToSelect=this.state.munShape
        }
        return (
            this.state.redirect ? <Redirect push to={url} /> :
                <div>
                    <HeaderHelmet />

                    <Layout home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />

                    <section className='latest-news-card ' style={{ paddingTop: '10vh' }}>
                        <h5 className='section-title' style={{ textAlign: 'center', fontSize: '30px' }} >Number Of Total Lists Per Governorate (16-02)</h5>
                        <section className='container-fluid' style={{ marginBottom: '10px' }}>
                            <div className='row no-gutter col-md-offset-1'>
                                <DataRectangle imgLink='/img/sum.svg' regValue={this.state.chosenlistsNumberCount} title={picked + ' lists number'} />
                                <DataRectangle imgLink='/img/candidates.svg' regValue={this.state.candidatesNumber} title='Candidates number' />
                                <DataRectangle imgLink='/img/average.PNG' regValue={this.state.chosenavgListNum} title={'Average ' + picked + ' Lists number per gov'} />
                                <DataRectangle imgLink='/img/increaseArrow.svg' regValue={this.state.chosenmaxListNum} title={'Highest ' + picked + ' Lists number per gov'} />
                                <DataRectangle imgLink='/img/decreaseArrow.svg' regValue={this.state.chosenminListNum} title={'Lowest ' + picked + ' Lists number per gov'} />
                            </div>
                        </section>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-10 '>
                                    <article className='card'>

                                        {this.state.shapeIsLoaded ?
                                            <Map center={position} zoom={7} maxZoom={8} minZoom={7} style={{ height: '100%', position: 'relative', backgroundColor: 'white' }}>
                                                {/* <GeoJSON
                                    data= {this.state.shape}
                                    style={this.styleCirc.bind(this)}
                                /> */}
                                                <GeoJSON
                                                    key={'a' + shapeKey}
                                                    data={shapeToSelect}
                                                    style={this.style.bind(this)}
                                                    onEachFeature={
                                                        (feature, layer) => {
                                                            layer.bindTooltip(feature.properties.NAME_EN, { permanent: false, className: 'tooltipnamear', direction: 'right' })
                                                            layer.on({ click: this.clickedShape.bind(this) });
                                                        }
                                                    }
                                                />

                                                <Control position='topright' >
                                                    <MapKey colorSet={['#BBDEFB', '#7DAFD5', '#0096d6', '#005288']} range={this.state.range} keyTitle='Candidates Lists Number' />
                                                </Control>

                                                <div className='col-md-3 col-md-offset-1' style={{ zIndex: 1, position: 'absolute', marginTop: '5vh' }} >
                                                    <div className='col-md-12'>
                                                        <RaisedButton onClick={this.MapLevelClick.bind(this, 'gov')} label={GOV} labelColor={this.state.buttonLabelGov} />
                                                        <RaisedButton onClick={this.MapLevelClick.bind(this, 'mun')} label={MUN} style={{ marginLeft: '1vh' }} labelColor={this.state.buttonLabelMun} />

                                                    </div>
                                                </div>

                                                <Radio_state stateFilter={this.state.stateFilter} handleMunState={this.chosenNiveau.bind(this)} />
                                                {/*Left side top column chart*/}
                                                <div className='col-md-6 col-xs-12' style={{ marginTop: '40vh', zIndex: 500 }}>
                                                    {
                                                        <BasicColumnRankedLists
                                                            title='Total candidates lists number'
                                                            allLists={this.state.allLists}
                                                            spec={'inscription' + this.props.regDate}
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

        );
    }
}

export default ListsOverview;