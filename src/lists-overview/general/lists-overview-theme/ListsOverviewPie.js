import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
export default class ListsOverviewPie extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }
    
    componentWillMount() {
        var listsData = [{name:'Party Lists',y:1055,per:50.86},{name:'Independent Lists',y:860,per:41.46},{name:'Coalition Lists',y:159,per:7.66}]
        this.setState({
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: false,
                title: {
                    text: ''
                },
                subtitle: {
                    text: '03-03-2018'
                },
                tooltip: {
                    headerFormat: '<h3>{point.key}: </h3>',
                    pointFormat: '<b>{point.per}</b> %',
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: listsData
                }]
            }
        });
    }
    
    render() {
        return (
            <div>
            <HighchartInit options={this.state.options} />
               
            </div>
        );
    }
}
