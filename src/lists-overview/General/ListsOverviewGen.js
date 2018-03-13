import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Translate from 'react-translate-component';
import ListsOverviewGov from '../ListsOverviewGov';
import ListsOverviewMun from '../ListsOverviewMun';
import Layout from '../../Layout';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import './s.css'
import HeaderHelmet from '../../HeaderHelmet';
import ListsOverviewTheme from './lists-overview-theme/ListsOverviewTheme' ;
import ListsDistributionTheme from './lists-distribution-theme/ListsDistributionTheme' ;
class ListsOverviewGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabelGeneral: '#00bcd4', buttonLabelGov: '', buttonLabelMun: 'black', selectedMapLevel: 'general',//these states colors for mun|gove buttons}    
            //Active selected menu- if != '' then active class is implemented
            activeMun:['active-menu-list','','',''],selectedIndex:0
        }
    }

    MapLevelClick(index) {
        index === 'general' ?
            this.setState({ buttonLabelGeneral: '#00bcd4', buttonLabelGov: 'black', buttonLabelMun: 'black', selectedMapLevel: 'general' })
            :
            index === 'gov' ?
                this.setState({ buttonLabelGov: '#00bcd4', buttonLabelMun: 'black', buttonLabelGeneral: 'black', selectedMapLevel: 'gov' })
                :
                this.setState({ buttonLabelMun: '#00bcd4', buttonLabelGov: 'black', buttonLabelGeneral: 'black', selectedMapLevel: 'mun' })
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
        const GOV = <Translate type='text' content='VoterProfile.gov' />
        const MUN = <Translate type='text' content='VoterProfile.mun' />
        //Decision on what the title of the Viz 
        var title;
        this.state.selectedIndex==0?title='General lists overview':
        this.state.selectedIndex==1?title='Lists Distribution':
        this.state.selectedIndex==2?title='General Candidates overview':
        title='Ranking of Candidates Lists per Party';
        return (
            <div>
                {this.state.selectedMapLevel == 'mun' ? <ListsOverviewMun /> : this.state.selectedMapLevel == 'gov' ? <ListsOverviewGov /> :
                    <div>
                        <HeaderHelmet />
                        <Layout home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
                        <section className='latest-news-card ' style={{ paddingTop: '12vh' }}>
                            <div className='col-md-4  col-md-offset-1' style={{ zIndex: 1, position: 'absolute', marginTop: '1vh' }} >
                                <div className='col-md-12'>
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'general')} label='General' labelColor={this.state.buttonLabelGeneral} />
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'gov')} label={GOV} labelColor={this.state.buttonLabelGov} style={{ marginLeft: '10px' }} />
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'mun')} label={MUN} style={{ marginLeft: '1vh' }} labelColor={this.state.buttonLabelMun} style={{ marginLeft: '10px' }} />
                                </div>
                            </div>
                        </section>
                        <h5 className='section-title' style={{ textAlign: 'center', fontSize: '25px', marginTop: '10vh' }} >{title}</h5>

                        <section className='col-md-12' >
                            <div className='col-md-2 col-md-offset-1' style={{marginTop:'2vh'}}>
                                <Menu onItemTouchTap={this.changeTheme.bind(this)}>
                                    <MenuItem value={0} primaryText="Lists Overview" className={this.state.activeMun[0]} />
                                    <MenuItem value={1} primaryText="Lists distribution" className={this.state.activeMun[1]}/>
                                    <MenuItem value={2} primaryText="Candidates Overview" className={this.state.activeMun[2]}/>
                                    <MenuItem value={3} primaryText="Party Ranking" className={this.state.activeMun[3]}/>
                                </Menu>
                            </div>
                            {this.state.selectedIndex==0?<ListsOverviewTheme/>:
                                    this.state.selectedIndex==1? <ListsDistributionTheme/>:null  
                            
                            }
                        </section>
                    </div>
                }
            </div>
        );
    }
}

export default ListsOverviewGen;