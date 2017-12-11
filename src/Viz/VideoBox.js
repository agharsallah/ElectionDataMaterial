import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import ModalVideo from 'react-modal-video'
import '../home/modal-video.css';
class VideoBox extends Component {
    constructor () {
        super()
        this.state = {
          isOpen: false
        }
        this.openModal = this.openModal.bind(this)
      }
      openModal () {
        this.setState({isOpen: true})
      }
    render() {
        return (
            <div className="portfolio-item"  id={this.props.slide}>
                <div className="portfolio-wrapper">

                <div className="thumb">
                    <div className=" brand-overlay"></div>
                    <button onClick={this.openModal}><img style={{height:"190px"}} src={this.props.imgLink} alt=""/></button>
                    <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.props.videoId} onClose={() => this.setState({isOpen: false})} />

                </div>{/* thumb */}

                <div className="portfolio-title">

                    <h2 ><a  onClick={this.openModal}>{this.props.title}</a><ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.props.videoId} onClose={() => this.setState({isOpen: false})} />
                    </h2>
                    {/* <p><a href={this.props.vizLink}>{this.props.desc}</a> </p> */}
                </div>

                </div>{/* /.portfolio-wrapper */}
            </div>
        );
    }
}

export default VideoBox;