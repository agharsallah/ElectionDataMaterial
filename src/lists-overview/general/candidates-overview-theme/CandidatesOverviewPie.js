import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
import counterpart from 'counterpart' ;

export default class ListsOverviewPie extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }
    
    componentWillMount() {
        var listsData;
        counterpart.getLocale()=='ar'? 
        listsData = [{name:' 35 أقل من',y:28044,per:52.07},{name:' 36-45 بين ',y:12834,per:23.83},{name:' 46-60 بين ',y:10600,per:19.68},{name:'60 أكثر من ',y:2377,per:4.41}]
        :listsData = [{name:'less than 35',y:28044,per:52.07},{name:'Between 36-45',y:12834,per:23.83},{name:'Between 46-60',y:10600,per:19.68},{name:'More than 60',y:2377,per:4.41}]

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
                    text: '05-04-2018'
                },
                tooltip: {
                    headerFormat: '<h3>{point.key}: </h3>',
                    pointFormat: '{point.per} %',
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: ' <p class="HighchartLabel">{point.y} </p>'+counterpart.translate('listsOverview.candidates')
                        },
                        showInLegend: true
                    }
                },
                legend: {
                       style:{fontSize: '15px !important'}
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
