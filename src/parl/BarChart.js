import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;
import Translate    from 'react-translate-component';

class HistogramVoterProfile extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {

        this.setState({
            options:{
                credits: false,
                title: {
                    text: 'Click on shape first'
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
            pntr=0,cnt=2,
            invalidPer= ((invalid*100)/signingVoters).toFixed(2) ;
        this.setState({
            options:{
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Invalid votes in '+ name
                },
                labels: {
                     overflow: 'justify'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            formatter:function() 
                            {
                                pntr++;
                                var pcnt = (this.y);
                                if(pntr !== cnt)
                                {
                                    return  invalid +' Invalid ballot which represents '+invalidPer+'%';
                                }else{
                                    return signingVoters ;
                                }
                            }
                        }
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
                    shadow: true
                },
                xAxis: {
                    text: ''
                },
                yAxis: {
                    title: {
                        text: 'votes'
                    }
                },
                series: [{
                    name: "Invalid",
                    data: [invalid]
                }, {
                    name: 'Total',
                    data: [signingVoters]
                }],
                credits: false
            }
        });
    }  

        render() {
            return (
                <div style={{position:"absolute!important"}} >
                {console.log("key",this.props.hoveredProperties.NAME_EN)}
                <HighchartInit  options={this.state.options} key={this.props.hoveredProperties.NAME_EN} styles={{height:"65vh"}}/>
                </div>
            );
        }
}

export default HistogramVoterProfile;