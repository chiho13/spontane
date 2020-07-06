import React, {useContext, useState, useEffect, useMemo} from 'react';
import ShowMarker from './ShowMarker';
import DynamicMarker from '../../Icons/BaseMarker';
import {Marker} from 'react-map-gl';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';

import {ViewPortContext} from '../../providers/MapProvider';

function DropMarker(props) {
    const {marker: {
        latitude, longitude
    }, onMarkerDragStart, onMarkerDrag, onMarkerDragEnd, editLocation} = props;

    const {mapConfig} = useContext(ViewPortContext);
    const {form, dropMarker} = useContext(LocationEditorContext);

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

    // useEffect(() => {
    //     setState({
    //         markerType: form.markerType,
    //         pinColor: form.pinColor
    //     });

    // });

    // useEffect(() => {
    //     if (editLocation) {
    //         setState({
    //             markerType: form.markerType,
    //             pinColor: form.pinColor
    //         });
    //     } else {
    //         setState({
    //             markerType: form.markerType,
    //             pinColor: mapConfig.markerColor
    //         });
    //     }
    // }, [mapConfig, editLocation]);


    return  <Marker
            longitude={parseFloat(longitude)}
            latitude={parseFloat(latitude)}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}>
            <DynamicMarker  markerType={form.markerType} dropShadowColor="#ffffff" pinColor={form.pinColor} selected={true} />
        </Marker>
}


export default DropMarker;