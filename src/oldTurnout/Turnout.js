import React, { Component } from 'react';
import Layout from '../Layout' ;
import {Link,NavLink,Route } from 'react-router-dom';
import {Helmet} from "react-helmet";
import TurnoutMap from './TurnoutMap' ;
import BarChart from './BarChart' ;
class Turnout extends Component {

    constructor(props){
      super(props);
      this.state={
          chosenNiveau:'parl',
          hoveredProperty:{name:"aa"}
        }
    }
    
    chosenNiveau(event){
        this.setState({chosenNiveau:event.currentTarget.dataset.id});
    }
    getProperty(hoveredProperty){
        this.setState({hoveredProperty:hoveredProperty});
    }
    render() {
        let population=(this.state.population)
        return (
            <div>
            <Helmet>
            <script src="../../js/scripts.js"></script>
            </Helmet>             
                <Layout home="" mun17="" parl14="active" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>
                <section className="page-title ptb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2> Election Turnout </h2>
                                <ol className="breadcrumb">
                                <li><Link to="/">Last Elections</Link></li>
                                <li ><Link to="/munre">Turnout</Link></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Tab to Choose the level of the map  */}
                <section >
                    <div className="border-bottom-tab" style={{padding:'20px 5px'}} >
                    <ul className="nav nav-tabs" role="tablist">
                    <li data-id="parl" className="active" onClick={this.chosenNiveau.bind(this)}><a href="#tab-3" role="tab" className="waves-effect waves-dark" data-toggle="tab">Parlimentary 14</a></li>                    
                    <li  data-id="pres"  onClick={this.chosenNiveau.bind(this)}><a href="#tab-2" role="tab" className="waves-effect waves-dark" data-toggle="tab">Presidential 14</a></li>
{/*                 <li data-id="vc" onClick={this.chosenNiveau.bind(this)}><a href="#tab-4" role="tab" className="waves-effect waves-dark" data-toggle="tab">Voting center</a></li> */}                  </ul> 
                    </div>
                </section>
                
                <section className="latest-news-card " style={{padding:'10px 0'}}>
                    <div className="container-fluid">
                        <div className="row">
                                <div className="col-xs-12 col-sm-7 col-md-7 blog-grid-item mb-30">
                                    <article className="card">
                                            <div style={{textAlign:"center"}}>
                                                <h3 className=" activator">Click on a shape</h3>
                                            </div>
                                            <div className=" waves-effect waves-block waves-light">
                                                <TurnoutMap 
                                                    chosenNiveau={this.state.chosenNiveau}
                                                    sendDataBack={this.getProperty.bind(this)}
                                                />
                                            </div>

                                    </article>{/* /.card */}
                                </div>{/* /.col-md-6 */}

                                <div className="col-xs-12 col-sm-5 col-md-5 blog-grid-item mb-30">
                                    <article className="card">

                                    <div className="card-image waves-effect waves-block waves-light">
                                    <BarChart
                                    hoveredProperties={this.state.hoveredProperty}
                                    chosenNiveau={this.state.chosenNiveau}
                                    
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

export default Turnout;