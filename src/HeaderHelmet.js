import React, { Component } from 'react';
import {Helmet} from "react-helmet";

class HeaderHelmet extends Component {
    render() {
        return (
            <Helmet>
            <link href='https://fonts.googleapis.com/css?family=Raleway:400,300,500,700,900' rel='stylesheet' type='text/css'/>
            <link href="http://localhost:8080/fonts/iconfont/material-icons.css" rel="stylesheet"/>
            <link href="http://localhost:8080/fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"/>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.css"/>
            
            <link href="http://localhost:8080/carousel/assets/owl.carousel.css" rel="stylesheet"/>
            <link href="http://localhost:8080/carousel/assets/owl.theme.default.min.css" rel="stylesheet"/>
            <link href="http://localhost:8080/materialize/css/materialize.min.css" rel="stylesheet"/>
            <link href="http://localhost:8080/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="http://localhost:8080/css/shortcodes/shortcodes.css" rel="stylesheet"/>
            <link href="http://localhost:8080/style.css" rel="stylesheet"/>
            <script src= "http://localhost:8080/geojson/municipalities_shape.js"></script>            
            <script src="./js/jquery-2.1.3.min.js"></script>  
            <script src="http://localhost:8080/bootstrap/js/bootstrap.min.js"></script>
            <script src="http://localhost:8080/materialize/js/materialize.min.js"></script>
            <script src="./js/menuzord.js"></script>
            <script src="./js/jquery.easing.min.js"></script>
            <script src="./js/jquery.sticky.min.js"></script>
            <script src="./js/smoothscroll.min.js"></script>
            <script src="./js/jquery.stellar.min.js"></script>
            <script src="./js/imagesloaded.js"></script>
            <script src="./js/jquery.inview.min.js"></script>
            <script src="./js/jquery.shuffle.min.js"></script>
            <script src="./js/bootstrap-tabcollapse.min.js"></script>
            <script src="http://localhost:8080/carousel/owl.carousel.min.js"></script>
            <script src="http://localhost:8080/flexSlider/jquery.flexslider-min.js"></script>
            <script src="http://localhost:8080/magnific-popup/jquery.magnific-popup.min.js"></script>
            <script src="./js/scripts.js"></script>
            </Helmet>  
        );
    }
}

export default HeaderHelmet;