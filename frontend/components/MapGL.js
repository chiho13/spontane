import MapGL, {Marker, FlyToInterpolator} from 'react-map-gl';
import React, {PureComponent} from 'react';
import getCoordinates from './helpers/offsetLocation';

const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2' +
        'ZJApZ0Rg5UTsK7kPw';

class Maps extends PureComponent {

    state = {
        viewport: {
            ...this.props.viewport
        }
    };

    onViewportChange = viewport => this.setState({
        viewport: {...this.state.viewport, ...viewport}
    });

    render() {
        return (
            <MapGL {...this.props} {...this.state.viewport} width="100%" height="100%" mapboxApiAccessToken={TOKEN} onViewportChange={this.onViewportChange}>
            {this.props.children}
        </MapGL>
        );
    }
}

export default Maps