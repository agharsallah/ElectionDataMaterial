import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;

class TooltipPie extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {
        let partyTooltip=this.props.partyTooltip,
        independentTooltip=this.props.independentTooltip,
        coalitionTooltip=this.props.coalitionTooltip
   
        this.setState({
            options:{
                chart: {
                    type: 'bar',
                    backgroundColor: 'rgba(255, 255, 255, .4)',
                    width: 350,
                    height:300,                },
                title: {
                    text: this.props.city ,
                    align: 'center',
                },
                credits:false,


            plotOptions: {
            pie: {
                     colors: ['#8c2411','#ffab9c','#447caf'],
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: 'white'
                        },
                        distance: -10,
                        formatter: function () {
                            console.log(this);
                               return (this.percentage).toFixed(1)+" %"
                            }
                    },
                    showInLegend: true
                }
            },
            series: [{
                animation:false,
                type: 'pie',
                innerSize: '50%',
                animation:false,
                data: [
                            {name:'Party Lists' , y:partyTooltip},
                            {name:'Independent List', y:independentTooltip},
                            {name:'Coalition List', y:coalitionTooltip}
                        ]
            }]
            
            }
        });
    }  

        render() {
            return (
                <div>
                <HighchartInit  options={this.state.options}  />
                </div>
            );
        }
}

export default TooltipPie;