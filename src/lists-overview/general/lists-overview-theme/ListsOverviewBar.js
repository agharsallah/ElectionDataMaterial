import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
export default class ListsOverviewBar extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }
    
    componentWillMount() {
        var listsData = [{name:'Party Lists',y:1053,per:50.91},{name:'Independent Lists',y:859,per:41.53},{name:'Coalition Lists',y:156,per:7.54}]
        this.setState({
            options: {
                chart: {
                    type: 'column',
                    width: null
                },
                credits: false,
                title: {
                    text: ''
                },
                subtitle: {
                    text: '03-03-2018'
                },
                xAxis: {
                    crosshair: true,
                    labels: {
                        enabled: true,
                        formatter: function() { return (listsData[this.value]).name},
                       
                        style: {
                            fontSize: '15px',
                            fontFamily: 'Verdana, sans-serif'
                        },
                    }
                   
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Lists number'
                    }
                },
                tooltip: {
                    headerFormat: '<h3>{point.key}: </h3>',
                    pointFormat: '<b>{point.y}</b> list',
                },
                plotOptions: {
                    column: {
                       
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.per} % '
                        }
                    }
                    
                },
                series: [{
                    showInLegend: false,
                    name: 'lists',
                    data: listsData,
                   
                }]
            }
        });
    }
    
    render() {
        return (
            <div style={{marginTop:'2vh'}}>
            <HighchartInit options={this.state.options} />
               
            </div>
        );
    }
}
