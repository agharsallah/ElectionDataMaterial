import React, { Component } from 'react';

class VizBox extends Component {
    render() {
        return (
            <div className="portfolio-item" >
                <div className="portfolio-wrapper">

                <div className="thumb">
                    <div className=" brand-overlay"></div>
                    <a href={this.props.vizLink}><img style={{height:"190px"}} src={this.props.imgLink} alt=""/></a>
                
                </div>{/* thumb */}

                <div className="portfolio-title">
                    <h2 ><a href={this.props.vizLink}>{this.props.title}</a></h2>
                    <p><a href={this.props.vizLink}>{this.props.desc}</a> </p>
                </div>

                </div>{/* /.portfolio-wrapper */}
            </div>
        );
    }
}

export default VizBox;