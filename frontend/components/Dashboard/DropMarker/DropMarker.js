import React, {useContext, useState, useEffect} from 'react';
import ShowMarker from './ShowMarker';
import DynamicMarker from '../../Icons/BaseMarker';
import {Marker} from 'react-map-gl';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';


function DropMarker(props) {
    const {marker: {
        latitude, longitude
    }, onMarkerDragStart, onMarkerDrag, onMarkerDragEnd, editLocation} = props;

    const {form} = useContext(LocationEditorContext);

    const [state, setState] = useState({
        markerType: form.markerType,
        pinColor: form.pinColor
    });


    useEffect(() => {
        setState({
            markerType: form.markerType,
            pinColor: form.pinColor
        });
    }, [editLocation, form]);

    return  <Marker
            longitude={parseFloat(longitude)}
            latitude={parseFloat(latitude)}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}>
            <DynamicMarker  markerType={state.markerType} dropShadowColor="#ffffff" pinColor={state.pinColor} selected={true} />
        </Marker>
}


export default DropMarker;