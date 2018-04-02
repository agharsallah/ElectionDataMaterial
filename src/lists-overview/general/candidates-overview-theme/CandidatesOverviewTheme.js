import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ListsDistributionSlider from './ListsDistributionSlider';
import CandidatesOverviewBar from './CandidatesOverviewBar';
import IsieImage from './IsieImage';

export default class CandidatesOverviewTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabelGeneral: '#00bcd4', buttonLabelGov: '', buttonLabelMun: 'black', selectedMapLevel: 'general',//these states colors for mun|gove buttons}    
            activeButton: [true, false, false] //array of 3 unnecessary but in case we add oter VIZ types
        }
    }
    MapLevelClick(index) {
        var array = [false, false, false];
        array[index] = true;
        console.log(array);
        this.setState({ activeButton: array });
    }
    render() {
        return (
            <div >
                {/* box change */}
                <div className='col-md-7 col-md-offset-1 col-xs-12 '>
                    <RaisedButton
                        label="Bar Chart"
                        className='top-right '
                        primary={this.state.activeButton[0]}
                        onClick={this.MapLevelClick.bind(this, 0)}
                        icon={<FontIcon className="fas fa-chart-bar" color='#000000' />}
                    />
                    <RaisedButton
                        label="Slider"
                        className='top-right '
                        primary={this.state.activeButton[1]}
                        onClick={this.MapLevelClick.bind(this, 1)}
                        icon={<FontIcon className="fas fa-sliders-h" color='#000000' />}
                    />
                    <RaisedButton
                        label="Image"
                        className='top-right '
                        primary={this.state.activeButton[2]}
                        onClick={this.MapLevelClick.bind(this, 2)}
                        icon={<FontIcon className="far fa-images" color='#000000' />}
                    />
                </div>
                <div className='col-md-7 col-md-offset-1 col-xs-12 ' >
                    {
                        this.state.activeButton[0] ? <CandidatesOverviewBar /> :
                            this.state.activeButton[1] ? <ListsDistributionSlider />  :
                            <IsieImage />
                    }
                </div>


            </div>
        );
    }
}
