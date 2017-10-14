import React, { Component } from 'react';

class DataRectangle extends Component {
    render() {
        return (
            <div className="container-fluid">   
            <div className="counter-section ">
                <div className="row text-center"style={{paddingBottom:"35px"}} >
                    <div className="col-sm-3">
                        <div className="color-box blue-grad">
                        <h2><span className="timer">{this.props.population}</span></h2>
                        <span className="count-desc">Population</span>
                        </div>
                    </div> {/* /.col-sm-3 */}

                    <div className="col-sm-3">
                    <div className="color-box pink-grad">
                        <h2><span className="timer">{this.props.chairs}</span></h2>
                        <span className="count-desc">Chair</span>
                    </div>
                    </div>{/* /.col-sm-3 */}

                    <div className="col-sm-3">
                    <div className="color-box green-grad">
                        <h2><span> {this.props.area}</span> Km²</h2>
                        <span className="count-desc">Area</span>
                    </div>
                    </div>{/* /.col-sm-3 */}

                    <div className="col-sm-3">
                    <div className="color-box purple-grad">
                        <h2><span className="timer">{this.props.munNumber}</span></h2>
                        <span className="count-desc">Municipality</span>
                    </div>
                    </div>{/* /.col-sm-3 */}
                </div>
            </div>
        </div>
        );
    }
}

export default DataRectangle;