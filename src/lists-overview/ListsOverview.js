import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Marker,CircleMarker } from 'react-leaflet';
import { Redirect,withRouter,Link,NavLink,Route } from 'react-router-dom';
import config from '../config' ;
import axios from 'axios' ;
import Layout from '../Layout' ;
import HeaderHelmet from '../HeaderHelmet' ;
import MapKey from './MapKey' ;
import Control from 'react-leaflet-control';
import ReactLoading from 'react-loading';
import Radio_state from './Radiobutton_state.js';

class ListsOverview extends Component {
    constructor(props){
      super(props);
        this.state={redirect: false,stateFilter:"All",shapeIsLoaded:false,
        munNumber:"350",munRectangle:"Municipality",munShape:config.initShape,shape:config.initShape
        }
    }
    componentWillMount() {
        
        let qString=config.apiUrl+'/api/candidatesListNumMap';
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
            params: {
                type: 'gov',
                timeOfCollection:'15h' ,
                dateOfCollection:'16-02'
              }
        })
        .then(response=>{
            console.log(response.data.data);
            this.setState({shape:JSON.parse(response.data.data),key:'gov',shapeIsLoaded:true});
        }
        )
        .catch(function (error) {
            console.log(error);
        });

       
        
    }
    //painting the style of the circ shapes with white, we're using this shape to focus on the circ delimetation ontop of the mun one
    styleCirc(feature) {
        return {
            fillColor: 'white',
           
        };
    }
    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
            const etat = this.state.stateFilter;
            /* if(etat=="All") {
                if(feature.properties.state=="extended"){
                    var listsNum = feature.properties.total_lists;
                }else if(feature.properties.state=="new"){
                    var listsNum = feature.properties.total_lists;
                }else{
                    var listsNum = feature.properties.total_lists;
                }
            }
            if ((feature.properties.state=="extended")&&(etat=="Extended")){
                var ETAT = 1;
            }else if ((feature.properties.state=="new")&&(etat=="New")){
                var ETAT = 2;
            }else if ((feature.properties.state=="old")&&(etat=="Old")){
                var ETAT = 3;
            } */
           
            return {
                fillColor: this.getColor(feature.properties.total_lists,[0,10,20,30],["#BBDEFB",'#7DAFD5',"#0096d6","#005288"]),
                color: 'black',
                weight: 1,
                fillOpacity: 0.7
            };

    }
    getColor(listsNum,range,colorRange) {
        if      (listsNum >range[3])      {return (colorRange[3]); }
        else if (listsNum >range[2])      {return (colorRange[2]);}
        else if (listsNum >range[1])      {return (colorRange[1]);}
        else if (isNaN(listsNum))    {return ('white')}
        else                  {return (colorRange[0]);}
	}
    clickedShape(e){
        //for the histogram age BarChart
        let property=e.target.feature.properties;
        let url = '/munreg/'+property.gouv_name+"/";
        //window.location =url;
        this.setState({ redirect: true,url:url })
    }
    chosenNiveau(event){
        console.log("dddddddddddd",event.currentTarget.value);
        let pickedLevel=event.currentTarget.value
        this.setState({stateFilter:pickedLevel});
        if (pickedLevel=="New") {
           this.setState({ munNumber:"86",munRectangle:"New"});
        }else if(pickedLevel=="Old"){
            this.setState({ munNumber:"75",munRectangle:"Old"});
        }else if(pickedLevel=="Extended"){
            this.setState({ munNumber:"189",munRectangle:"Extended"});
        }else{
            this.setState({ munNumber:"350",munRectangle:"Municipality"});
        }
    }
    render() {
        const position = [34.8,10 ];
        let url = this.state.url;
        return (
            this.state.redirect ? <Redirect push to={url}/>:
            <div>
            <HeaderHelmet/>
            
            <Layout home="" mun17="active" parl14="" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>

            <section className="latest-news-card " style={{paddingTop:'10vh'}}>
            <h5 className="section-title" style={{textAlign:'center',fontSize:'30px'}} >Number Of Total Lists Per Governorate</h5>
            <div className="container-fluid">
                <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-10 ">
                            <article className="card">
                                

                            {this.state.shapeIsLoaded ?
                                <Map center={position} zoom={7} maxZoom={8} minZoom={7} style={{height: '95vh',position:'relative',backgroundColor:'white'}}>
                                {/* <GeoJSON
                                    data= {this.state.shape}
                                    style={this.styleCirc.bind(this)}
                                /> */}
                                <GeoJSON
                                    key={"a"+this.state.keyMun}
                                    data= {this.state.shape}
                                    style={this.style.bind(this)} 
                                    onEachFeature={
                                        (feature, layer) => {
                                            layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:'tooltipnamear',direction:'right' })
                                            layer.on({click: this.clickedShape.bind(this)});
                                        }    
                                    }
                                />

                                <Control position="bottomright" >
                                    <MapKey colorSet={["#BBDEFB",'#7DAFD5',"#0096d6","#005288"]} range={[0,10,20,30]}  keyTitle="Candidates Lists Number" />                                
                                </Control>

                                <div className="color-box blue-grad col-sm-2" style={{padding:"40px 40px",float:"right"}}>
                                <h2 style={{textAlign:"center"}}><span className="timer" >{this.state.munNumber}</span></h2>
                                <span className="count-desc" style={{textAlign:"center"}}>{this.state.munRectangle}</span>
                                </div>

                                <Radio_state handleMunState={this.chosenNiveau.bind(this)} />
                                
                                </Map>
                                :
                                <div>
                                    <div className="col-md-5"></div>
                                    <div className="col-md-5" style={{marginTop:"43vh"}}>
                                        <h2 >"Loading Map"</h2>
                                        <div style={{marginLeft:"70px"}}>
                                        <ReactLoading  type="bars" color="#444" className="react-Loader" delay={0} />
                                        </div>
                                    </div>
                                </div>
                            }   
                            </article>{/* /.card */}
                        </div>{/* /.col-md-12 */}
                </div>{/* /.row */}
            </div>{/* /.container */}
        </section>
        </div>

        );
    }
}

export default ListsOverview;