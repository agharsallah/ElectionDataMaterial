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

                    <div className="row"><h2 className="section-title" style={{marginTop: '20vh'}}>Municipal Data</h2></div>
                    <div className='row bg-parallax'   >
                        <div className="col-md-4 hover-box">
                            <VizBox slide='mun' vizLink='/munre' title='Municipal insights' desc='' imgLink='./img/home/regInsight.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/detailed-reg' title='Municipal registration ' desc='' imgLink='./img/home/reg.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/reg-performance' title='Municipal registration performance' desc='' imgLink='./img/home/regPerformance.jpg' />
                        </div>
                    </div>

                    <div className="row"><h2 className="section-title" style={{marginTop: '30vh'}}>Election Data </h2></div>
                    <div className='row bg-parallax'  >
                        <div className="col-md-4 hover-box">
                            <VizBox slide="data" vizLink='invalid' title='Invalid ballot' desc='' imgLink='./img/home/invalid.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/turnout' title='Turnout' desc='' imgLink='./img/home/turnout.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                        <VizBox vizLink='/socio' title='Socio Election Map' desc='' imgLink='./img/home/socio.jpg' />
                    </div>

                    </div>
                    <div className="row"><h2 className="section-title" style={{marginTop: '15vh'}}>Election Result</h2></div>
                    <div className='row bg-parallax' style={{ marginBottom: '7vh' }} >
                        <div className="col-md-4 hover-box">
                            <VizBox  vizLink='/result/2011/index.html' title='NCA Results 2011' desc='' imgLink='./img/home/result2011.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/result/2014/demos/Maps_Bubble/Elections2014.html' title='Parliamentary 2014' desc='' imgLink='./img/home/result2014.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/result/2014/demos/Maps_Bubble/Elections2014.html' title='Presidential 2014 ' desc='' imgLink='./img/home/prez.jpg' />
                        </div>
                    </div>

                    <div className='row bg-parallax' style={{ marginBottom: '20vh' }}>
                        
                        <div className="col-md-4 col-md-offset-2 hover-box">
                            <VizBox slide="result" vizLink='/full' title='Full Results' desc='data per voting center' imgLink='./img/archive/full_prez.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/archive' title='Archive' desc='' imgLink='./img/archive/arch.jpg' />
                        </div>
                    </div>

                    <div className="row">
                    <h2 className="section-title col-md-4" >other Viz</h2>
                    <h2 className="section-title col-md-4" >Webradar</h2>
                    <h2 className="section-title col-md-4" >About</h2>
                    </div>
                        <div className='row ' style={{marginBottom: '15vh'}}  >
                        
                        <div className="col-md-4  hover-box">
                            <VizBox vizLink='/viz' title=' ' desc='' imgLink='./img/home/viz.jpg' />
                        </div>
                        
                        <div className="col-md-4  hover-box">
                            <VizBox vizLink='/webradar/index.html' title=' ' desc='' imgLink='./img/home/webradar.PNG' />
                        </div>
                        
                        <div className="col-md-4  hover-box">
                            <VizBox vizLink='/about' title=' ' desc='' imgLink='./img/home/about.jpg' />
                        </div>

                        </div>


                </div>{/* portfolio-container*/}
            </div>
        );
    }
}

export default BoxFilter;