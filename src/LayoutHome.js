import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import { Link } from 'react-scroll'

class LayoutHome extends Component {
    constructor(props) {
        super(props);
        this.state = { home: 'active', mun: '', data: '', result: '', radar: '', value: 'en' }
    }
    componentWillMount() {
        counterpart.getLocale();
    }

    handleChange(event, index, value) {
        this.setState({ value })
        counterpart.setLocale(value);
    };

    smooth(selector) {
        $('html, body').animate({
            scrollTop: $("#"+selector).offset().top,
          }, 'slow');

        switch (selector) {
            case 0:
                this.setState({ home: 'active', mun: '', data: '', result: '', radar: '', about: '', other: '' });
                break;
            case 1:
                this.setState({ home: '', mun: 'active', data: '', result: '', radar: '', about: '', other: '' });
                break;
            case 2:
                this.setState({ home: '', mun: '', data: 'active', result: '', radar: '', about: '', other: '' });
                break;
            case 3:
                this.setState({ home: '', mun: '', data: '', result: 'active', radar: '', about: '', other: '' });
                break;
            case 4:
                this.setState({ home: '', mun: '', data: '', result: '', radar: 'active', about: '', other: '' });
                break;
            case 5:
                this.setState({ home: '', mun: '', data: '', result: '', radar: '', about: 'active', other: '' });
                break;
            case 6:
                this.setState({ home: '', mun: '', data: '', result: '', radar: '', about: '', other: 'active' });
                break;
            default:
            
                break;
        }
        return false;
    }
    smoothy(selector) {
        console.log(selector);
        $('html, body').animate({
          scrollTop: $("#"+selector).offset().top,
        }, 'slow');
        return false;
      }
    render() {
        /* Get The language variables from Locale */
        const en = <Translate type="text" content="navbar.en" />
        const fr = <Translate type="text" content="navbar.fr" />
        const ar = <Translate type="text" content="navbar.ar" />

        const about = <Translate content='navbar.about' />//About
        const other = <Translate content='navbar.other' />//OtherViz
        const mun = <Translate content='navbar.mun' />//Municipal
        const electData = <Translate content='navbar.electData' />//Election Data
        const elecResult = <Translate content='navbar.elecResult' />//Election Result
        const webRadar = <Translate content='navbar.webRadar' />//webradar
        const home = <Translate content='navbar.home' />//Home

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
                                {/* <li><Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >Test 1</Link></li> */}

                                <li className={this.state.home} ><a onClick={this.smooth.bind(this,  0)}  >{home}</a>
                                </li>
                                <li className={this.state.mun}><a onClick={this.smooth.bind(this,  1)}  >{mun}</a>
                                </li>
                                <li className={this.state.data} ><a onClick={this.smooth.bind(this,2)}  >{electData}</a>
                                </li>

                                <li className={this.state.result} ><a onClick={this.smooth.bind(this, 3)} >{elecResult}</a>
                                </li>

                                <li className={this.state.other} ><a onClick={this.smooth.bind(this,  6)}  >{other}</a>
                                </li>
                                <li className={this.state.radar} ><a onClick={this.smooth.bind(this, 4)}  >{webRadar}</a>
                                </li>
                                <li className={this.state.about} ><a onClick={this.smooth.bind(this, 5)}  >{about}</a>
                                </li>
                                <li style={{ float: "right" }}>
                                    {/* <DropDownMenu labelStyle={{color:'inherit'}} value={this.state.value} onChange={this.handleChange.bind(this)} >
                                  <MenuItem value={'en'} primaryText={en} />
                                  <MenuItem value={'fr'} primaryText={fr} />
                                  <MenuItem value={'ar'} primaryText={ar} />
                                </DropDownMenu> */}
                                </li>

                                {/* <li className={this.props.contact}><Link to='javascript:void(0)'>Contact</Link>
                                </li> */}
                            </ul>
                            {/*mega menu end*/}

                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default LayoutHome;