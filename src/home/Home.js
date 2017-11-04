import React, { Component } from 'react';
import Layout from '../Layout' ;
import BoxFilter from './BoxFilter' ;
import {Helmet} from "react-helmet";
class Home extends Component {
  render() {
    return (
      <div>      
      <Helmet>
      <script src="./js/scripts.js"></script>
      </Helmet>    
      <Layout home="active" mun17="" parl14="" pres14="" contact="" layoutShape="transparent-header" typoColor="light"/>      
        <section className="banner-tn parallax-bg bg-fixed overlay   valign-wrapper" style={{height:'400px'}}>
            <div className="valign-cell">
            <div className="container padding-top-110">
                <div className="row">
                <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <h1 className="intro-title text-uppercase white-text mb-30" style={{color:"white"}} >Election Data</h1>
                        <p className="lead text-regular white-text" style={{color:"white"}}>Bringing all election data in one place.</p>
                    </div>{/* col-md-6 */}
                </div>{/* row */}
            </div>{/* /.container */}
            </div>{/* /.valign-cell */}
        </section>
        <section style={{paddingTop:"5vh"}}>
            <div className="container">

              <div className="text-center mb-50">
                  <h2 className="section-title text-uppercase">visualizations</h2>
                  <p className="section-sub">Check out all our visualization</p>
              </div>
            
              <BoxFilter/>
    
            </div>{/* /.container */}
        </section>
      </div>
    );
  }
}

export default Home;