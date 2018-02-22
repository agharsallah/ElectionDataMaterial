import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit';
class BasicColumnRankedLists extends Component {
    constructor(props) {
        super(props);
        this.state = { options: {} }
    }
    /* componentDidMount() {
        var inscriptionArray=[],gouvNameArray=[]
        this.props.allLists.map((element,i)=>{
            inscriptionArray.push(element.value)
            gouvNameArray.push(element.gouv)
        })
        console.log("555555555555",inscriptionArray);
        console.log('555',gouvNameArray);
    } */
    
    componentWillMount() {
        var gouvNameArray = ["Nabeul 1", "Monastir", "Kairouan", "Mahdia", "Sousse", "Bizerte", "Zaghouan", "Jendouba", "Sfax 1", "Nabeul 2", "Ben Arous", "Sidi Bouziid", "Le Kef", "Sfax 2", "Gabes", "Beja", "Medenine", "Gafsa", "Kasserine", "Ariana", "Tozeur", "Manouba", "Tunis 2", "Kebili", "Siliana", "Tataouine", "Tunis 1"],
            inscriptionArray = [46, 44, 40, 38, 38, 35, 33, 33, 33, 32, 30, 28, 27, 27, 23, 22, 22, 21, 19, 18, 16, 15, 12, 11, 10, 7, 6]

        this.setState({
            options: {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(255, 255, 255, .4)',
                    width: null
                },
                credits: false,
                title: {
                    text: this.props.title
                },
                subtitle: {
                    text: '21-02-2018'
                },
                xAxis: {
                    categories: gouvNameArray,
                    crosshair: true,
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '10px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Registration number'
                    }
                },
                tooltip: {
                    headerFormat: '<h3>{point.key}: </h3>',
                    pointFormat: '<b>{point.y}</b> list',
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: false
                        },
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    showInLegend: false,
                    name: 'lists',
                    data: inscriptionArray,
                    /*dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '10px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }*/
                }]
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        var inscriptionArray = [], gouvNameArray = []
        nextProps.allLists.map((element, i) => {
            inscriptionArray.push(element.value)
            gouvNameArray.push(element.gouv)
        })
        //console.log(inscriptionArray);
        this.setState({
            options: {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(255, 255, 255, .4)',
                },
                credits: false,
                title: {
                    text: nextProps.title
                },
                subtitle: {
                    text: '21-02-2018'
                },
                xAxis: {
                    categories: gouvNameArray,
                    crosshair: true,
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '10px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: this.props.ytitle
                    }
                },
                tooltip: {
                    headerFormat: '<h3>{point.key}: </h3>',
                    pointFormat: '<b>{point.y}</b> list',
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: false
                        },
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    showInLegend: false,
                    name: 'lists',
                    data: inscriptionArray,
                }]
            }
        });
    }



    render() {
        return (
            <HighchartInit key={this.props.spec} options={this.state.options} />
        );
    }
}

export default BasicColumnRankedLists;