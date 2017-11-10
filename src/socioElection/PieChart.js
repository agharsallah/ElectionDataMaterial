import React, { Component } from 'react';

class PieChart extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount() {
                    return<h4 >Hello tttt</h4>
                    console.log(this.ref.desc)
    }
    
    
    componentDidMount() {
        let RegistrationPercentage,Rgistred,PotentialVoters11;
        if (this.props.ElectionYear=="2011") {
            RegistrationPercentage=parseInt(this.props.RegPer11);
            Rgistred=this.props.registred11;
            PotentialVoters11=this.props.potentialVoters11;
        }else{
            RegistrationPercentage=parseInt(this.props.RegPer14);
            Rgistred=this.props.registred14;
            PotentialVoters11=this.props.potentialVoters14;
        }
         this.charts = new Highcharts["Chart"]('container',{
                credits: {
                    enabled: false
                },
                chart: {
                            backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    },
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: this.props.name +' ('+this.props.circname+' )'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.1f} % <br/><br/> <br/> {point.l} Person',
                            distance: -50
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Percentage',
                    data: [
                        {
                            name: 'Registered',
                            y: RegistrationPercentage,
                            l:Rgistred,
                            sliced: true,
                            selected: true
                        },
                        { name: 'Eligible non registered Voters',l:PotentialVoters11, y: parseInt(100-RegistrationPercentage)}
                    
                    
                    ]
                }]
            }
            );    

    }
    
    render() {

        return(<div className="two" id="container" ref='container' style={{height:"380px",width:'400px'}}>
        <h4 ref="desc">Hello</h4>
        </div>)
                    
    }
}

export default PieChart;