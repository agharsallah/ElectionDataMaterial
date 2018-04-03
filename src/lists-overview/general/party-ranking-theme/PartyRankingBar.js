import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
export default class PartyRankingBar extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }

    
    componentWillMount() {
        var listsData = [{y:350,name_ar:'حركة النهضة',name:'Al nahdha'},{y:345,name_ar:'حركة نداء تونس',name:'Nida\' tounes'},{y:69,name_ar:'حزب التيار الديمقراطي',name:'Al tayar al dimokrati'},{y:67,name_ar:'حزب حركة مشروع تونس',name:'Harakat machrou\' tounes'},{y:46,name_ar:'حزب حراك تونس الارادة',name:'Hirak tounes al irada'},{y:43,name_ar:'حزب أفاق تونس',name:'Afak tounes'},{y:40,name_ar:'حزب حركة الشعب',name:'Harakat al chaab'},{y:31,name_ar:'الحزب الدستوري الحر',name:'Al hezb al dostouri Al horr'},{y:15,name_ar:'حزب البناء الوطني',name:'Hezb al bina\' alwatani'},{y:12,name_ar:'الحزب الاشتراكي',name:'Al hizb Al ichtiraki'},{y:9,name_ar:'حزب بني وطني',name:'Hizb bani watani'},{y:7,name_ar:'حزب المبادرة',name:'Hizb Al moubadra'},{y:6,name_ar:'حزب الاتحاد الشعبي الجمهوري',name:'Hizb al itihad al chaabi al jomhouri'},{y:3,name_ar:'حزب اللقاء الديمقراطي',name:'Hizb al lika\' al dimokrati'},{y:2,name_ar:'حزب صوت التونسي',name:'Hizb sawt al tounsi'},{y:2,name_ar:'حزب تنظيم الأجيال',name:'Hizb tandhim al ajyel'},{y:1,name_ar:'حزب الخضر للتقدم',name:'Hizb al khothr lel takadom'},{y:1,name_ar:'حزب المستقبل',name:'Hizb almostakbal'},{y:1,name_ar:'حزب حركة الديمقراطيين الاجتماعين',name:'Hizb harakat al dimokratiyin al ijtima\'yin'},{y:1,name_ar:'حزب حركة تونس أولا',name:'Hizb harakat tounes awalan'},{y:1,name_ar:'حزب الحركة الديمقراطية',name:'Hizb al haraka al dimokratiya'},{y:1,name_ar:'حزب النضال الوطني',name:'Hizb al nidhal al watani'}]
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
                    categories:[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ],
                    step:1,
                    title: {
                        text: 'Parties'
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
                        text: 'Number of lists'
                    }
                },

                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.name}: </b> {point.y} list ',
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
                        formatter: function() {/* console.log(this); */ return (( (this.y)*100) / 350).toFixed(1) + ' %'},
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
            <div style={{marginTop:'2vh'}}>
            <HighchartInit options={this.state.options} />
               
            </div>
        );
    }
}
