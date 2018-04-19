import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ListsOverviewBar from './ListsOverviewBar' ;
import ListsOverviewPie from './ListsOverviewPie' ;
import IsieImage from './IsieImage';
import Translate from 'react-translate-component';

export default class ListsOverviewTheme extends Component {
    constructor(props){
      super(props);
      this.state={            
        buttonLabelGeneral: '#00bcd4', buttonLabelGov: '', buttonLabelMun: 'black', selectedMapLevel: 'general',//these states colors for mun|gove buttons}    
        initialActiveButton:[false,false,false], activeButton:[true,false,false]
    }
    }
    MapLevelClick(index){
        var array=[false,false,false];
        array[index]=true;
        console.log(array);
        this.setState({activeButton:array});
    }
    render() {
        //type-viz buttons
        const barChart = <Translate type='text' content='listsOverview.barChart' />//Bar Chart
        const pieChart = <Translate type='text' content='listsOverview.pieChart' />//Pie Chart
        const Image = <Translate type='text' content='listsOverview.Image' />//Image

        return (
            <div >
                {/* box change */}
                <div className='col-md-7 col-md-offset-1 col-xs-12 '>
                    <RaisedButton
                        label={barChart}
                        className='top-right '
                        primary={this.state.activeButton[0] }
                        onClick={this.MapLevelClick.bind(this, 0)}
                        icon={<FontIcon className="fas fa-chart-bar" color='#000000' />}
                    />
                    <RaisedButton
                        label={pieChart}
                        className='top-right '
                        primary={this.state.activeButton[1] }
                        onClick={this.MapLevelClick.bind(this, 1)}
                        icon={<FontIcon className="fas fa-chart-pie" />}
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
                    this.state.activeButton[0]?<ListsOverviewBar/>: 
                    this.state.activeButton[1]?<ListsOverviewPie/>
                    :<IsieImage/>
                }
                </div>
                

            </div>
        );
    }
}
