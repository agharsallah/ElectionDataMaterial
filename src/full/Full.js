import React, { Component } from 'react';
import Layout from '../Layout' ;
import VizBox from '../home/VizBox' ;

class Full extends Component {
    render() {
        return (
            <div>
            <Layout home="" mun17="" parl14="" pres14="" result="active" webradar="" layoutShape="transparent-header" typoColor="light"/>      
            <section style={{paddingTop:"7vh"}}>
                <div className="container" style={{marginLeft:'21vw'}}>
    
                
                
                <div className='portfolio portfolio-with-title col-3 gutter mt-20' style={{ transition:'height 250ms ease-out'}}>
                <VizBox key='Data1' vizLink='empty/stories_par_full'  title='Full Parliamentary ' desc='desc' imgLink='./img/archive/full_parl.jpg' />
                <VizBox key='Data2' vizLink='empty/stories_pre_full'  title='Full Presidential' desc='desc' imgLink='./img/archive/full_prez.jpg' />
                </div>
                </div>
                </section>
                
            </div>
        );
    }
}

export default Full;