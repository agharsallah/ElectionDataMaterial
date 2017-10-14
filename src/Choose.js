import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Marker,CircleMarker } from 'react-leaflet';
import { Redirect,withRouter,Link,NavLink,Route } from 'react-router-dom';
import config from './config' ;
import axios from 'axios' ;
import Layout from './Layout' ;

class Choose extends Component {
    constructor(props){
      super(props);
      this.state={redirect: false}
    }
    componentWillMount() {
        let qString=config.apiUrl+'/api/reg/all';
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            this.setState({shape:JSON.parse(response.data.data),key:'gov',shapeIsLoaded:true
            });
        }
        )
        .catch(function (error) {
            console.log(error);
        });
        
    }
    clickedShape(e){
        //for the histogram age BarChart
        let property=e.target.feature.properties;
        property.NAME_EN
        let url = '/munreg/'+property.NAME_EN+"/";
        //window.location =url;
        this.setState({ redirect: true,url:url })
    }
    render() {
        const position = [34.8,9.5 ];
        let url = this.state.url;
        return (
            this.state.redirect ? <Redirect push to={url}/>:
            <div>
            <Layout home="" mun17="active" parl14="" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>
            <section className="page-title ptb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Municipal Election registration data </h2>
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li ><Link to="/munre">Municipal Registration 2017</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="latest-news-card " style={{padding:'10px 0'}}>
            <div className="container-fluid">
                <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-30">
                            <article className="card">
                                <Map center={position} zoom={7} style={{height: '95vh',position:'relative',backgroundColor:'white'}}>
                                <GeoJSON
                                    key={this.state.key}
                                    data= {this.state.shape}
                                    
                                    onEachFeature={
                                        (feature, layer) => {
                                            //sending shapes center to marker component
                                            layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:'tooltipnamear',direction:'right' })
                                            layer.on({click: this.clickedShape.bind(this)});
                                            /* layer.on({mouseover: this.highlightFeature.bind(this)});
                                            layer.on({mouseout: this.resetFeature.bind(this)}); */
                                        }    
                                    }
                                />
                                </Map>   
                            </article>{/* /.card */}
                        </div>{/* /.col-md-12 */}
                </div>{/* /.row */}
            </div>{/* /.container */}
        </section>
        </div>

        );
    }
}

export default Choose;