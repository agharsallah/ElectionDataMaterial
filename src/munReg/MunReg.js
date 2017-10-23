import React, { Component } from 'react';
import Layout from '../Layout' ;
import {Link,NavLink,Route } from 'react-router-dom';
import {Helmet} from "react-helmet";

import MunMap from './MunMap' ;
import DataRectangle from './DataRectangle' ;
import HistogramVoterProfile from './HistogramVoterProfile' ;

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
        //contains maleHistogram  femaleHistogram mapClicked ...
        this.setState(data);
    }
    sendRectangleDataBack(recData){
        console.log("rectangle data",recData);
        this.setState(recData)
    }
    render() {
        let population=(this.state.population)
        return (
            <div>
            <Helmet>
            <script src="../../js/scripts.js"></script>
            </Helmet>             
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
                
                {/* Tab to Choose the level of the map  */}
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
                                                <MunMap 
                                                    chosenNiveau={this.state.chosenNiveau}
                                                    sendHistoDataBack={this.sendHistoDataBack.bind(this)} 
                                                    chosenGov={this.props.match.url} 
                                                    sendRectangleDataBack={this.sendRectangleDataBack.bind(this)}
                                                />
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
                                    
                <section >
                    <DataRectangle
                        population={population}
                        area={this.state.area}
                        chairs={this.state.chairs}
                        munNumber={this.state.munNumber}
                    />
                </section>

            </div>
        );
    }
}

export default MunReg;