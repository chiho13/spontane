import React, {Component} from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
import styled from 'styled-components';
import {auto} from 'async';

const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2' +
        'ZJApZ0Rg5UTsK7kPw';

class Mapbox extends Component {

    state = {
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: 55.7577,
            longitude: -1.4376,
            zoom: 8
        }
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                height: window.innerHeight,
                width: window.innerWidth,
            }
        });
    }

    render() {
        return (<MapGL
            {...this.state.viewport}
            mapboxApiAccessToken={TOKEN}
             onViewportChange={(viewport) => this.setState({viewport})}
            />);
    }
}

export default Mapbox;