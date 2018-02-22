import React, { Component } from 'react';

class DataRectangle extends Component {

    render() {
        var tltp;
        (this.props.identifier=='highest'||this.props.identifier=='lowest')?(tltp=<span className="tooltiptext">Click to locate the {this.props.identifier} list number </span>):(tltp=<span className="tooltiptext">Click to reset map </span>)

        return (
            <div>
            <div className="col-md-2 col-xs-12">
            <div onClick={this.props.getClickedRectangle} data-id={this.props.identifier} className={"featured-item border-box hover brand-hover-light tooltipRectangle active-pointer-cursor"} style={{minHeight:'28vh',width:'100%',padding:"15px 15px"}}>
            {tltp}
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