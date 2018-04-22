import React, { Component } from 'react';
import HighchartInit from '../HighchartInit';
import counterpart from 'counterpart' ;

export default class PartyRankingBar extends Component {
    constructor(props){
      super(props);
      this.state={option:{}}
    }

    
    componentWillMount() {
        var listsData;
        counterpart.getLocale()=='ar'? 
        listsData = [{y:350,name:'حركة النهضة',name_fr:'Al nahdha'},{y:345,name:'حركة نداء تونس',name_fr:'Nida\' tounes'},{y:69,name:'حزب التيار الديمقراطي',name_fr:'Al tayar al dimokrati'},{y:67,name:'حزب حركة مشروع تونس',name_fr:'Harakat machrou\' tounes'},{y:46,name:'حزب حراك تونس الارادة',name_fr:'Hirak tounes al irada'},{y:43,name:'حزب أفاق تونس',name_fr:'Afak tounes'},{y:40,name:'حزب حركة الشعب',name_fr:'Harakat al chaab'},{y:31,name:'الحزب الدستوري الحر',name_fr:'Al hezb al dostouri Al horr'},{y:15,name:'حزب البناء الوطني',name_fr:'Hezb al bina\' alwatani'},{y:12,name:'الحزب الاشتراكي',name_fr:'Al hizb Al ichtiraki'},{y:9,name:'حزب بني وطني',name_fr:'Hizb bani watani'},{y:7,name:'حزب المبادرة',name_fr:'Hizb Al moubadra'},{y:6,name:'حزب الاتحاد الشعبي الجمهوري',name_fr:'Hizb al itihad al chaabi al jomhouri'},{y:3,name:'حزب اللقاء الديمقراطي',name_fr:'Hizb al lika\' al dimokrati'},{y:2,name:'حزب صوت التونسي',name_fr:'Hizb sawt al tounsi'},{y:2,name:'حزب تنظيم الأجيال',name_fr:'Hizb tandhim al ajyel'},{y:1,name:'حزب الخضر للتقدم',name_fr:'Hizb al khothr lel takadom'},{y:1,name:'حزب المستقبل',name_fr:'Hizb almostakbal'},{y:1,name:'حزب حركة الديمقراطيين الاجتماعين',name_fr:'Hizb harakat al dimokratiyin al ijtima\'yin'},{y:1,name:'حزب حركة تونس أولا',name_fr:'Hizb harakat tounes awalan'},{y:1,name:'حزب الحركة الديمقراطية',name_fr:'Hizb al haraka al dimokratiya'},{y:1,name:'حزب النضال الوطني',name_fr:'Hizb al nidhal al watani'}]
        :listsData= [{y:350,name_ar:'حركة النهضة',name:'Al nahdha'},{y:345,name_ar:'حركة نداء تونس',name:'Nida\' tounes'},{y:69,name_ar:'حزب التيار الديمقراطي',name:'Al tayar al dimokrati'},{y:67,name_ar:'حزب حركة مشروع تونس',name:'Harakat machrou\' tounes'},{y:46,name_ar:'حزب حراك تونس الارادة',name:'Hirak tounes al irada'},{y:43,name_ar:'حزب أفاق تونس',name:'Afak tounes'},{y:40,name_ar:'حزب حركة الشعب',name:'Harakat al chaab'},{y:31,name_ar:'الحزب الدستوري الحر',name:'Al hezb al dostouri Al horr'},{y:15,name_ar:'حزب البناء الوطني',name:'Hezb al bina\' alwatani'},{y:12,name_ar:'الحزب الاشتراكي',name:'Al hizb Al ichtiraki'},{y:9,name_ar:'حزب بني وطني',name:'Hizb bani watani'},{y:7,name_ar:'حزب المبادرة',name:'Hizb Al moubadra'},{y:6,name_ar:'حزب الاتحاد الشعبي الجمهوري',name:'Hizb al itihad al chaabi al jomhouri'},{y:3,name_ar:'حزب اللقاء الديمقراطي',name:'Hizb al lika\' al dimokrati'},{y:2,name_ar:'حزب صوت التونسي',name:'Hizb sawt al tounsi'},{y:2,name_ar:'حزب تنظيم الأجيال',name:'Hizb tandhim al ajyel'},{y:1,name_ar:'حزب الخضر للتقدم',name:'Hizb al khothr lel takadom'},{y:1,name_ar:'حزب المستقبل',name:'Hizb almostakbal'},{y:1,name_ar:'حزب حركة الديمقراطيين الاجتماعين',name:'Hizb harakat al dimokratiyin al ijtima\'yin'},{y:1,name_ar:'حزب حركة تونس أولا',name:'Hizb harakat tounes awalan'},{y:1,name_ar:'حزب الحركة الديمقراطية',name:'Hizb al haraka al dimokratiya'},{y:1,name_ar:'حزب النضال الوطني',name:'Hizb al nidhal al watani'}]
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
                    categories:[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ],
                    step:1,
                    title: {
                        text:counterpart.translate('listsOverview.parties')
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
                        text: counterpart.translate('listsOverview.listNum')
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
