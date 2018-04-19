import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import './index.css'
import Translate from 'react-translate-component';

export default class ListsDistributionSlider extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: 2,
            munNum: 6
        }
    }

    handleChange = value => {
        var data = [{ listPerMun: 2, MunNum: 6 }, { listPerMun: 3, MunNum: 44 }, { listPerMun: 4, MunNum: 54 }, { listPerMun: 5, MunNum: 68 }, { listPerMun: 6, MunNum: 60 }, { listPerMun: 7, MunNum: 41 }, { listPerMun: 8, MunNum: 29 }, { listPerMun: 9, MunNum: 22 }, { listPerMun: 10, MunNum: 8 }, { listPerMun: 11, MunNum: 11 }, { listPerMun: 12, MunNum: 3 }, { listPerMun: 13, MunNum: 2 }, { listPerMun: 14, MunNum: 2 }]
        let searchRes = data.find(o => o.listPerMun == value);
        console.log(searchRes);
        this.setState({
            value: value,
            munNum: searchRes.MunNum
        })
    }

    render() {
        const barChart = <Translate type='text' content='listsOverview.barChart' />//Bar Chart
        const consigne = <Translate type='text' content='listsOverview.consigne' />//Move the slider to discover the 
        const consigne2 = <Translate type='text' content='listsOverview.consigne2' />//<b>distribution</b> 
        const consigne3 = <Translate type='text' content='listsOverview.consigne3' />//of candidates Lists in municipalities.
        const exist = <Translate type='text' content='listsOverview.exist' />//there exists
        const have = <Translate type='text' content='listsOverview.have' />//'That have
        const mun = <Translate type='text' content='listsOverview.mun' />//'municipalities',
        const lists = <Translate type='text' content='listsOverview.lists' />//'lists',

        const formatLabel = value => value + ' lists'

        return (
            <div style={{ marginTop: '5vh' }}>
                <h4>{consigne}<b>{consigne2}</b>{consigne3}</h4>

                <div className='slider custom-labels' style={{ marginTop: '5vh' }}>
                    <Slider
                        min={2}
                        max={14}
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        format={formatLabel}
                        handleLabel={(this.state.value).toString()}

                    />
                </div>
                <p className='heading-mun-number'>{exist}<br />
                    <span style={{marginLeft:'-10%'}} > <p className='em-mun-num'>{this.state.munNum}  </p> <p className='midlleHigh'>{mun}</p>  </span>
                    <br /> {have} <br />
                    <span style={{marginLeft:'-10%'}}>   <p className='em-mun-num'>{this.state.value}</p> <p className='midlleHigh'>{lists}</p></span>  </p>
            </div>
        );
    }
}
