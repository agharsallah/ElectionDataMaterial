import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ListsDistributionSlider from './ListsDistributionSlider';
import ListsDistributionBar from './ListsDistributionBar';
import IsieImage from './IsieImage';
import Translate from 'react-translate-component';

export default class ListsDistributionTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabelGeneral: '#00bcd4', buttonLabelGov: '', buttonLabelMun: 'black', selectedMapLevel: 'general',//these states colors for mun|gove buttons}    
            initialActiveButton: [false, false, false], activeButton: [true, false, false] //array of 3 unnecessary but in case we add oter VIZ types
        }
    }
    MapLevelClick(index) {
        var array = [false, false, false];
        array[index] = true;
        console.log(array);
        this.setState({ activeButton: array });
    }
    render() {
        const barChart = <Translate type='text' content='listsOverview.barChart' />//Bar Chart
        const slider = <Translate type='text' content='listsOverview.slider' />//slider
        const Image = <Translate type='text' content='listsOverview.Image' />//Image

        return (
            <div >
                {/* box change */}
                <div className='col-md-7 col-md-offset-1 col-xs-12 '>
                    <RaisedButton
                        label={barChart}
                        className='top-right '
                        primary={this.state.activeButton[0]}
                        onClick={this.MapLevelClick.bind(this, 0)}
                        icon={<FontIcon className="fas fa-chart-bar" color='#000000' />}
                    />
                    <RaisedButton
                        label={slider}
                        className='top-right '
                        primary={this.state.activeButton[1]}
                        onClick={this.MapLevelClick.bind(this, 1)}
                        icon={<FontIcon className="fas fa-sliders-h" color='#000000' />}
                    />
                    <RaisedButton
                        label={Image}
                        className='top-right '
                        primary={this.state.activeButton[2]}
                        onClick={this.MapLevelClick.bind(this, 2)}
                        icon={<FontIcon className="far fa-images" color='#000000' />}
                    />
                </div>
                <div className='col-md-7 col-md-offset-1 col-xs-12 ' >
                    {
                        this.state.activeButton[0] ? <ListsDistributionBar /> :
                            this.state.activeButton[1] ? <ListsDistributionSlider />  :
                            <IsieImage />
                    }
                </div>


            </div>
        );
    }
}
