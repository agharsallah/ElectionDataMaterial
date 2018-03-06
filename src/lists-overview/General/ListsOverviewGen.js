import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Translate from 'react-translate-component';
import ListsOverviewGov from '../ListsOverviewGov';
import ListsOverviewMun from '../ListsOverviewMun';
import Layout from '../../Layout';

import HeaderHelmet from '../../HeaderHelmet';

class ListsOverviewGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabelGeneral: '#00bcd4', buttonLabelGov: '', buttonLabelMun: 'black', selectedMapLevel: 'general'//these states colors for mun|gove buttons}    
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
    render() {
        const GOV = <Translate type='text' content='VoterProfile.gov' />
        const MUN = <Translate type='text' content='VoterProfile.mun' />

        return (
            <div>


                {this.state.selectedMapLevel == 'mun' ? <ListsOverviewMun /> :this.state.selectedMapLevel == 'gov' ? <ListsOverviewGov  /> :
                    <div>
                    <HeaderHelmet/>
                        <Layout home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
                        <section className='latest-news-card ' style={{ paddingTop: '10vh' }}>
                            <div className='col-md-4 col-md-offset-1' style={{ zIndex: 1, position: 'absolute', marginTop: '5vh' }} >
                                <div className='col-md-12'>
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'general')} label='General' labelColor={this.state.buttonLabelGeneral} />
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'gov')} label={GOV} labelColor={this.state.buttonLabelGov} style={{ marginLeft: '10px' }} />
                                    <RaisedButton onClick={this.MapLevelClick.bind(this, 'mun')} label={MUN} style={{ marginLeft: '1vh' }} labelColor={this.state.buttonLabelMun} style={{ marginLeft: '10px' }} />

                                </div>
                            </div>
                        </section>
                    </div>
                }
            </div>
        );
    }
}

export default ListsOverviewGen;