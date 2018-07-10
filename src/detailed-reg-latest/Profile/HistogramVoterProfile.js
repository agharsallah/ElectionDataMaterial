import React, { Component } from 'react';
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;

class HistogramVoterProfile extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {
        //console.log(this.props.maleHistogram);
        let categories = ['18-35', '36-40', '41-60', '+60'];
        let align,maleFemaleHistogram;
        let totalNumber =this.props.maleFemaleHistogram
        //for component will mount fix
        this.props.mapClicked===true?(malefemaleHistogram=this.props.malefemaleHistogram,align="top")
            :(maleFemaleHistogram=[0],align="middle")

        this.setState({
            options:{
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(255, 255, 255, .6)'
                },
                title: {
                    text: this.props.clickedShapeName,
                },
                credits:false,
                subtitle: {
                    text: 'Isie'
                },
                xAxis: [{
                    categories: categories,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                console.log('formatter ',this);
                                
                                let positiveNum=this.y
                                if (positiveNum<0) {
                                    positiveNum=this.y*(-1)
                                }
                                return (positiveNum*100/this.props.totalNumberOfReg).toFixed(2)+' %';
                            }
                        }
                    }
                },

                tooltip: {
                    formatter: function () {
                        return 'Registered between ' + this.point.category + ' : <b>'+totalNumber[this.point.index]+'</b><br/>' +
                        counterpart.translate('HistogramVoterProfile.totalNumber')+ '<b>' +this.props.totalNumberOfReg+'</b>'
                            ;
                            
                    }
                },

                series: [{
                    name: counterpart.translate('HistogramVoterProfile.registered'),
                    data: this.props.malefemaleHistogram,
                    color:"#5d5d60"
                }/* , {
                    name: counterpart.translate('HistogramVoterProfile.Female'),
                    data: this.props.femaleHistogram,
                    color:"#d56147"
                } */]
            }
        });
    }  
        componentWillReceiveProps(nextProps) {
        console.log('sssssssssssssssssssssssssss',nextProps.maleFemaleHistogram);
        let categories = ['18-35', '36-40', '41-60', '+60'];
        let totalNumber =nextProps.maleFemaleHistogram
        this.setState({
            options:{
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(255, 255, 255, .6)'
                },
                title: {
                    text: nextProps.clickedShapeName+" -all ages"
                },
                credits:false,
                subtitle: {
                    text: 'Isie'
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                console.log('ffffffformat',this);
                                
                                let positiveNum=this.y
                                if (positiveNum<0) {
                                    positiveNum=this.y*(-1)
                                }
                                return (positiveNum*100/nextProps.totalNumberOfReg).toFixed(2)+' %';
                            }
                        }
                    }
                },

                tooltip: {
                    formatter: function () {
                        return 'Registered between ' + this.point.category + ' : <b>'+totalNumber[this.point.index]+'</b><br/>' +
                        counterpart.translate('HistogramVoterProfile.totalNumber')+ '<b>' +nextProps.totalNumberOfReg+'</b>'
                        ;
                            
                    }
                },

                series: [{
                    name: counterpart.translate('HistogramVoterProfile.registered'),
                    data: nextProps.maleFemaleHistogram,
                    color:"#5d5d60"
                }/* , {
                    name: counterpart.translate('HistogramVoterProfile.Female'),
                    data: nextProps.femaleHistogram,
                    color:"#d56147"
                } */]
            }
        });
    }  

        render() {
            return (
                <div style={{position:"absolute!important"}} >
                <HighchartInit  options={this.state.options} key={this.props.maleFemaleHistogram} styles={{height:"75vh"}}/>
                </div>
            );
        }
}

export default HistogramVoterProfile;