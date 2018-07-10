import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Translate from 'react-translate-component';
import ListsOverviewGov from '../ListsOverviewGov';
import ListsOverviewMun from '../ListsOverviewMun';
import LayoutTranslated from '../../LayoutTranslated';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import './s.css'
import ListsOverviewTheme from './lists-overview-theme/ListsOverviewTheme' ;
import ListsDistributionTheme from './lists-distribution-theme/ListsDistributionTheme' ;
import CandidatesOverviewTheme from './candidates-overview-theme/CandidatesOverviewTheme' ;
import PartyRankingTheme from './party-ranking-theme/PartyRankingTheme' ;
class ListsOverviewGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabelGeneral:true, buttonLabelGov:false , buttonLabelMun: false , selectedMapLevel: 'general',//these states colors for mun|gove buttons}    
            //Active selected menu- if != '' then active class is implemented
            activeMun:['active-menu-list','','',''],selectedIndex:0
        }
    }

    MapLevelClick(index) {
        index === 'general' ?
            this.setState({ buttonLabelGeneral: true, buttonLabelGov: false, buttonLabelMun: false, selectedMapLevel: 'general' })
            :
            index === 'gov' ?
                this.setState({ buttonLabelGov: true, buttonLabelMun: false, buttonLabelGeneral: false, selectedMapLevel: 'gov' })
                :
                this.setState({ buttonLabelMun: true, buttonLabelGov: false, buttonLabelGeneral: false, selectedMapLevel: 'mun' })
    }
    changeTheme(event,item,index){
        console.log(item.props.value);
        index=item.props.value;
        var array=['','','',''];
        //create an array with active class in the selected index
        array[index]='active-menu-list'
        this.setState({activeMun:array,selectedIndex:index});
    }
    render() {

        const listsOverview = <Translate type='text' content='listsOverview.listsOverview' />//General lists overview
        const listsDist = <Translate type='text' content='listsOverview.listsDist' />//Lists Distribution
        const CandidatesOverview = <Translate type='text' content='listsOverview.CandidatesOverview' />//General Candidates overview
        const partyRanking = <Translate type='text' content='listsOverview.partyRanking' />//Ranking of Candidates Lists per Party
        
        const sideListsOverview = <Translate type='text' content='listsOverview.sideListsOverview' />//Lists Overview
        const sideCandidatesOverview = <Translate type='text' content='listsOverview.sideCandidatesOverview' />//Candidates Overview
        const sidePartyRanking = <Translate type='text' content='listsOverview.sidePartyRanking' />//Party Ranking per list number
        
        const generalLabel = <Translate type='text' content='listsOverview.general' />//General
        const munMapLabel = <Translate type='text' content='listsOverview.munMap' />//Mun Map
        const govMapLabel = <Translate type='text' content='listsOverview.govMap' />//Gov Map
        
        //sidebar title

        //Decision on what the title of the Viz 
        var title;
        this.state.selectedIndex==0?title= listsOverview:
        this.state.selectedIndex==1?title=listsDist:
        this.state.selectedIndex==2?title=CandidatesOverview:
        title=partyRanking;
        return (
            <div>
                {this.state.selectedMapLevel == 'mun' ? <ListsOverviewMun /> : this.state.selectedMapLevel == 'gov' ? <ListsOverviewGov /> :
                    <div>
                        
                        <LayoutTranslated home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
                        <section className='latest-news-card ' style={{ paddingTop: '12vh' }}>
                            <div className='col-md-5  col-md-offset-1' style={{ zIndex: 1, position: 'absolute', marginTop: '1vh' }} >
                                <div className='col-md-12'>
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'general')} label={generalLabel} primary={this.state.buttonLabelGeneral} />
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'gov')} label={govMapLabel} primary={this.state.buttonLabelGov} style={{ marginLeft: '10px' }} />
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'mun')} label={munMapLabel} style={{ marginLeft: '1vh' }} primary={this.state.buttonLabelMun} style={{ marginLeft: '10px' }} />
                                </div>
                            </div>
                        </section>
                        <h5 className='section-title' style={{ textAlign: 'center', fontSize: '25px', marginTop: '12vh' }} >{title}</h5>

                        <section className='col-md-12' >
                            <div className='col-md-2 col-md-offset-1' style={{marginTop:'2vh'}}>
                                <Menu onItemTouchTap={this.changeTheme.bind(this)}>
                                    <MenuItem value={0} primaryText={sideListsOverview} className={this.state.activeMun[0]} />
                                    <MenuItem value={1} primaryText={listsDist} className={this.state.activeMun[1]}/>
                                    <MenuItem value={2} primaryText={sideCandidatesOverview} className={this.state.activeMun[2]}/>
                                    <MenuItem value={3} primaryText={sidePartyRanking} className={this.state.activeMun[3]}/>
                                </Menu>
                            </div>
                            {/* the theme we're gone project according to the selected index in the side menu */}
                            {this.state.selectedIndex==0?<ListsOverviewTheme/>:
                                    this.state.selectedIndex==1? <ListsDistributionTheme/>:
                                    this.state.selectedIndex==2?<CandidatesOverviewTheme/>:
                                    <PartyRankingTheme/>  
                            
                            }
                        </section>
                    </div>
                }
            </div>
        );
    }
}

export default ListsOverviewGen;