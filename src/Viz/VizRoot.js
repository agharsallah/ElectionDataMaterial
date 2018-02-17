import React, { Component } from 'react';
import Layout from '../Layout' ;
import VizBox from '../home/VizBox' ;
import VideoBox from './VideoBox' ;
import HeaderHelmet from '../HeaderHelmet' ;

class VizRoot extends Component {
    render() {
        return (
            <div>
            <HeaderHelmet/>
            <Layout home="" mun17="" parl14="" pres14="" result="" webradar="" other='active' layoutShape="transparent-header" typoColor="light"/>      
            <section style={{paddingTop:"10vh"}}>
                
                <div className='container  text-center' >
                        <div className="row"><h3 className="section-title">ARP</h3></div>
                        <div className='row bg-parallax'   >
                                <div className="col-md-4 hover-box">
                                    <VizBox slide='mun' vizLink='/deputy/index.html' title='ARP Members' desc='' imgLink='./img/viz/deputies.jpg' />
                                </div>
                        </div>
                        <div className="row"><h3 className="section-title">Videos</h3></div>
                        <div className='row bg-parallax'   >
                            <div className="col-md-4 hover-box">
                                <VideoBox slide='mun' videoId='ojecMIQu87k' title='Website in a video' desc='' imgLink='./img/sitevideo.jpg' />
                            </div>

                            <div className="col-md-4 hover-box">
                                <VideoBox slide='mun' videoId='SVKa48yD4NM' title='Youth Registration' desc='' imgLink='./img/youthVideo.jpg' />
                            </div>

                            <div className="col-md-4 hover-box">
                                <VideoBox slide='mun' videoId='cRX4TnmZT6s' title='Tunisia Municipal Elections' desc='' imgLink='./img/MunicipalElectionsVid.jpg' />
                            </div>
                        </div>
                    <div className='row bg-parallax'   >
                        <div className="col-md-4 hover-box">
                            <VideoBox slide='mun' videoId='yaHDbPP5VJM' title='Tunisian Miniature City' desc='' imgLink='./img/mappingVid.jpg' />
                        </div>
                    </div>
                </div>        
            </section>
                
            </div>
        );
    }
}

export default VizRoot;