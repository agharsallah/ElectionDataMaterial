import React, { Component } from 'react';
import Translate from 'react-translate-component';
import SelectionMap from './SelectionMap';
import Layout from '../../Layout';

export default class _RootMapCsoResultsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: 'none' }
  }

  handleMapClickFather(Gov_name) {
    this.setState({ redirect: '/mun-results/' + Gov_name });
  }
  render() {
    const TITLE = <Translate type='text' content='ppproposal.title2' />//Municipal election Turnout 2018
    return (
      <section >
        {this.state.redirect == 'none' ?
          <div>
            <Layout home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
            <section className="latest-news-card " style={{ paddingTop: '10vh' }}>

              <div className="col-md-offset-1 col-md-10">
                <h4 className="subheaderTitle "> You can click on the governorate of which you want discover results :</h4>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-10 ">
                    <article className="card">
                      <SelectionMap handleMapClickFather={this.handleMapClickFather.bind(this)} />
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>
          :
          this.props.history.push(this.state.redirect)
        }
      </section>
    );
  }
}
