import React from 'react';

import useViewPort from '../hooks/useViewPort';
import getCoordinates from '../helpers/offsetLocation';
import {FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';


const ViewPortContext = React.createContext();

function ViewPortProvider(props) {
  // new

  const {viewport, setViewport, onViewportChange} = useViewPort({
    latitude: 55,
    longitude: 0,
    zoom: 2
})

  function flyViewPort({
    geoLocation: {
      latitude,
    longitude,
    } 
}, zoom, offsetBool=true) {
    const offset = getCoordinates().getCoords(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), latitude, zoom);
    const offsetLon = window.innerWidth > 1000 && offsetBool
        ? parseFloat(offset.lon)
        : 0;
    const offsetLat = window.innerWidth > 1000 && offsetBool
        ? 0
        : parseFloat(offset.lat);

    onViewportChange({
        latitude: latitude + offsetLat,
        longitude: longitude + offsetLon,
        zoom,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 1400,
        transitionEasing: easeCubic
    });
};
return (
   // new
   <ViewPortContext.Provider value={{ viewport, flyViewPort, onViewportChange }}>
      {props.children}
    </ViewPortContext.Provider>
  );
}
export { ViewPortContext, ViewPortProvider };