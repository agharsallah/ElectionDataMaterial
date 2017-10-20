import React, { Component } from 'react';
import Layout from '../Layout' ;
import LineChart from './LineChart' ;
import BubbleChart from './BubbleChart' ;
import HeatMapCalendar from './HeatMapCalendar' ;
import config from '../config'
import axios from 'axios' ;
import regression from 'regression';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

import { connect } from "react-redux";
import { getPopValue } from "../actions/index";
import { bindActionCreators } from "redux";

class RegTrackLineRoot extends Component {
    constructor(props) {
        super(props);
        this.state={
            classMenu:"col-md-2", classCharts:"col-md-10", dates:[], inscription:[], update:[], detailedDays:[], increaseDecreaseReg:[], increaseDecreaseUpd:[],
            preRegressionInsc:[], preRegressionUpd:[], averageInsc:0, averageUpd:0, highestInsc:0, lowestInsc:0, highestUpd:0, lowestUpd:0,
            maleReg:0, femaleReg:0, sumReg:0, maleupdate:0, femaleupdate:0, sumupdate:0
        }
    }
    getDrawerState(value){
        value==true ?this.setState({classMenu:"col-md-3",classCharts:"col-md-9"}):this.setState({classMenu:"col-md-1",classCharts:"col-md-11"})
    }
    
    componentWillMount() {
         let qString=config.apiUrl+"/api/dailyins/line_daily reg_09-08";
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            console.log('we got data data frm db');
            //console.log(response.data.data);
            let inscription=[],update=[],dates=[],detailedDays=[],increaseDecreaseReg=[],increaseDecreaseUpd=[],
                preRegressionInsc=[],preRegressionUpd=[],datas=JSON.parse(response.data.data),
                averageInsc=0,averageUpd=0,highestInsc=7520,lowestInsc=7520,highestUpd=1265,lowestUpd=1265,
                maleReg=0, femaleReg=0, sumReg=0, maleupdate=0, femaleupdate=0, sumupdate=0
            datas.map((object,i)=>{
                dates.push(object.date)
                inscription.push(parseInt(object.inscription))
                update.push(parseInt(object.update))
                maleReg=object.maleReg; femaleReg=object.femaleReg; sumReg=object.sumReg; maleupdate=object.maleupdate; femaleupdate=object.femaleupdate; sumupdate=object.sumupdate
                //operation on days
                var str = object.date
                var weekday = new Array(7);
                if (str) {
                    //console.log(str);
                    var dat = str.split("-");
                    var datedtail = "20"+dat[2]+"-"+dat[1]+"-"+dat[0]
                    var dat2 = new Date(datedtail)
                    detailedDays.push(this.weekday(dat2.getDay()))
                }
                //operation for increase decrease
                i==0 ?increaseDecreaseReg.push(""):
                (parseInt(datas[i].inscription)>parseInt(datas[i-1].inscription) 
                ? increaseDecreaseReg.push( (((parseInt(datas[i].inscription)-parseInt(datas[i-1].inscription))*100)/parseInt(datas[i].inscription)).toFixed(2)+" % "+counterpart.translate('LineChart.increased')  )
                : increaseDecreaseReg.push( (((parseInt(datas[i-1].inscription)-parseInt(datas[i].inscription))*100)/parseInt(datas[i-1].inscription)).toFixed(2)+" % "+counterpart.translate('LineChart.decreased') )  
                )

                i==0 ?increaseDecreaseUpd.push(""):
                (parseInt(datas[i].update)>parseInt(datas[i-1].update) 
                ? increaseDecreaseUpd.push( (((parseInt(datas[i].update)-parseInt(datas[i-1].update))*100)/parseInt(datas[i].update)).toFixed(2)+" % "+counterpart.translate('LineChart.increased')  )
                : increaseDecreaseUpd.push( (((parseInt(datas[i-1].update)-parseInt(datas[i].update))*100)/parseInt(datas[i-1].update)).toFixed(2)+" % "+counterpart.translate('LineChart.decreased') )  
                )
                //operation for regression preparation
                preRegressionInsc.push([i,parseInt(object.inscription)])
                preRegressionUpd.push([i,parseInt(object.update)])
                // Operation for daily averaeg number
                /*console.log(parseInt(object.inscription));*/
               
                if (!isNaN ((object.inscription && object.update))) {
                    averageInsc+=parseInt(object.inscription)
                    averageUpd+=parseInt(object.update)
                }
                //determine the highest and lowest insc/update
                if (!isNaN ((object.inscription && object.update))) {
                    parseInt(object.inscription)>highestInsc ?highestInsc=parseInt(object.inscription):highestInsc=highestInsc
                    parseInt(object.inscription)<lowestInsc ?lowestInsc=parseInt(object.inscription):lowestInsc=lowestInsc
                    parseInt(object.update)>highestUpd ?highestUpd=parseInt(object.update):highestUpd=highestUpd
                    parseInt(object.update)<lowestUpd ?lowestUpd=parseInt(object.update):lowestUpd=lowestUpd
                }
            })
            console.log("averageInsc",averageInsc);
            averageInsc=(averageInsc/inscription.length).toFixed(0);
            averageUpd=(averageUpd/update.length).toFixed(0);
            dates.pop(); inscription.pop(); update.pop(); increaseDecreaseReg.pop(); increaseDecreaseUpd.pop(),preRegressionInsc.pop(),preRegressionUpd.pop()
            this.setState({dates,inscription,update,
                        maleReg, femaleReg, sumReg, maleupdate, femaleupdate, sumupdate, detailedDays,
                        increaseDecreaseReg, increaseDecreaseUpd,
                        preRegressionInsc, preRegressionUpd,
                        averageInsc ,averageUpd, highestInsc,  lowestInsc, highestUpd, lowestUpd});
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    weekday(val){
        switch (val) {
            case 0:
                return counterpart.translate('LineChart.Sunday')
            case 1:
                return counterpart.translate('LineChart.Monday')
            case 2:
                return counterpart.translate('LineChart.Tuesday')
            case 3:
                return counterpart.translate('LineChart.Wednesday')
            case 4:
                return counterpart.translate('LineChart.Thursday')
            case 5:
                return counterpart.translate('LineChart.Friday')
            case 6:
                return counterpart.translate('LineChart.Saturday')

        }
    }
    render() {

        let inscription,maleReg,femaleReg,sumReg,subj,increaseDecrease,preRegression,averageVal,highest,lowest;
        this.props.regUpdSelectField ==="registration" ?
        (   inscription=this.state.inscription,maleReg=this.state.maleReg,femaleReg=this.state.femaleReg,sumReg=this.state.sumReg,subj=counterpart.translate('LineChart.registration'),
            increaseDecrease=this.state.increaseDecreaseReg,
            preRegression=regression.linear(this.state.preRegressionInsc),
            averageVal=this.state.averageInsc,
            highest=this.state.highestInsc,lowest=this.state.lowestInsc
        )
          :
            ( inscription=this.state.update,maleReg=this.state.maleupdate,femaleReg=this.state.femaleupdate,sumReg=this.state.sumupdate,subj=counterpart.translate('LineChart.update'),
                increaseDecrease=this.state.increaseDecreaseUpd,preRegression=regression.linear(this.state.preRegressionUpd),
                averageVal=this.state.averageUpd,
                highest=this.state.highestUpd,lowest=this.state.lowestUpd
            )
        
        return (
            <div >
                <Helmet>
                    <script src="../../js/scripts.js"></script>
                </Helmet>  

                <Layout/>

                <section className="page-title ptb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 style={{marginTop:"5px"}}  >Registration Performance </h2>
                                <ol className="breadcrumb">
                                    <li><Link to="/">Home</Link></li>
                                    <li ><Link to="/reg-perfomance">Municipal Election 2017</Link></li>
                                    <li ><Link to="/reg-perfomance">Registration perfomance</Link></li>
                                    </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section>             
                <div className="col-md-12" style={{marginTop:"15rem"}} >
                {
                    this.props.stateFilter=="All" ? 
                    <div>
                        <LineChart
                            key={this.state.dates+inscription }
                            chartkey={this.state.classCharts}
                            dates={this.state.dates}
                            detailedDays={this.state.detailedDays}
                            inscription={inscription} 
                            maleReg={maleReg}
                            femaleReg={femaleReg}
                            sumReg={sumReg}
                            subj={subj}
                            increaseDecrease={increaseDecrease}
                            preRegression={preRegression}
                            averageVal={averageVal}
                            highest={highest}
                            lowest={lowest}
                        />
                    </div>
                :
                    (this.props.stateFilter=="Bubble" ? <BubbleChart/>
                        :
                        <HeatMapCalendar/>
                    )
                }
                </div>
                </section>
            </div>
        );
    }
}
function mapStateToProps(state) {

  console.log("youhoooo",state);
  return {
    stateFilter:state.stateFilter,
    regUpdSelectField:state.regUpdSelectField
  };
}
export default connect(mapStateToProps)(RegTrackLineRoot);
