import React, { Component } from 'react';
import HighchartInit from './HighchartInit' ;
import axios from 'axios' ;


class LineChart extends Component {
constructor(props) {
    super(props);
    this.state={options:{},keyy:'a'}
}

componentWillMount() {
    const self=this
    axios({
        method: 'get',
        url: 'http://localhost:8080/api/getDeclarationsNumber',
        headers: {
            'name': 'barlamen',
            'password': 'b@rlamen1'
        }
      })
      .then(function (response) {
        var categories=[],data=[];
        for (var i = 0; i < (response.data).length; i++) {
            categories.push(response.data[i].year);
            data.push (response.data[i].value);
        }
        console.log('categ1',response);
        console.log('categ',categories);
        console.log('categ',data);
        self.setState({options:{
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Nombre de déclaration annuel'
                },
                subtitle: {
                    text: 'Source: Declaratio db'
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    title: {
                        text: 'Nombre de declarations'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'Déclaration',
                    data: data
                }]
            },
            keyy:'b'

        });
      })
      .catch(function (error) {
        console.log(error);
      });  
}


    render() {
        return (
            <HighchartInit key={this.state.keyy} options={this.state.options}/>
        );
    }
}

export default LineChart;