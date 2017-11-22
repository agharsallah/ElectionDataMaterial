import React, { Component } from 'react';
import {Helmet} from "react-helmet";

class HeaderHelmet extends Component {
    render() {
        return (
            <Helmet>

            <script src="./js/jquery-2.1.3.min.js"></script>  
            <script src="./bootstrap/js/bootstrap.min.js"></script>
            <script src="./materialize/js/materialize.min.js"></script>
            <script src="./js/jquery.easing.min.js"></script>
            <script src="./js/jquery.sticky.min.js"></script>
            <script src="./js/smoothscroll.min.js"></script>
            <script src="./js/jquery.stellar.min.js"></script>
            <script src="./js/imagesloaded.js"></script>
            <script src="./js/jquery.inview.min.js"></script>
            <script src="./js/jquery.shuffle.min.js"></script>
            <script src="./js/bootstrap-tabcollapse.min.js"></script>
            <script src="./carousel/owl.carousel.min.js"></script>
            <script src="./flexSlider/jquery.flexslider-min.js"></script>
            <script src="./magnific-popup/jquery.magnific-popup.min.js"></script>
            <script src="./js/menuzord.js"></script>            
            <script src="./js/scripts.js"></script>
            </Helmet>  
        );
    }
}

export default HeaderHelmet;