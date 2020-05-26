import React, { useState, useEffect, useContext, useRef } from 'react';

import { useRouter } from 'next/router';

import MapGL from '../../MapGL';
import CreateLocationMapStyle from './MapContainerStyle';
import DropMarker from '../DropMarker/DropMarker';
import { Marker} from 'react-map-gl';
import useMapMarker from '../../hooks/useMapMarker';

import { ViewPortContext } from '../../providers/MapProvider';
import { MapEditorContext } from '../../providers/MapEditorProvider';
import {UserContext} from '../../Layout/DashboardLayout';
import useLocalStorage from '../../hooks/useLocalStorage';
import Toolbar from '../Toolbar';
import RightPanel from './RightPanel';
import CityPin from '../../Icons/CityMarker';

function MapEditor(props) {
    const { viewport, setViewport, mapConfig } = useContext(ViewPortContext);

    const {loading, projectData: filteredProject} = useContext(UserContext);
    const {form, setForm, dropMarker, setDropMarker, setEditLocation, editLocation, setSingleLocation, singleLocation} = useContext(MapEditorContext);
    
    const [mapLoaded, setMapLoaded] = useState(false);
    const [savedLayerOpen, setSavedLayerOpen] = useLocalStorage('layerOpened', true);

    const [layerOpen, setLayerOpen] = useState(null);

    const {
        marker,
        setMarker,
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
        setEditLocation(false);

        if(bool == false) {
            setShowMarker(false);
            setSingleLocation({id: 'dsfsdf',
            country: '',
            city: '',
            description: '',
            geoLocation: {
                latitude: 0,
                longitude: 0
           }
        });
        }
    }

    function showLayerPanel() {
        setLayerOpen(!layerOpen);
        setSavedLayerOpen(!layerOpen);
        if (layerOpen == true) {
            setDropMarker(false);
        }
    }

    function updateLocation(location) {
        console.log(location);
        setSingleLocation(location);

        enableMarker(true);
        setEditLocation(true);
        setMarker({
            latitude: location.geoLocation.latitude,
            longitude: location.geoLocation.longitude
        });
        setShowMarker(true);
    }

    function RenderCityMarker() {
        return  mapConfig.loadedMap && filteredProject && filteredProject.locations.filter(loc => loc.id !== singleLocation.id).map(_location => {
           return  <Marker
                key={`marker-${_location.id}`}
                longitude={_location.geoLocation.longitude}
                latitude={_location.geoLocation.latitude}>
                
                    <CityPin pinColor="#f5f5dc" onClick={(e) => {
                        e.stopPropagation();
                        updateLocation(_location);
                        }}/>
            </Marker>
        }
        )
    }

    return (
        <CreateLocationMapStyle>
            <div className="map_container">
                <MapGL ref={mapRef}
                    onNativeClick={(e) => {
                        e.stopPropagation();
                        if(!dropMarker) return;
                        addMarker(e);
                    }}
                >
                    {RenderCityMarker()}
                    {showMarker && <DropMarker
                    editLocation={editLocation}
                        marker={marker}
                        onMarkerDragStart={onMarkerDragStart}
                        onMarkerDrag={onMarkerDrag}
                        onMarkerDragEnd={onMarkerDragEnd} />}
                </MapGL>
                <Toolbar dropMarker={dropMarker} enableMarker={enableMarker} layerOpen={layerOpen} showLayerPanel={showLayerPanel} />
            </div>
            <RightPanel layerOpen={layerOpen}>
            </RightPanel>
        </CreateLocationMapStyle>
    );
}

export default MapEditor;