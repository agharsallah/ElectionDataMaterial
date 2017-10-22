import React, { Component } from 'react';
import Layout from './Layout' ;
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
                  <ul className="portfolio-filter brand-filter">
                      <li className="active waves-effect waves-light" data-group="all">All</li>
                      <li className="waves-effect waves-light" data-group="websites">Municipality election</li>
                      <li className="waves-effect waves-light" data-group="branding">Presidential election</li>
                      <li className="waves-effect waves-light" data-group="marketing">Parlamantary election</li>
                  </ul>

                  <div className="portfolio portfolio-with-title col-3 gutter mt-50">

                      <div className="portfolio-item" data-groups='["all", "websites"]'>
                          <div className="portfolio-wrapper">

                            <div className="thumb">
                                <div className="bg-overlay brand-overlay"></div>
                                <img src="./img/portfolio/portfolio-1.jpg" alt=""/>
                                
                                <div className="portfolio-intro">
                                  <div className="action-btn">
                                    <a href="./img/portfolio/portfolio-1.jpg" className="tt-lightbox" title="iOS Game Design"> <i className="fa fa-search"></i></a>
                                  </div>
                                </div>
                            </div>{/* thumb */}

                            <div className="portfolio-title">
                                <h2 ><a href="#">Municipal election data</a></h2>
                                <p><a href="#">Bringing the Registration Data into life and visualize them ontop of maps and other charts</a> </p>
                            </div>

                          </div>{/* /.portfolio-wrapper */}
                      </div>{/* /.portfolio-item */}

                      <div className="portfolio-item" data-groups='["all", "branding"]'> 
                        <div className="portfolio-wrapper">
                          <div className="thumb">
                              <div className="bg-overlay brand-overlay"></div>
                              <img src="./img/portfolio/portfolio-2.jpg" alt=""/>

                              <div className="portfolio-intro">
                                <div className="action-btn">
                                    <a href="./img/portfolio/portfolio-2.jpg" className="tt-lightbox" title=""> <i className="fa fa-search"></i></a>
                                </div>
                              </div>
                          </div>
                          <div className="portfolio-title">
                              <h2><a href="#">Presidential election Data</a></h2>
                              <p><a href="#">Viz description here</a> </p>
                          </div>

                        </div>{/* /.portfolio-wrapper */}
                      </div>{/* /.portfolio-item */}

                      <div className="portfolio-item" data-groups='["all", "marketing"]'>

                        <div className="portfolio-wrapper">
                          <div className="thumb">
                              <div className="bg-overlay brand-overlay"></div>
                              <img src="./img/portfolio/portfolio-3.jpg" alt=""/>

                              <div className="portfolio-intro">
                                <div className="action-btn">
                                    <a href="./img/portfolio/portfolio-3.jpg" className="tt-lightbox" title=""> <i className="fa fa-search"></i></a>
                                </div>
                              </div>
                          </div>
                          <div className="portfolio-title">
                              <h2><a href="#">Parlamantary election data</a></h2>
                              <p><a href="#">Viz description here</a> </p>
                          </div>

                        </div>{/* /.portfolio-wrapper */}
                      </div>{/* /.portfolio-item */}

                  </div>{/* /.portfolio */}

              </div>{/* portfolio-container */}

            </div>{/* /.container */}
        </section>
      </div>
    );
  }
}

export default Home;