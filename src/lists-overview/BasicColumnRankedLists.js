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
        this.props.allInscription.map((element,i)=>{
            inscriptionArray.push(element.value)
            gouvNameArray.push(element.gouv)
        })
        console.log("555555555555",inscriptionArray);
        console.log('555',gouvNameArray);
    }
     */
    componentWillMount() {
        var gouvNameArray = ["Kairouan", "Jendouba", "Nabeul 1", "Mahdia", "Bizerte", "Zaghouan", "Sfax 1", "Sousse", "Sidi Bouziid", "Medenine", "Sfax 2", "Nabeul 2", "Monastir", "Gabes", "Ben Arous", "Le Kef", "Kasserine", "Tunis 2", "Tozeur", "Beja", "Ariana", "Kebili", "Tunis 1", "Gafsa", "Manouba", "Siliana", "Tataouine"],
            inscriptionArray = [31, 29, 28, 25, 21, 21, 20, 18, 17, 17, 17, 17, 13, 13, 12, 12, 11, 10, 10, 8, 7, 7, 6, 6, 5, 1, 1]

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
                    text: '16-02-2018'
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
                    pointFormat: '<b>{point.y}</b> Inscription',
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
                    name: 'inscription',
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
    /* componentWillReceiveProps(nextProps) {
        var inscriptionArray = [], gouvNameArray = []
        nextProps.allInscription.map((element, i) => {
            inscriptionArray.push(element.value)
            gouvNameArray.push(element.gouv)
        })
        console.log(inscriptionArray);
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
                    text: nextProps.subtitle
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
                    pointFormat: '<b>{point.y}</b> Inscription',
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
                    name: 'Tokyo',
                    data: inscriptionArray,
                }]
            }
        });
    } */



    render() {
        return (
            <HighchartInit key={this.props.spec} options={this.state.options} />
        );
    }
}

export default BasicColumnRankedLists;