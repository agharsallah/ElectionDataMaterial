import React, { Component } from 'react';
import Layout from './Layout' ;
import {Link,NavLink,Route } from 'react-router-dom';

import MunMap from './MunReg/MunMap' ;
import HistogramVoterProfile from './MunReg/HistogramVoterProfile' ;

class MunReg extends Component {

    constructor(props){
      super(props);
      this.state={
          chosenNiveau:'gov',
        }
    }
    
    chosenNiveau(event){
        this.setState({chosenNiveau:event.currentTarget.dataset.id});
    }
    sendHistoDataBack(data){
        console.log('histo data',data);
        this.setState(data);
    }

    render() {
        return (
            <div>
                <Layout home="" mun17="active" parl14="" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>
                <section className="page-title ptb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Municipal Election registration data </h2>
                                <ol className="breadcrumb">
                                    <li><Link to="/">Home</Link></li>
                                    <li ><Link to="/munre">Municipal Registration 2017</Link></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section >
                <div className="container-fluid">   
                    <div className="counter-section ">
                        <div className="row text-center">
                            <div className="col-sm-3">
                                <div className="color-box blue-grad">
                                <h2><span className="timer">570</span>K</h2>
                                <span className="count-desc">Population</span>
                                </div>
                            </div> {/* /.col-sm-3 */}
    
                            <div className="col-sm-3">
                            <div className="color-box pink-grad">
                                <h2><span className="timer">350</span>+</h2>
                                <span className="count-desc">Chair</span>
                            </div>
                            </div>{/* /.col-sm-3 */}
    
                            <div className="col-sm-3">
                            <div className="color-box green-grad">
                                <h2><span className="timer">6.71</span> Km²</h2>
                                <span className="count-desc">Area</span>
                            </div>
                            </div>{/* /.col-sm-3 */}
    
                            <div className="col-sm-3">
                            <div className="color-box purple-grad">
                                <h2><span className="timer">20</span></h2>
                                <span className="count-desc">Municipality</span>
                            </div>
                            </div>{/* /.col-sm-3 */}
                        </div>
                    </div>
                </div>
            </section>
                <section >
                    <div className="border-bottom-tab" style={{padding:'20px 5px'}} >
                    <ul className="nav nav-tabs" role="tablist">
                    <li  data-id="gov" className="active" onClick={this.chosenNiveau.bind(this)}><a href="#tab-2" role="tab" className="waves-effect waves-dark" data-toggle="tab">Governorate</a></li>
                    <li data-id="mun" onClick={this.chosenNiveau.bind(this)}><a href="#tab-3" role="tab" className="waves-effect waves-dark" data-toggle="tab">Municipality</a></li>
{/*                 <li data-id="vc" onClick={this.chosenNiveau.bind(this)}><a href="#tab-4" role="tab" className="waves-effect waves-dark" data-toggle="tab">Voting center</a></li> */}                  </ul> 
                    </div>
                </section>
                <section className="latest-news-card " style={{padding:'10px 0'}}>
                    <div className="container-fluid">
                        <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-6 blog-grid-item mb-30">
                                    <article className="card">
                                            <div style={{textAlign:"center"}}>
                                                <h3 className=" activator">Click on the shape</h3>
                                            </div>
                                            <div className=" waves-effect waves-block waves-light">
                                                <MunMap chosenNiveau={this.state.chosenNiveau} sendHistoDataBack={this.sendHistoDataBack.bind(this)} chosenGov={this.props.match.url} />
                                            </div>

                                    </article>{/* /.card */}
                                </div>{/* /.col-md-6 */}

                                <div className="col-xs-12 col-sm-6 col-md-6 blog-grid-item mb-30">
                                    <article className="card">

                                    <div className="card-image waves-effect waves-block waves-light">
                                    
                                    <HistogramVoterProfile
                                        maleHistogram={this.state.maleHistogram}
                                        femaleHistogram={this.state.femaleHistogram}
                                        mapClicked={this.state.mapClicked}
                                        clickedShapeName={this.state.clickedShapeName}
                                        maleFemaleHistogram={this.state.maleFemaleHistogram}
                                        />  
                                    
                                    </div>
                                    </article>{/* /.card */}
                                </div>{/* /.col-md-6 */}
                            </div>{/* /.row */}
                        </div>{/* /.container */}
                    </section>

            </div>
        );
    }
}

export default MunReg;