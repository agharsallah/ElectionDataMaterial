import React, { Component } from 'react';

class DataRectangle extends Component {
    render() {
        return (
            <div>
            <div className="col-md-2">
            <div className="featured-item border-box hover brand-hover-light" style={{padding:"15px 15px"}}>
                <div className="icon mb-20">
                    <img className="material-icons brand-icon" src={this.props.imgLink}/>
                </div>
                <div className="desc">
                    <h2 className="text-bold">{this.props.regValue}</h2>
                    <p>{this.props.title}</p>
                </div>
            </div>{/*featured-item */}
        </div>{/*col-md-2 */} 
            </div>
        );
    }
}

export default DataRectangle;