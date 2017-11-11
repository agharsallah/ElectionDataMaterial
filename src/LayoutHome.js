import React, { Component } from 'react';
import {Link,NavLink,Route } from 'react-router-dom';
class LayoutHome extends Component {
    constructor(props){
      super(props);
      this.state={home:'active', mun:'', data:'', result:'',  radar:'' }
    }
    smooth(a,selector){
        $('html, body').animate({
            scrollTop: a,
        }, 'slow');
        
        switch (selector) {
            case 0:
                this.setState({home:'active', mun:'', data:'', result:'',  radar:''});
                break;
                case 1:
                this.setState({home:'', mun:'active', data:'', result:'',  radar:''});
                break;
                case 2:
                this.setState({home:'', mun:'', data:'active', result:'',  radar:''});
                break;
                case 3:
                this.setState({home:'', mun:'', data:'', result:'active',  radar:''});
                break;
                case 4:
                this.setState({home:'', mun:'', data:'', result:'',  radar:'active'});
                break;
            default:
                break;
        }
        return false;
    }
    render() {
        
        let headerClass= 'tt-nav sticky '+this.props.layoutShape;
        let headerColor= 'menuzord-menu pull-left '+this.props.typoColor;
        return (
            <header id='header' className={headerClass} style={{zIndex:1500}} >
                <div className='header-sticky light-header'>    
                    <div className='container'>

                        <div id='materialize-menu' className='menuzord'>

                            {/*logo start*/}
                            <a href='index.html' className='logo-brand'>
                                <img className='logo-dark' src='./img/logo.png' alt=''/>
                            </a>
                            {/*logo end*/}

                            {/*mega menu start*/}
                            <ul className={headerColor}>
                                <li className={this.state.home} ><a onClick={this.smooth.bind(this,'0vh',0)}  >Home</a> 
                                </li>

                                <li className={this.state.mun}><a onClick={this.smooth.bind(this,'600vh',1)}  >Municipal</a>     
                                </li>
                                <li className={this.state.data} ><a onClick={this.smooth.bind(this,'1040vh',2)}  >election data</a>                                   
                                
                                </li>

                                <li className={this.state.result} ><a onClick={this.smooth.bind(this,'1420vh',3)} >Election Result</a>
                                </li>

                                <li className={this.state.radar} ><a onClick={this.smooth.bind(this,'4000vh',4)}  >Web Radar</a>
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