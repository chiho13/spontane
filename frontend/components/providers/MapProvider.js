import React from 'react';

import useViewPort from '../hooks/useViewPort';
import getCoordinates from '../helpers/offsetLocation';
import {FlyToInterpolator} from 'react-map-gl';



const ViewPortContext = React.createContext();

function ViewPortProvider(props) {
  // new

  const {viewport, setViewport, onViewportChange} = useViewPort({
    latitude: 20,
    longitude: 20,
    zoom: props.id ? 9 : 1
})

  function flyViewPort({
    geoLocation: {
        longitude,
        latitude
    }
}) {
    const offset = getCoordinates().getCoords(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), latitude, 9);
    const offsetLon = window.innerWidth > 1000
        ? parseFloat(offset.lon)
        : 0;
    const offsetLat = window.innerWidth > 1000
        ? 0
        : parseFloat(offset.lat);

    onViewportChange({
        longitude: longitude + offsetLon,
        latitude: latitude + offsetLat,
        zoom: 9,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 1000
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