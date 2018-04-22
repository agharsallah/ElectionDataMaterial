import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
import counterpart from 'counterpart' ;

export default class ListsOverviewBar extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }
    
    componentWillMount() {
        var listsData;
        console.log(counterpart.getLocale());
        counterpart.getLocale()=='ar'? 
        listsData = [{name:'قائمة حزبية',y:1055,per:50.86},{name:'قائمة مستقلة',y:860,per:41.46},{name:'قائمة ائتلافية',y:159,per:7.66}]
        :listsData = [{name:'Party Lists',y:1055,per:50.86},{name:'Independent Lists',y:860,per:41.46},{name:'Coalition Lists',y:159,per:7.66}]

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
                    text: '05-04-2018'
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
                        text:  counterpart.translate('listsOverview.listNumber')
                    }
                },
                tooltip: {
                    headerFormat: '<h3>{point.key}: </h3>',
                    pointFormat: '{point.y} '+counterpart.translate('listsOverview.liste'),
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
                    colorByPoint: true,
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
