import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

class LayoutTranslated extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'en' }
    }

    componentWillMount() {
        counterpart.getLocale();
    }

    handleChange(event, index, value) {
        this.setState({ value })
        counterpart.setLocale(value);
    };

    render() {
        /* Get The language variables from Locale */
        const en = <Translate type="text" content="navbar.en" />
        const fr = <Translate type="text" content="navbar.fr" />
        const ar = <Translate type="text" content="navbar.ar" />
        const home = <Translate content='navbar.home' />//Home
        const otherViz = <Translate content='navbar.other' />//Other Viz",
        const oldViz = <Translate content='navbar.oldViz' />//Old Viz",
        const maps = <Translate content='navbar.maps' />//"Maps"
        const sectionMunicipalData_b = <Translate content='home.sectionMunicipalData_b' />//"Municipal"
        const sectionElectionData = <Translate content='home.sectionElectionData' />//"Election Data"
        const sectionElectionResult = <Translate content='home.sectionElectionResult' />//"Election Result"
        const sectionotherViz = <Translate content='home.sectionotherViz' />//"Other Viz"
        const sectionWebradar = <Translate content='home.sectionWebradar' />//"WebRadar"
        const sectionAbout = <Translate content='home.sectionAbout' />//"About"

        const munDataTitle1 = <Translate content='home.munDataTitle1' />//"Administrative Structure"
        const munDataTitle2_b = <Translate content='home.munDataTitle2_b' />//" Registration"
        const munDataTitle3_b = <Translate content='home.munDataTitle3_b' />//" Registration Performance"
        const munDataTitle4 = <Translate content='home.munDataTitle4' />//"Lists Overview"

        const electDataTitle1 = <Translate content='home.electDataTitle1' />//"Invalid Ballots"
        const electDataTitle2 = <Translate content='home.electDataTitle2' />//"Turnout"
        const electDataTitle3 = <Translate content='home.electDataTitle3' />//"Socio Election Map"
        
        const electResultData1 = <Translate content='home.electResultData1' />//'NCA Results 2011'
        const electResultData2 = <Translate content='home.electResultData2' />//'Parliamentary 2014'
        const electResultData3 = <Translate content='home.electResultData3' />//'Presidential 2014 '
        const electResultData4 = <Translate content='home.electResultData4' />//'Full Results'
        const electResultData5 = <Translate content='home.electResultData5' />//'Archive


        let headerClass = 'tt-nav sticky ' + this.props.layoutShape;
        let headerColor = 'menuzord-menu pull-left ' + this.props.typoColor;
        return (
            <header id='header' className={headerClass} style={{ zIndex: 1500 }} >
                <div className='header-sticky light-header'>
                    <div className='container'>

                        <div id='materialize-menu' className='menuzord'>

                            {/*logo start*/}
                            <Link to='/' className='logo-brand'>
                                <img className='logo-dark' src='./img/logo.png' alt='' />
                            </Link>
                            {/*logo end*/}

                            {/*mega menu start*/}
                            <ul className={headerColor}>
                                <li className={this.props.home}><Link to='/'>{home}</Link>
                                </li>

                                <li className={this.props.mun17}><a href='javascript:void(0)'>{sectionMunicipalData_b} </a>
                                    <ul className="dropdown">
                                        <li><Link to='/lists-overview'>{munDataTitle4}</Link></li>
                                        <li ><Link to='/detailed-reg'>{munDataTitle2_b}</Link></li>
                                        <li><Link to='/munre'>{munDataTitle1}</Link></li>
                                        <li ><Link to='/reg-performance'>{munDataTitle3_b}</Link></li>
                                    </ul>
                                </li>

                                <li className={this.props.parl14}><a href='javascript:void(0)'>{sectionElectionData}</a>
                                    <ul className="dropdown">
                                        <li><Link to='/invalid'>{electDataTitle1}</Link></li>
                                        <li ><Link to='/turnout'>{electDataTitle2}</Link></li>
                                        <li ><Link to='/socio'>{electDataTitle3}</Link></li>
                                    </ul>
                                </li>

                                <li className={this.props.result}><a href='javascript:void(0)'>{sectionElectionResult}</a>
                                    <ul className="dropdown" >
                                        <li><a href="javascript:void(0)">{maps}</a>
                                            <ul className="dropdown" >
                                                <li><a href="/result/2011/index.html">{electResultData1}</a></li>
                                                <li><a href="/result/2014/demos/Maps_Bubble/Elections2014.html">{electResultData2}</a></li>
                                                <li><a href="/result/visPrez/demos/Maps_with_Drill_Down/Tunisia_presidential_election_2008.html">{electResultData3}</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="javascript:void(0)">{electResultData5}</a>
                                            <ul className="dropdown" >
                                                <li><Link to='/full'>{electResultData4}</Link></li>
                                                <li><Link to='/archive'>{oldViz}</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                <li className={this.props.other} ><Link to='/viz'> {otherViz}</Link></li>

                                <li className={this.props.webradar}><a href='/webradar/index.html'>{sectionWebradar}</a>
                                </li>

                                <li className={this.props.about} ><Link to='/about'> {sectionAbout}</Link></li>

                                <li style={{ float: "right" }}>
                                    <DropDownMenu labelStyle={{ color: 'inherit' }} value={this.state.value} onChange={this.handleChange.bind(this)} >
                                        <MenuItem value={'en'} primaryText={en} />
                                        <MenuItem value={'fr'} primaryText={fr} />
                                        <MenuItem value={'ar'} primaryText={ar} />
                                    </DropDownMenu>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default LayoutTranslated;