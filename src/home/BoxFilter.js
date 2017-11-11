import React, { Component } from 'react';
import VizBox from './VizBox';

class BoxFilter extends Component {
    constructor(props) {
        super(props);
        //active ,nonActive for the li so that it shows the buttons active or not
        this.state = {
            Municipal: 'active'
            , Data: ''
            , Result: ''
            , Webradar: ''
            , All: ''

        }
        this.showCategory = this.showCategory.bind(this)
    }
    showCategory(e) {
        let target = e.target.dataset.group
        if (target == 'All') { this.setState({ All: 'active', Data: '', Result: '', Webradar: '', Municipal: '' }); } else
            if (target == 'Data') { this.setState({ Data: 'active', All: '', Result: '', Webradar: '', Municipal: '' }); } else
                if (target == 'Result') { this.setState({ Result: 'active', Data: '', All: '', Webradar: '', Municipal: '' }); } else
                    if (target == 'Webradar') { this.setState({ Webradar: 'active', Data: '', Result: '', All: '', Municipal: '' }); } else
                    { this.setState({ Municipal: 'active', Data: '', Result: '', Webradar: '', All: '' }); }
    }
    render() {

        return (

            <div>
                <div className='container  text-center' >
                    <div className="row"><h2 className="section-title">Municipal Data</h2></div>
                    <div className='row bg-parallax'   >
                        <div className="col-md-4 hover-box">
                            <VizBox slide='mun' vizLink='/munre' title='Municipal insights' desc='desc here' imgLink='./img/home/regInsight.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/detailed-reg' title='Municipal registration ' desc='desc here' imgLink='./img/home/reg.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/reg-performance' title='Municipal registration performance' desc='desc here' imgLink='./img/home/regPerformance.jpg' />
                        </div>
                    </div>
                    <div className="row"><h2 className="section-title">Election Data </h2></div>
                    <div className='row bg-parallax'  >
                        <div className="col-md-4 hover-box">
                            <VizBox slide="data" vizLink='invalid' title='Invalid ballot' desc='desc here' imgLink='./img/home/invalid.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/turnout' title='Turnout' desc='desc here' imgLink='./img/home/turnout.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                        <VizBox vizLink='/socio' title='Socio Election Map' desc='desc here' imgLink='./img/home/socio.jpg' />
                    </div>

                    </div>
                    <div className="row"><h2 className="section-title">Election Result</h2></div>
                    <div className='row bg-parallax' style={{ marginBottom: '7vh' }} >
                        <div className="col-md-4 hover-box">
                            <VizBox  vizLink='/result/2011/index.html' title='Parliamentary Results 2011' desc='desc here' imgLink='./img/home/result2011.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/result/2014/demos/Maps_Bubble/Elections2014.html' title='Parliamentary 2014' desc='desc here' imgLink='./img/home/result2014.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/result/2014/demos/Maps_Bubble/Elections2014.html' title='Presidential 2014 ' desc='desc here' imgLink='./img/home/prez.jpg' />
                        </div>

                    </div>
                    <div className='row bg-parallax' style={{ marginBottom: '7vh' }}>
                        
                        <div className="col-md-4 col-md-offset-2 hover-box">
                            <VizBox slide="result" vizLink='/full' title='Full Results' desc='data per voting center' imgLink='./img/archive/full_prez.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/archive' title='Archive' desc='desc here' imgLink='./img/archive/arch.jpg' />
                        </div>


                    </div>
                    <div className="row"><h2 className="section-title">Webradar</h2></div>
                    <div className='row bg-parallax' style={{marginBottom: '5vh'}}  >

                        <div className="col-md-4 col-md-offset-4 hover-box">
                            <VizBox vizLink='/webradar/index.html' title='Presentation ' desc='desc here' imgLink='./img/home/webradar.PNG' />
                        </div>

                    </div>


                </div>{/* portfolio-container*/}
            </div>
        );
    }
}

export default BoxFilter;