import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
import counterpart from 'counterpart';

export default class CandidatesOverviewBar extends Component {
    constructor(props) {
        super(props);
        this.state = { option: {} }
    }

    componentWillMount() {
        var listsData, range;
        counterpart.getLocale() == 'ar' ?
             (listsData = [{ name: ' 35 أقل من', y: 28044, per: 52.07 }, { name: ' 36-45 بين ', y: 12834, per: 23.83 }, { name: ' 46-60 بين ', y: 10600, per: 19.68 }, { name: '60 أكثر من ', y: 2377, per: 4.41 }],
                range = [' 35 أقل من ', ' 36-45 بين ', '46-60 بين', '60 أكثر من'])
            :(listsData = [{ name: 'less than 35', y: 28044, per: 52.07 }, { name: 'Between 36-45', y: 12834, per: 23.83 }, { name: 'Between 46-60', y: 10600, per: 19.68 }, { name: 'More than 60', y: 2377, per: 4.41 }]
                , range = ['less than 35', 'Between 36-45', 'Between46-60', 'More than 60'])

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
                    categories: range,
                    step: 1,
                    title: {
                        text: counterpart.translate('listsOverview.candAge')
                    },
                    //format: '<b>{value}</b>',
                    //formatter: function() {console.log(this); return (listsData[this.value]).name},
                    labels: {
                        enabled: true,
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }

                },
                yAxis: {
                    min: 0,
                    title: {
                        text: counterpart.translate('listsOverview.candNum')
                    }
                },

                tooltip: {
                    headerFormat: '',
                    pointFormat: ' {point.y} ' + counterpart.translate('listsOverview.candidates'),
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
                            formatter: function () { console.log(this); return (((this.y) * 100) / 53855).toFixed(1) + ' %' },
                        }
                    }

                },
                series: [{
                    showInLegend: false,
                    colorByPoint: true,
                    //name: 'lists',
                    data: listsData,

                }]
            }
        });
    }

    render() {
        return (
            <div style={{ marginTop: '2vh' }}>
                <HighchartInit options={this.state.options} />

            </div>
        );
    }
}
