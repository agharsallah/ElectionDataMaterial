import React, { Component } from 'react';
import Layout from '../Layout' ;
import VizBox from './VizBox' ;
import {Helmet} from "react-helmet";
class Home extends Component {
  render() {
    return (
      <div>      
      <Helmet>
      <script src="./materialize/js/materialize.min.js"></script>
      <script src="./js/scripts.js"></script>
      </Helmet>    
      <Layout home="active" mun17="" parl14="" pres14="" contact="" layoutShape="transparent-header" typoColor="light"/>      
        <section className="banner-light parallax-bg bg-fixed overlay  fullscreen-banner valign-wrapper" data-stellar-background-ratio="0.5">
            <div className="valign-cell">
            <div className="container padding-top-110">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="intro-title text-uppercase white-text mb-30" >Election Data</h1>
                        <p className="lead text-regular white-text">Bringing all election data in one place.</p>
                    </div>{/* col-md-6 */}
                </div>{/* row */}
            </div>{/* /.container */}
            </div>{/* /.valign-cell */}
        </section>
        <section className="section-padding">
            <div className="container">

              <div className="text-center mb-50">
                  <h2 className="section-title text-uppercase">visualization</h2>
                  <p className="section-sub">Check out all our visualization</p>
              </div>

              <div className="portfolio-container text-center">

                <div className="portfolio portfolio-with-title col-3 gutter mt-50">
                    <VizBox vizLink='/munre' title='title here' desc='desc here' imgLink='./img/home/regInsight.jpg' />
                    <VizBox vizLink='/detailed-reg' title='Municipal registration ' desc='desc here' imgLink='./img/home/reg.jpg' />
                    <VizBox vizLink='/reg-performance' title='Municipal registration performance' desc='desc here' imgLink='./img/home/regPerformance.jpg' />
                </div>{/* /.portfolio */}

                <div className="portfolio portfolio-with-title col-3 gutter mt-50">
                    <VizBox vizLink='invalid' title='Invalid ballot' desc='desc here' imgLink='./img/home/invalid.jpg' />
                    <VizBox vizLink='/turnout' title='Turnout' desc='desc here' imgLink='./img/home/turnout.jpg' />
                </div>{/* /.portfolio */}
              </div>{/* portfolio-container */}

            </div>{/* /.container */}
        </section>
      </div>
    );
  }
}

export default Home;