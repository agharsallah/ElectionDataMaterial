import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;
import Translate    from 'react-translate-component';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {

        this.setState({
            options:{
                credits: false,
                title: {
                    text: 'Pick a shape'
                }
            }
        });
    }  
        componentWillReceiveProps(nextProps) {
            console.log(nextProps);
            let property=nextProps.hoveredProperties, name = property.NAME_EN,
            blank= property.blank,
            spoiled= property.spoiled,
            cancelled= property.cancelled,
            invalid= blank+spoiled+cancelled,
            signingVoters= property.signingVoters,
            pntr=0,cnt=5,
            invalidPer= ((invalid*100)/signingVoters).toFixed(2),
            chosenNiveau=nextProps.chosenNiveau
            ;
            chosenNiveau=="parl"?chosenNiveau='Parlimentary 14':chosenNiveau='Presidential 14'
        this.setState({
            options:{
                chart: {
                    type: 'bar'
                },
                title: {
                text: 'Invalid votes in '+ name+' ('+chosenNiveau+')'
                },
                labels: {
                     overflow: 'justify'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            color: 'black',
                            fontSize:"14px",
                            formatter:function() 
                            {
                                pntr++;
                                console.log(pntr);
                                if(pntr !== cnt)
                                {
                                    return  invalid +' Invalid ballot which represents '+invalidPer+'%';
                                }else{
                                    console.log('ggggg',pntr);
                                    return signingVoters ;
                                }
                            }
                        }
                    },
                    series: {
                        stacking: 'normal'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: false
                },
                xAxis: {
                    categories: ['invalid','total'],
                    text: null
                },
                yAxis: {
                    title: {
                        text: 'votes',
                        data: [invalid]
                    }
                },
                series: [{
                    name: "blank",
                    data: [blank]
                },
                {
                    name: "spoiled",
                    data: [spoiled]
                },
                {
                    name: "cancelled",
                    data: [cancelled]
                }, {
                    name: 'Total',
                    data: [0,signingVoters]
                }],
                credits: false
            }
        });
    }  

        render() {
            return (
                <div style={{position:"absolute!important"}} >
                {console.log("key",this.props.hoveredProperties.cancelled)}
                <HighchartInit  options={this.state.options} key={this.props.hoveredProperties.cancelled} styles={{height:"75vh"}}/>
                </div>
            );
        }
}

export default BarChart;