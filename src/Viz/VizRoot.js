import React, { Component } from 'react';
import Layout from '../Layout' ;
import VizBox from '../home/VizBox' ;
import HeaderHelmet from '../HeaderHelmet' ;

class VizRoot extends Component {
    render() {
        return (
            <div>
            <HeaderHelmet/>
            <Layout home="" mun17="" parl14="" pres14="" result="" webradar="" other='active' layoutShape="transparent-header" typoColor="light"/>      
            <section style={{paddingTop:"10vh"}}>
                
                <div className='container  text-center' >
                        <div className="row"><h3 className="section-title"></h3></div>
                        <div className='row bg-parallax'   >
                                <div className="col-md-4 hover-box">
                                    <VizBox slide='mun' vizLink='/deputy/index.html' title='Deputies' desc='' imgLink='./img/viz/deputies.jpg' />
                                </div>
                        </div>
                </div>        
            </section>
                
            </div>
        );
    }
}

export default VizRoot;