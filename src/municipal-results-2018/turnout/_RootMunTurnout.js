import React, { Component } from 'react';
import Translate from 'react-translate-component';
import LayoutTranslated from '../../LayoutTranslated';
import MunTurnoutMap from './MunTurnoutMap';

export default class _RootMunTurnout extends Component {

  render() {
    const TITLE = <Translate type='text' content='ppproposal.title1' />//Municipal election Turnout 2018
    return (
      <div >
        <LayoutTranslated home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
        <section className="latest-news-card " style={{ paddingTop: '10vh' }}>
          <h5 className="section-title" style={{ textAlign: 'center', fontSize: '30px' }} >{TITLE}</h5>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-10 ">
                <article className="card">
                  <MunTurnoutMap />
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
