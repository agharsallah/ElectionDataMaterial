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

        let allPopulation=this.props.allPopulation,socioPercentage=this.props.socioPercentage;
        let sliceColor,pieLegend,pieLegend2;
        if (this.props.chosenParam=='illetracy') 
        {pieLegend='Illetracy percentage for people aged +10';pieLegend2='The rest of the population'}
        else if (this.props.chosenParam=='internetuse')
        {pieLegend='Internet Usage percentage for people aged +10';pieLegend2='The rest of the population'}
        else if (this.props.chosenParam=="registration")
        {pieLegend='Registration Percentage';pieLegend2=''}
        else 
        {pieLegend='Turnout Percentage';pieLegend2=''}
        
        

         if (this.props.chosenParam=="illetracy") {sliceColor="#FF7043"}else if(this.props.chosenParam=="internetuse"){sliceColor="#FF7043"}
        else{sliceColor="#81C784"}
         this.setState({
            options:{
                chart: {
                    type: 'bar',
                    backgroundColor: 'rgba(255, 255, 255, .4)',
                    width: 350,
                    height:300,                },
                title: {
                    text: this.props.title ,
                    align: 'center',
                },
                credits:false,


            plotOptions: {
            pie: {
                     colors: [sliceColor,"#7f7f7f"],
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: 'white'
                        },
                        distance: -10,
                        formatter: function () {
                            console.log(this);
                               return (this.percentage).toFixed(2)+" %"
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
                            {name:pieLegend, y:socioPercentage,selected:true,sliced:true},
                            {name:pieLegend2, y:100-socioPercentage}
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