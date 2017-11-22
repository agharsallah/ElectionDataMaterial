import React, { Component } from 'react';
import Layout from './Layout' ;
import {Helmet} from "react-helmet";

class Empty extends Component {
    
    componentWillMount() {
        
    }
    
    render() {
        let link = 'http://tunisiaelectiondata.com/#/'+(this.props.match.url).substr(7).replace(/_/g,'/') ; 
        return (
            <div>
            <Helmet>

            <script src="../js/menuzord.js"></script>            
            <script src="../js/scripts.js"></script>
            </Helmet>
            <Layout home="" mun17="" parl14="" pres14="" result="active" webradar='' layoutShape="transparent-header" typoColor="light"/>      
            <div style={{paddingTop:'7vh'}}>
                {/* iframe here */}
                <iframe src={link} width={"100%"} scrolling={'no'} style={{height:'99vh'}} ></iframe>                   

            </div>
                
            </div>
        );
    }
}

export default Empty;