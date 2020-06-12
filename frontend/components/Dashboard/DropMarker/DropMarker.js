import React, {useContext} from 'react';
import ShowMarker from './ShowMarker';
import DynamicMarker from '../../Icons/BaseMarker';
import {Marker} from 'react-map-gl';
import { MapEditorContext } from '../../providers/MapEditorProvider';


function DropMarker(props) {
    const {marker: {
        latitude, longitude
    }, onMarkerDragStart, onMarkerDrag, onMarkerDragEnd, editLocation} = props;

    const {form} = useContext(MapEditorContext);

    return <ShowMarker isUpdate={editLocation}>
        <Marker
            longitude={parseFloat(longitude)}
            latitude={parseFloat(latitude)}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}>
            <DynamicMarker  markerType={form.markerType} dropShadowColor="#ffffff" pinColor="#dd0000" />
        </Marker>
    </ShowMarker>
}


export default DropMarker;