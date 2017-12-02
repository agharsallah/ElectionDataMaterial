import React, { Component } from 'react';
import {Link,NavLink,Route } from 'react-router-dom';
class Layout extends Component {
    render() {
        let headerClass= 'tt-nav sticky '+this.props.layoutShape;
        let headerColor= 'menuzord-menu pull-left '+this.props.typoColor;
        return (
            <header id='header' className={headerClass} style={{zIndex:1500}} >
                <div className='header-sticky light-header'>    
                    <div className='container'>

                        <div id='materialize-menu' className='menuzord'>

                            {/*logo start*/}
                            <Link to='/' className='logo-brand'>
                                <img className='logo-dark' src='./img/logo.png' alt=''/>
                            </Link>
                            {/*logo end*/}

                            {/*mega menu start*/}
                            <ul className={headerColor}>
                                <li className={this.props.home}><Link to='/'>Home</Link>
                                </li>

                                <li className={this.props.mun17}><a href='javascript:void(0)'>Municipal </a>                                   <ul className="dropdown">
                                        <li><Link to='/munre'>Administrative Structure</Link></li>
                                        <li ><Link to='/detailed-reg'>Registration</Link></li>
                                        <li ><Link to='/reg-performance'>Registration perfomance</Link></li>
                                    </ul>
                                </li>
                                <li className={this.props.parl14}><a href='javascript:void(0)'>election data</a>                                   <ul className="dropdown">
                                        <li><Link to='/invalid'>Invalid</Link></li>
                                        <li ><Link to='/turnout'>Turnout</Link></li>
                                        <li ><Link to='/socio'>Socio Election</Link></li>
                                        </ul>
                                </li>

                                <li className={this.props.result}><a href='javascript:void(0)'>Election result</a>
                                <ul className="dropdown" >
                                  <li><a href="javascript:void(0)">Maps</a>
                                    <ul className="dropdown" >
                                      <li><a href="/result/2011/index.html">NCA 2011</a></li>
                                      <li><a href="/result/2014/demos/Maps_Bubble/Elections2014.html">Parliamentary 2014</a></li>
                                      <li><a href="/result/visPrez/demos/Maps_with_Drill_Down/Tunisia_presidential_election_2008.html">Presidential 2014</a></li>
                                    </ul>
                                  </li>
                                  <li><a href="javascript:void(0)">Archive</a>
                                    <ul className="dropdown" >
                                    <li><Link to='/full'>Full results</Link></li>
                                    <li><Link to='/archive'>Old Viz</Link></li>
                                    </ul>
                                  </li>
                                </ul>
                            </li>
                                
                            <li className={this.props.other} ><Link to='/viz'> Other Viz</Link></li>
                            
                                <li className={this.props.webradar}><a href='/webradar/index.html'>Web Radar</a>
                                </li>

                                <li className={this.props.about} ><Link to='/about'> About</Link></li>
                                
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

export default Layout;