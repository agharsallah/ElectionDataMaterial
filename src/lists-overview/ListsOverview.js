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
import TooltipPie from './TooltipPie' ;
class ListsOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false, stateFilter: 'total', shapeIsLoaded: false,
            munShape: config.initShape, shape: config.initShape,
            buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', selectedMapLevel: 'gov',//these states colors for mun|gove buttons
            range: [0, 10, 20, 30], // these states are fo the map style & mapkey
            candidatesNumber: 0, chosenListsNumberCount: 0, chosenAvgListNum: 0, chosenMaxListNum: 0, chosenMinListNum: 0// these states are for the upper box info

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

                    indepList.push({ value: parseInt(element.properties.independents), gouv: element.properties.NAME_EN })
                    coalList.push({ value: parseInt(element.properties.coalitions), gouv: element.properties.NAME_EN })
                    partyList.push({ value: parseInt(element.properties.parties), gouv: element.properties.NAME_EN })
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
                    munListsNumberCount += parseInt(element.properties.total_lists);
                    munIndListsNumberCount += parseInt(element.properties.independents);
                    munCoalListsNumberCount += parseInt(element.properties.coalitions);
                    munPartyListsNumberCount += parseInt(element.properties.parties);
                })
                console.log();
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
        if (this.state.selectedMapLevel == 'gov') {
            if (pickedLevel == 'total') {
                this.setState({
                    range: [0, 10, 20, 30],
                    chosenListsNumberCount: this.state.listsNumberCount,
                    chosenAvgListNum: this.state.avgListNum,
                    chosenMaxListNum: this.state.maxListNum,
                    chosenMinListNum: this.state.minListNum
                });
            } else if (pickedLevel == 'indep') {
                this.setState({
                    range: [0, 5, 10, 15],
                    chosenListsNumberCount: this.state.indListsNumberCount,
                    chosenAvgListNum: this.state.indAvgListNum,
                    chosenMaxListNum: this.state.indMaxListNum,
                    chosenMinListNum: this.state.indMinListNum
                });
            } else if (pickedLevel == 'coalition') {
                this.setState({
                    range: [0, 5, 10, 15],
                    chosenListsNumberCount: this.state.coalListsNumberCount,
                    chosenAvgListNum: this.state.coalAvgListNum,
                    chosenMaxListNum: this.state.coalMaxListNum,
                    chosenMinListNum: this.state.coalMinListNum
                });
            } else {
                this.setState({
                    range: [0, 5, 10, 15],
                    chosenListsNumberCount: this.state.partyListsNumberCount,
                    chosenAvgListNum: this.state.partyAvgListNum,
                    chosenMaxListNum: this.state.PartyMaxListNum,
                    chosenMinListNum: this.state.PartyMinListNum
                });
            }
        } else { //if the cosen level is municipality
            if (pickedLevel == 'total') {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenListsNumberCount: this.state.munListsNumberCount,
                    munChosenAvgListNum: this.state.munAvgListNum,
                    munChosenMaxListNum: this.state.munMaxListNum,
                    munChosenMinListNum: this.state.munMinListNum
                });
            } else if (pickedLevel == 'indep') {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenListsNumberCount: this.state.munIndListsNumberCount,
                    munChosenAvgListNum: this.state.munIndAvgListNum,
                    munChosenMaxListNum: this.state.munIndMaxListNum,
                    munChosenMinListNum: this.state.munIndMinListNum
                });
            } else if (pickedLevel == 'coalition') {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenListsNumberCount: this.state.munCoalListsNumberCount,
                    munChosenAvgListNum: this.state.munCoalAvgListNum,
                    munChosenMaxListNum: this.state.munCoalMaxListNum,
                    munChosenMinListNum: this.state.munCoalMinListNum
                });
            } else {
                this.setState({
                    range: [0, 3, 6, 9],
                    munChosenListsNumberCount: this.state.munPartyListsNumberCount,
                    munChosenAvgListNum: this.state.munPartyAvgListNum,
                    munChosenMaxListNum: this.state.munPartyMaxListNum,
                    munChosenMinListNum: this.state.munPartyMinListNum
                });
            }
        }

    }
    MapLevelClick(index) {
        index === 'gov' ?
            this.setState({ buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', selectedMapLevel: 'gov', stateFilter: 'total', range: [0, 10, 20, 30] })
            :
            this.setState({ buttonLabelMun: '#00bcd4', buttonLabelGov: 'black', selectedMapLevel: 'mun', stateFilter: 'total', range: [0, 3, 6, 9] })
    }
    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;
        this.setState({
            gouv_name:property.NAME_EN,
            totalTooltip:property.total_lists,
            independentsTooltip:property.independents,
            coalitionTooltip:property.coalitions,
            partiesTooltip:property.parties,
        });
    }
    render() {
        const position = [37.5, 7.5];
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
        if (this.state.selectedMapLevel == 'gov') {
            shapeKey = 'gov';
            shapeToSelect = this.state.shape

            //decision for the boxes values - dynamic whenever (radio button) changes and or (Mun|gov button) changes
            chosenListsNumberCount = this.state.chosenListsNumberCount;
            chosenAvgListNum = this.state.chosenAvgListNum;
            chosenMaxListNum = this.state.chosenMaxListNum;
            chosenMinListNum = this.state.chosenMinListNum;
            delimitation = ' per gov'
            delimitationTitle = ' per governorate '

        } else {
            shapeKey = 'mun';
            shapeToSelect = this.state.munShape;

            //decision for the boxes values - dynamic whenever (radio button) changes and or (Mun|gov button) changes
            chosenListsNumberCount = this.state.munChosenListsNumberCount;
            chosenAvgListNum = this.state.munChosenAvgListNum;
            chosenMaxListNum = this.state.munChosenMaxListNum;
            chosenMinListNum = this.state.munChosenMinListNum;
            delimitation = ' per mun'
            delimitationTitle = ' per municipality '
        }
        return (
            this.state.redirect ? <Redirect push to={url} /> :
                <div>
                    <HeaderHelmet />

                    <Layout home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />

                    <section className='latest-news-card ' style={{ paddingTop: '10vh' }}>
                        <h5 className='section-title' style={{ textAlign: 'center', fontSize: '30px' }} >{'Number Of Total Lists' + delimitationTitle + '(16-02)'}</h5>
                        <section className='container-fluid' style={{ marginBottom: '10px' }}>
                            <div className='row no-gutter col-md-offset-1'>
                                <DataRectangle imgLink='/img/sum.svg' regValue={chosenListsNumberCount} title={picked + ' lists number'} />
                                <DataRectangle imgLink='/img/candidates.svg' regValue={this.state.candidatesNumber} title='Candidates number' />
                                <DataRectangle imgLink='/img/average.PNG' regValue={chosenAvgListNum} title={'Average ' + picked + ' Lists number' + delimitation} />
                                <DataRectangle imgLink='/img/increaseArrow.svg' regValue={chosenMaxListNum} title={'Highest ' + picked + ' Lists number' + delimitation} />
                                <DataRectangle imgLink='/img/decreaseArrow.svg' regValue={chosenMinListNum} title={'Lowest ' + picked + ' Lists number' + delimitation} />
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
                                                    key={'a' + shapeKey}
                                                    data={shapeToSelect}
                                                    style={this.style.bind(this)}
                                                    onEachFeature={
                                                        (feature, layer) => {
                                                            layer.on({ click: this.clickedShape.bind(this) });
                                                            layer.on({mouseover: this.highlightFeature.bind(this)});
                                                        }
                                                    }
                                                >
                                                    <Tooltip direction="bottom" className="leafletTooltip" sticky={false} zIndex={2000} >
                                                        <div style={{ zIndex: 1501 }} >
                                                            
                                                             <TooltipPie
                                                             city={this.state.gouv_name }
                                                                partyTooltip={this.state.partiesTooltip}
                                                                independentTooltip={this.state.independentsTooltip}
                                                                coalitionTooltip={this.state.coalitionTooltip }
                                                            /> 
                                                            {/* <div style={{ textAlign: "center", position: "relative", marginTop: "-10px" }}>
                                                                <h4><b>{(this.state.maleNumber + this.state.femaleNumber).toLocaleString()}</b>{REGTRANCHE}{this.state.mapAge}</h4>
                                                                <h4><b>{(this.state.allreg_sum - (this.state.maleNumber + this.state.femaleNumber)).toLocaleString()}</b>{OTHERREG}</h4>
                                                            </div> */}
                                                        </div>
                                                    </Tooltip>
                                                    </GeoJSON>

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
                                    </article>{/* /.card */ }
                                </div>{/* /.col-md-12 */}
                            </div>{/* /.row */}
                                </div>{/* /.container */}
                    </section>
                        </div>

                        );
    }
}

export default ListsOverview;