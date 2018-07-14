import React, { Component } from 'react';
import HighchartInit from '../../HighchartInit';
export default class MaleVsFemaleColumn extends Component {
    constructor(props) {
        super(props);
        this.state = { option: {} }
    }
    componentWillMount() {
        this.setState({
            options: {
                chart: {
                    type: 'column'
                },
                credits: false,
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Mayors gender']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of seats won'
                    }
                },
                tooltip: {

                    headerFormat: '<b>{this.name}</b><br/>',
                    formatter: function () {
                        var pcnt = (this.y / 348) * 100;
                        return Highcharts.numberFormat(pcnt) + '%';
                    }
                },
                plotOptions: {

                    column: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },

                series: [{
                    name: 'Coalition',
                    data: [12],
                    color: '#FFE396'
                }, {
                    name: 'Independent',
                    data: [121],
                    color: '#059BA5'
                }, {
                    name: 'Party',
                    data: [215],
                    color: '#FF9C3C'
                }]
            }
        }

        )
    }
    render() {
        return (
            <div className='col-md-12' >
                <HighchartInit options={this.state.options} />
            </div>
        );
    }
}