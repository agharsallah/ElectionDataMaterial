import React, { Component } from 'react';
import {Link,NavLink,Route } from 'react-router-dom';
import Home from './Home' ;
class Layout extends Component {
    render() {
        let headerClass= 'tt-nav '+this.props.layoutShape;
        let headerColor= 'menuzord-menu pull-right '+this.props.typoColor;
        return (
            <header id='header' className={headerClass} >
                <div className='header-sticky light-header'>    
                    <div className='container'>

                        <div id='materialize-menu' className='menuzord'>

                            {/*logo start*/}
                            <a href='index.html' className='logo-brand'>
                                <img className='logo-dark' src='./img/loego.png' alt=''/>
                                <img className='logo-light' src='./img/logo-whiete.png' alt=''/>
                            </a>
                            {/*logo end*/}

                            {/*mega menu start*/}
                            <ul className={headerColor}>
                                <li className={this.props.home}><Link to='/'>Home</Link>
                                </li>

                                <li className={this.props.mun17}><Link to='/munre'>Registration 2017</Link>
                                </li>
                                <li className={this.props.parl14}><a href='javascript:void(0)'>Parlimentary 2014</a>
                                    <ul className="dropdown">
                                        <li><Link to='/parl/invalid'>Invalid</Link></li>
                                        <li ><Link to='/parl/turnout'>Turnout</Link></li>
                                        <li ><Link to='/parl/result'>Result</Link></li>
                                        </ul>
                                </li>

                                <li className={this.props.pres14}><Link to='/pres'>Presidentaial 2014</Link>
                                </li>

                                <li className={this.props.contact}><Link to='/contact'>Contact</Link>
                                </li>
                            </ul>
                            {/*mega menu end*/}

                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Layout;