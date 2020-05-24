import React, { useState, useEffect, useContext, useRef } from 'react';

import { useRouter } from 'next/router';

import MapGL from '../../MapGL';
import CreateLocationMapStyle from './MapContainerStyle';
import DropMarker from '../DropMarker/DropMarker';
import { WebMercatorViewport } from 'react-map-gl';
import useMapMarker from '../../hooks/useMapMarker';

import { ViewPortContext } from '../../providers/MapProvider';
import { MapEditorContext } from '../../providers/MapEditorProvider';
import useLocalStorage from '../../hooks/useLocalStorage';
import Toolbar from '../Toolbar';
import RightPanel from '../RightPanel';


function MapEditor(props) {
    const { viewport, setViewport, mapConfig } = useContext(ViewPortContext);
    
    const {form, setForm, dropMarker, setDropMarker} = useContext(MapEditorContext);
    const [maxBounds, setMaxBounds] = useState(null)
   
    const [savedLayerOpen, setSavedLayerOpen] = useLocalStorage('layerOpened', true);

    const [layerOpen, setLayerOpen] = useState(null);

    const {
        marker,
        addMarker,
        showMarker,
        setShowMarker,
        onMarkerDragStart,
        onMarkerDrag,
        onMarkerDragEnd
    } = useMapMarker({ latitude: 0, longitude: 0 });


    useEffect(() => {
        setLayerOpen(savedLayerOpen);
    }, [])

    useEffect(() => {
        setForm({
            ...form,
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }, [marker]);

    const mapRef = useRef(null);

    function enableMarker(bool) {
        setDropMarker(bool);

        setLayerOpen(true);

        if(bool == false) {
            setShowMarker(false);
        }
    }

    function showLayerPanel() {
        setLayerOpen(!layerOpen);
        setSavedLayerOpen(!layerOpen);
        if (layerOpen == true) {
            setDropMarker(false);
        }
    }

    return (
        <CreateLocationMapStyle>

            <div className="map_container">
                <MapGL ref={mapRef}
                    onClick={dropMarker ? addMarker : null}
                >
                    {showMarker && <DropMarker
                        marker={marker}
                        onMarkerDragStart={onMarkerDragStart}
                        onMarkerDrag={onMarkerDrag}
                        onMarkerDragEnd={onMarkerDragEnd} />}
                </MapGL>
                <Toolbar dropMarker={dropMarker} enableMarker={enableMarker} layerOpen={layerOpen} showLayerPanel={showLayerPanel} />
                {/* <h3>Click on map to drop a pin</h3> */}
            </div>
            <RightPanel layerOpen={layerOpen}>
            </RightPanel>
        </CreateLocationMapStyle>
    );
}

export default MapEditor;