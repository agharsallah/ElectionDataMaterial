import React, { Component } from 'react';
import LayoutHome from '../LayoutHome';
import BoxFilter from './BoxFilter';
import { Helmet } from "react-helmet";
class Home extends Component {
  smooth(a) {
    $('html, body').animate({
      scrollTop: a,
    }, 'slow');


    return false;
  }
  render() {
    return (
      <div>
        <Helmet>
          <script src="./js/scripts.js"></script>
        </Helmet>
        <LayoutHome home="active" mun17="" parl14="" pres14="" contact="" layoutShape="transparent-header" typoColor="light" />
        <section >
          <div className="container-fluid" style={{ padding: 0 }} >
            <h2>Carousel Example</h2>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
                <li data-target="#myCarousel" data-slide-to="3"></li>
                <li data-target="#myCarousel" data-slide-to="4"></li>
              </ol>

              <div className="carousel-inner">

                <div style={{ maxHeight: '90vh' }} className="item active">
                  <img src="/img/tun.jpg" alt="TUNISIA ELECTION DATA" style={{ width: '100%'}} />
                  <div className="carousel-caption carousel-text">
                    <h3>TUNISIA ELECTION DATA</h3>
                    <p>Bringing Data to People !</p>
                  </div>
                </div>

                <div style={{ maxHeight: '90vh' }} onClick={this.smooth.bind(this, '750vh')} className="item">
                  <img src="/img/home/mun.jpg" alt="ELECTION DATA" style={{ width: '100%' , opacity: '0.7' }} />
                  <div className="carousel-caption carousel-text">
                    <h3>MUNICIPAL DATA</h3>
                    {/* <p>Democracy without morality is impossible</p> */}
                  </div>
                </div>

                <div style={{ maxHeight: '90vh' }} onClick={this.smooth.bind(this, '1140vh')} className="item">
                  <img src="/img/home/elct_data.jpg" alt="Chicago" style={{ width: '100%' , opacity: '1' }} />
                  <div className="carousel-caption carousel-text">
                    <h3>ELECTION DATA</h3>
                    {/* <p>A Robust Democracy Requires Active Participation</p> */}
                  </div>
                </div>

                <div style={{ maxHeight: '90vh' }} onClick={this.smooth.bind(this, '1920vh')} className="item">
                  <img src="/img/home/elct_res.jpg" alt="ELECTION RESULT" style={{ width: '100%', opacity: '0.7' }} />
                  <div className="carousel-caption carousel-text">
                    <h3>ELECTION RESULT</h3>
                    {/* <p>It's not the voting that's Democracy, it's the Counting</p> */}
                  </div>
                </div>

                <div style={{ maxHeight: '90vh' }} onClick={this.smooth.bind(this, '4000vh')} className="item">
                  <img src="/img/home/mourabba.png" alt="WEBRADAR" style={{ width: '100%' }} />
                  <div className="carousel-caption carousel-text">
                    <h3>WEBRADAR</h3>
                    <p>Media Monitoring & Analytics</p>
                  </div>
                </div>
              </div>

              <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </section>
        <section style={{ paddingTop: "2vh" }}>
          <div className="container" >

            <BoxFilter />

          </div>{/* /.container */}
        </section>
      </div>
    );
  }
}

export default Home;