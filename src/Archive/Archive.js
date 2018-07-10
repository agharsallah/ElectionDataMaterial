import React, { Component } from 'react';
import Layout from '../Layout' ;
import VizBox from '../home/VizBox' ;

class Archive extends Component {
    render() {
        return (
            <div>
            <Layout home="" mun17="" parl14="" pres14="" result="active" webradar="" layoutShape="transparent-header" typoColor="light"/>      
            <section style={{paddingTop:"10vh"}}>
            <div className='container  text-center' >
                    <div className="row"><h3 className="section-title">2014 Presidential Elections</h3></div>
                    <div className='row bg-parallax'   >
                        <div className="col-md-4 hover-box">
                            <VizBox slide='mun' vizLink='empty/stories_pre_11' title='Number of Polling center' desc='' imgLink='./img/archive/polcenter.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='empty/stories_pre_1' title='RESULTS BY GENDER ' desc='' imgLink='./img/archive/resgender.jpg' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='empty/stories_pre_3' title='STATISTICS' desc='' imgLink='./img/archive/stat.jpg' />
                        </div>
                    </div>
                   
                    <div className="row"><h3 className="section-title">2011 NCA Elections</h3></div>
                    
{/*                     <div className='row bg-parallax'   >
                        <div className="col-md-4 hover-box">
                            <VizBox slide='mun' vizLink='empty/stories_nca_1' title='Exploring Ennahdha Results in the 2011 Elections' desc='' imgLink='./img/archive/nahdha.png' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='empty/stories_nca_4' title='Exploring CPR Results in the 2011 Elections ' desc='' imgLink='./img/archive/cpr.png' />
                        </div>
                        <div className="col-md-4 hover-box">
                            <VizBox vizLink='empty/stories_nca_2' title='Exploring Al Aridha Results in the 2011 Elections' desc='' imgLink='./img/archive/aridaa.png' />
                        </div>
                    </div> */}
                
                    {/* <div className='row bg-parallax'   >
                    <div className="col-md-4 hover-box">
                        <VizBox slide='mun' vizLink='empty/stories_nca_3' title='Exploring Ettakatol Results in the 2011 Elections' desc='' imgLink='./img/archive/ETTAKATOL.png' />
                    </div>
                    <div className="col-md-4 hover-box">
                        <VizBox vizLink='empty/stories_nca_5' title='Exploring PDP Results in the 2011 Elections ' desc='' imgLink='./img/archive/PDP.png' />
                    </div>
                    <div className="col-md-4 hover-box">
                        <VizBox vizLink='empty/stories_nca_51' title='Exploring Afek Tounes Results in the 2011 Elections' desc='' imgLink='./img/archive/afek.png' />
                    </div>
                </div> */}

            <div className='row bg-parallax'   >
                <div className="col-md-4 hover-box">
                    <VizBox slide='mun' vizLink='empty/stories_nca_6' title='Visualizing the level of eligible voter turnout' desc='' imgLink='./img/archive/active.png' />
                </div>
                <div className="col-md-4 hover-box">
                    <VizBox vizLink='empty/stories_nca_7' title='Visualizing the proportion of actively registered voters vis-à-vis the eligible voting population ' desc='' imgLink='./img/archive/eligible.png' />
                </div>
                <div className="col-md-4 hover-box">
                    <VizBox vizLink='empty/stories_nca_8' title='Visualizing the level of eligible voter turnout' desc='' imgLink='./img/archive/active.png' />
                </div>
            </div>

            <div className='row bg-parallax'   >
                <div className="col-md-4 hover-box">
                    <VizBox slide='mun' vizLink='empty/stories_nca_9' title='Highlighting the level of actively registered voter turnout' desc='' imgLink='./img/archive/turnout.png' />
                </div>
                <div className="col-md-4 hover-box">
                    <VizBox vizLink='empty/stories_nca_10' title='Highlighting where local-level coalitions could have the greatest impact' desc='' imgLink='./img/archive/wasted.png' />
                </div>
                <div className="col-md-4 hover-box">
                    <VizBox vizLink='empty/stories_nca_11' title='Visualizing the proportion of blank ballots cast' desc='' imgLink='./img/archive/blanc.png' />
                </div>
            </div>
            </div>

                </section>
                
            </div>
        );
    }
}

export default Archive;