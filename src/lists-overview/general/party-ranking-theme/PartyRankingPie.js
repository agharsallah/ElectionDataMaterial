import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
export default class PartyRankingPie extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }
    
    componentWillMount() {
        var listsData = [{y:350,name_ar:'حركة النهضة',name:'Al nahdha'},{y:345,name_ar:'حركة نداء تونس',name:'Nida\' tounes'},{y:69,name_ar:'حزب التيار الديمقراطي',name:'Al tayar al dimokrati'},{y:67,name_ar:'حزب حركة مشروع تونس',name:'Harakat machrou\' tounes'},{y:46,name_ar:'حزب حراك تونس الارادة',name:'Hirak tounes al irada'},{y:43,name_ar:'حزب أفاق تونس',name:'Afak tounes'},{y:40,name_ar:'حزب حركة الشعب',name:'Harakat al chaab'},{y:31,name_ar:'الحزب الدستوري الحر',name:'Al hezb al dostouri Al horr'},{y:15,name_ar:'حزب البناء الوطني',name:'Hezb al bina\' alwatani'},{y:12,name_ar:'الحزب الاشتراكي',name:'Al hizb Al ichtiraki'},{y:9,name_ar:'حزب بني وطني',name:'Hizb bani watani'},{y:7,name_ar:'حزب المبادرة',name:'Hizb Al moubadra'},{y:6,name_ar:'حزب الاتحاد الشعبي الجمهوري',name:'Hizb al itihad al chaabi al jomhouri'},{y:3,name_ar:'حزب اللقاء الديمقراطي',name:'Hizb al lika\' al dimokrati'},{y:2,name_ar:'حزب صوت التونسي',name:'Hizb sawt al tounsi'},{y:2,name_ar:'حزب تنظيم الأجيال',name:'Hizb tandhim al ajyel'},{y:1,name_ar:'حزب الخضر للتقدم',name:'Hizb al khothr lel takadom'},{y:1,name_ar:'حزب المستقبل',name:'Hizb almostakbal'},{y:1,name_ar:'حزب حركة الديمقراطيين الاجتماعين',name:'Hizb harakat al dimokratiyin al ijtima\'yin'},{y:1,name_ar:'حزب حركة تونس أولا',name:'Hizb harakat tounes awalan'},{y:1,name_ar:'حزب الحركة الديمقراطية',name:'Hizb al haraka al dimokratiya'},{y:1,name_ar:'حزب النضال الوطني',name:'Hizb al nidhal al watani'}]
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
                    text: '03-03-2018'
                },
                tooltip: {
                    headerFormat: '<h3>{point.key}: </h3>',
                    pointFormat: '<b>{point.y}</b> %',
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function() {/* console.log(this); */ return (( (this.y)*100) / 350).toFixed(1) + ' %'},

                           // format: ' <p class="HighchartLabel">{point.y} candidates</p>'
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
