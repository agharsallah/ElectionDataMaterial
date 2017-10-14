import React, { Component } from 'react';
import Layout from '../Layout' ;
import {Link,NavLink,Route } from 'react-router-dom';

class Invalid extends Component {
    render() {
        return (
            <div>
            <Layout/>
            <section className="page-title ptb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>parliamentary Election Invalid ballots</h2>
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li ><Link to="/parl/invalid">Invalid</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

                
            </div>
        );
    }
}

export default Invalid;