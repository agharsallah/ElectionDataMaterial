import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Layout from '../../Layout';
import MapControl from './MapControl';
import MayorGenderMap from './MayorGenderMap';
import MayorPartyMap from './MayorPartyMap';
import MaleVsFemaleColumn from './MaleVsFemaleColumn';
import ListTypeColumn from './ListTypeColumn';
export default class _RootMayor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'per gender'
        }
    }
    getMapFilterValueFn(filterVal) {
        console.log('filterVal', filterVal);
        this.setState({ filter: filterVal });
    }
    render() {
        const TITLE = <Translate type='text' content='Mayor_results.title' />//Mayors results
        return (
            <div >
                <Layout home='' mun17='active' parl14='' pres14='' contact='' layoutShape='nav-border-bottom' typoColor='' />
                <section className="latest-news-card " style={{ paddingTop: '10vh' }}>
                    <h5 className="section-title" style={{ textAlign: 'center', fontSize: '30px' }} >{TITLE}</h5>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-10 ">
                                <article className="col-md-2 card">
                                    <MapControl sendMapFilterValue={this.getMapFilterValueFn.bind(this)} />
                                </article>
                                <div className="col-md-5 card">
                                    {this.state.filter == 'per gender' ?
                                        <div>
                                            <h4 className="subheaderTitle" style={{ textAlign: 'center' }} >Map of Mayors distribution per gender </h4>
                                            <MayorGenderMap />
                                        </div>
                                        :
                                        <div>
                                            <h4 className="subheaderTitle" style={{ textAlign: 'center' }} >Map of Mayors distribution per list type </h4>
                                            <MayorPartyMap />
                                        </div>
                                    }
                                </div>
                                <article className="col-md-5 card">
                                    {this.state.filter == 'per gender' ?
                                        <div>
                                        <h4 className="subheaderTitle" style={{ textAlign: 'center' }} >Number of Mayors per gender </h4>
                                        <MaleVsFemaleColumn />
                                        </div>
                                        :
                                        <div>
                                        <h4 className="subheaderTitle" style={{ textAlign: 'center' }} >Number of Mayors per List type </h4>
                                        <ListTypeColumn />
                                        </div>
                                    }
                                    
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}