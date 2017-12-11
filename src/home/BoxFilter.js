import React, { Component } from 'react';
import VizBox from './VizBox';
import VizBoxReact from './VizBoxReact';
import Translate from 'react-translate-component';

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
        /* Get The language variables from Locale */
        const sectionMunicipalData = <Translate content= 'home.sectionMunicipalData'/>//Municipal Data
        const sectionElectionData = <Translate content= 'home.sectionElectionData'/>//Election Data
        const sectionElectionResult = <Translate content= 'home.sectionElectionResult'/>//Election Result
        const sectionotherViz = <Translate content= 'home.sectionotherViz'/>//other Viz
        const sectionWebradar = <Translate content= 'home.sectionWebradar'/>//Webradar
        const sectionAbout = <Translate content= 'home.sectionAbout'/>//About

        const munDataTitle1 = <Translate content= 'home.munDataTitle1'/>//"Aministrative Structure
        const munDataTitle2 = <Translate content= 'home.munDataTitle2'/>//"Municipal Registration
        const munDataTitle3 = <Translate content= 'home.munDataTitle3'/>//Municipal Registration Performance

        const electDataTitle1 = <Translate content= 'home.electDataTitle1'/>//Invalid Ballot
        const electDataTitle2 = <Translate content= 'home.electDataTitle2'/>//Turnout
        const electDataTitle3 = <Translate content= 'home.electDataTitle3'/>//Socio Election Map

        const electResultData1 = <Translate content= 'home.electResultData1'/>//'NCA Results 2011'
        const electResultData2 = <Translate content= 'home.electResultData2'/>//'Parliamentary 2014'
        const electResultData3 = <Translate content= 'home.electResultData3'/>//'Presidential 2014 '        
        const electResultData4 = <Translate content= 'home.electResultData4'/>//'Full Results'
        const electResultData5 = <Translate content= 'home.electResultData5'/>//'Archive'
        
        return (

            <div>
                <div className='container  text-center' >

                    <div className="row"><h2 className="section-title" style={{marginTop: '20vh'}}>{sectionMunicipalData}</h2></div>
                    <div className='row bg-parallax'   >
                        <div className="col-md-4 hover-box">
                            <VizBoxReact slide='mun' vizLink='/munre' title={munDataTitle1} desc='' imgLink='./img/home/regInsight.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBoxReact vizLink='/detailed-reg' title={munDataTitle2} desc='' imgLink='./img/home/reg.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBoxReact vizLink='/reg-performance' title={munDataTitle3} desc='' imgLink='./img/home/regPerformance.jpg' />
                        </div>
                    </div>

                    <div className="row"><h2 className="section-title" style={{marginTop: '30vh'}}>{sectionElectionData} </h2></div>
                    <div className='row bg-parallax'  >
                        <div className="col-md-4 hover-box">
                            <VizBoxReact slide="data" vizLink='invalid' title={electDataTitle1} desc='' imgLink='./img/home/invalid.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBoxReact vizLink='/turnout' title={electDataTitle2} desc='' imgLink='./img/home/turnout.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                        <VizBoxReact vizLink='/socio' title={electDataTitle3} desc='' imgLink='./img/home/socio.jpg' />
                    </div>

                    </div>
                    <div className="row"><h2 className="section-title" style={{marginTop: '15vh'}}>{sectionElectionResult}</h2></div>
                    
                    <div className='row bg-parallax' style={{ marginBottom: '7vh' }} >
                        <div className="col-md-4 hover-box">
                            <VizBox  vizLink='/result/2011/index.html' title={electResultData1} desc='' imgLink='./img/home/result2011.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/result/2014/demos/Maps_Bubble/Elections2014.html' title={electResultData2} desc='' imgLink='./img/home/result2014.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='/result/2014/demos/Maps_Bubble/Elections2014.html' title={electResultData3} desc='' imgLink='./img/home/prez.jpg' />
                        </div>
                    </div>

                    <div className='row bg-parallax' style={{ marginBottom: '20vh' }}>
                        <div className="col-md-4 col-md-offset-2 hover-box">
                            <VizBoxReact slide="result" vizLink='/full' title={electResultData4} desc='data per voting center' imgLink='./img/archive/full_prez.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBoxReact vizLink='/archive' title={electResultData5} desc='' imgLink='./img/archive/arch.jpg' />
                        </div>
                    </div>

                    <div className="row">
                    <h2 className="section-title col-md-4" >{sectionotherViz}</h2>
                    <h2 className="section-title col-md-4" >{sectionWebradar}</h2>
                    <h2 className="section-title col-md-4" >{sectionAbout}</h2>
                    </div>
                        <div className='row ' style={{marginBottom: '15vh'}}  >
                        
                        <div className="col-md-4  hover-box">
                            <VizBoxReact vizLink='/viz' title=' ' desc='' imgLink='./img/home/viz.jpg' />
                        </div>
                        
                        <div className="col-md-4  hover-box">
                            <VizBox vizLink='/webradar/index.html' title=' ' desc='' imgLink='./img/home/webradar.PNG' />
                        </div>
                        
                        <div className="col-md-4  hover-box">
                            <VizBoxReact vizLink='/about' title=' ' desc='' imgLink='./img/home/about.jpg' />
                        </div>

                        </div>


                </div>{/* portfolio-container*/}
            </div>
        );
    }
}

export default BoxFilter;