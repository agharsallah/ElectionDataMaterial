import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ListsOverviewBar from './ListsOverviewBar' ;
import ListsOverviewPie from './ListsOverviewPie' ;
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
        return (
            <div >
                {/* box change */}
                <div className='col-md-7 col-md-offset-1 col-xs-12 '>
                    <RaisedButton
                        label="Bar Chart"
                        className='top-right '
                        primary={this.state.activeButton[0] }
                        onClick={this.MapLevelClick.bind(this, 0)}
                        icon={<FontIcon className="fas fa-chart-bar" color='#000000' />}
                    />
                    <RaisedButton
                        label="Pie Chart"
                        className='top-right '
                        primary={this.state.activeButton[1] }
                        onClick={this.MapLevelClick.bind(this, 1)}
                        icon={<FontIcon className="fas fa-chart-pie" />}
                    />
                    {/* <RaisedButton
                        label="Boxes"
                        className='top-right '
                        primary={this.state.activeButton[2] }
                        onClick={this.MapLevelClick.bind(this, 2)}
                        icon={<FontIcon className="fas fa-th-large" />}
                    /> */}
                   
                </div>
                <div className='col-md-7 col-md-offset-1 col-xs-12 ' >
                {
                    this.state.activeButton[0]?<ListsOverviewBar/>: <ListsOverviewPie/>
                }
                </div>
                

            </div>
        );
    }
}
