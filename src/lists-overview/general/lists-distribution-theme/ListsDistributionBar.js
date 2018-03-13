import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
export default class ListsDistributionBar extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }
    
    componentWillMount() {
        var listsData = [ { name: '2  ', y: 6 },{ name: '3  ', y: 44 },{ name: '4 ', y: 54 },{ name: '5 ', y: 68 },{ name: '6 ', y: 60 },{ name: '7 ', y: 41 },{ name: '8 ', y: 29 },{ name: '9 ', y: 22 },{ name: '10 ', y: 8 },{ name: '11 ', y: 11 },{ name: '12 ', y: 3 },{ name: '13 ', y: 2 },{ name: '14 ', y: 2 } ]
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
                    categories: [2,3,4,5,6,7,8,9,10,11,12,13,14],
                    step:1,
                    //format: '<b>{value}</b>',
                    //formatter: function() {console.log(this); return (listsData[this.value]).name},
                    labels: {
                        enabled: true,
                    title: {
                        text: 'Lists number'
                    },
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                   
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Lists number'
                    }
                },

                tooltip: {
                    headerFormat: '<h2>{point.key} </h2> municipalities have ',
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
                            //format: '{point.y*100/350} % ',
                        formatter: function() {console.log(this); return (( (this.y)*100) / 350).toFixed(1) + ' %'},
                        }
                    }
                    
                },
                series: [{
                    showInLegend: false,
                    //name: 'lists',
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
