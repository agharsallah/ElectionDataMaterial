import React, { Component } from 'react';
import VizBox from './VizBox' ;

class BoxFilter extends Component {
    constructor(props){
      super(props);
      //active ,nonActive for the li so that it shows the buttons active or not
      this.state={
      Municipal:'active'
      ,Data:''
      ,Result:''
      ,Webradar:''
      ,All:''
    
        }
      this.showCategory=this.showCategory.bind(this)
    }
    showCategory(e){
        let target = e.target.dataset.group
        if (target=='All'){this.setState({All:'active',Data:'' ,Result:'' ,Webradar:'' ,Municipal:'' });}else 
        if (target=='Data'){this.setState({Data:'active',All:'' ,Result:'' ,Webradar:'' ,Municipal:'' });}else 
        if (target=='Result'){this.setState({Result:'active',Data:'' ,All:'' ,Webradar:'' ,Municipal:'' });}else 
        if (target=='Webradar'){this.setState({Webradar:'active',Data:'' ,Result:'' ,All:'' ,Municipal:'' });}else 
        {this.setState({Municipal:'active',Data:'' ,Result:'' ,Webradar:'' ,All:'' });} 
    }
    render() {
        
        return (
            
            <div>
                <div className='portfolio-container text-center'>
                    
                    <ul className='portfolio-filter brand-filter'>
                        <li onClick={this.showCategory} className={this.state.Municipal+' waves-effect waves-light'} data-group='Municipal'>Municipal Data</li>
                        <li onClick={this.showCategory} className={this.state.Data+' waves-effect waves-light'} data-group='Data'>Election Data</li>
                        <li onClick={this.showCategory} className={this.state.Result+' waves-effect waves-light'} data-group='Result'>Election Result</li>
                        <li onClick={this.showCategory} className={this.state.Webradar+' waves-effect waves-light'} data-group='Webradar'>Webradar</li>
                        <li onClick={this.showCategory} className={this.state.All+' waves-effect waves-light'} data-group='All'>All</li>
                        
                    </ul>

                    <div className='portfolio-container text-center' >
                        {this.state.Municipal=='active'||this.state.All=='active'?
                            <div className='portfolio portfolio-with-title col-3 gutter mt-50 shuffle'  >
                                <VizBox key='Municipal1' vizLink='/munre' title='Municipal insights' desc='desc here' imgLink='./img/home/regInsight.jpg' />
                                <VizBox key='Municipal2' vizLink='/detailed-reg' title='Municipal registration ' desc='desc here' imgLink='./img/home/reg.jpg' />
                                <VizBox key='Municipal3' vizLink='/reg-performance' title='Municipal registration performance' desc='desc here' imgLink='./img/home/regPerformance.jpg' />
                            </div>
                            :null
                        }
                        {this.state.Data=='active'||this.state.All=='active'?
                            <div className='portfolio portfolio-with-title col-3 gutter mt-50' style={{ transition:'height 250ms ease-out',height: '784px',position:'relative'}}>
                                <VizBox key='Data1' vizLink='invalid' title='Invalid ballot' desc='desc here' imgLink='./img/home/invalid.jpg' />
                                <VizBox key='Data2' vizLink='/turnout' title='Turnout' desc='desc here' imgLink='./img/home/turnout.jpg' />
                            </div>:null
                        }
                    </div>{/* portfolio-container */}


                </div>{/* portfolio-container*/}   
            </div>
        );
    }
}

export default BoxFilter;