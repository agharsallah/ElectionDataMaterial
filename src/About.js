import React, { Component } from 'react';
import Layout from './Layout' ;
import s from './s.css' ;

class About extends Component {
  render() {
    return (
      <div style={{height:'50%'}}>
      <Layout home="" about="active" parl14="" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>
      <div style={{marginTop:'10vh'}} className='container'>
      <div className='row' >
      <div className='col-md-2'></div>
      <div className='col-md-8' >
      <h2 className="section-title"> About </h2> 
      <p className='paragraph' >Tunisia Election Data browser – created to collect, open, visualize, and analyze election-related data on an ongoing basis – is a project implemented by Mourakiboun with support from Democracy International and technical assistance from Development Seed.</p>
      <p className='paragraph'>The goal of Tunisia Election Data is to present a range of stakeholders (electoral officials, political parties, civil society organizations, media, citizens, etc.) with comprehensive information about the electoral process to enable them to make informed decisions that lead to better outcomes.</p>
      <p className='paragraph'>Mourakiboun aims to achieve this goal by:</p>
      <ul className='paragraph' >
      <li>Creating a centralized hub of election-related data, maps, and analysis that facilitate data-driven decision-making to improve the electoral process  </li>
      <li> Presenting information in a highly accessible way so that stakeholders can measure progress and identify trends from one election cycle to the next</li>
      <li>Providing a meaningful lens through which electoral developments or election observation findings can be contextualized and understood.</li>
      </ul>
      <p className='paragraph'>You can find the Link to the used raw data here : <a href="https://github.com/hunter-x/All-Data">Raw data</a> .</p>
      </div>
      <div className='col-md-2'></div>
      </div>
      </div>
      </div>
    );
  }
}

export default About;