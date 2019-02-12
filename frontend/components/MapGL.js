import MapGL from 'react-map-gl';
import React, {PureComponent} from 'react';

const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2' +
        'ZJApZ0Rg5UTsK7kPw';

class Maps extends React.PureComponent {
    render() {
        return (
            <MapGL {...this.props} mapboxApiAccessToken={TOKEN}>
            {this.props.children}
        </MapGL>
        );
    }
}

export default Maps