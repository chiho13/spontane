import React, { useEffect, useState, useContext} from 'react';

import useViewPort from '../hooks/useViewPort';
import getCoordinates from '../helpers/offsetLocation';
import { FlyToInterpolator, WebMercatorViewport} from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import {UserContext} from '../Layout/DashboardLayout';

const ViewPortContext = React.createContext();


const SINGLE_PROJECT_QUERY = gql `
    query SINGLE_PROJECT_QUERY($projectID: ID!) {
        project(where: { id: $projectID }) {
            mapBounds
            mapStyle
        }
    }
`;

function ViewPortProvider(props) {
  // new
  const router = useRouter();


  // const {user} = useContext(UserContext);

  const [viewport, setViewport] = useState({
    latitude: 55,
    longitude: 0,
    zoom: 0
  }) ;

  const [mapConfig, setMapConfig] = useState({
    maxBounds: [[-180, -80], [180, 80]],
    minZoom: 0,
    mapStyle: "mapbox://styles/anthonyhodesu/ck0y2dle1013q1cpk194xrvtu",
    originalLat: 0,
    originalLng: 0
  });

  const [maxBounds, setMaxBounds] = useState(null);

  function onViewportChange(_viewport) {

    // if ( _viewport.longitude < maxBounds.lng.min ) {
    //   _viewport.longitude = maxBounds.lng.min;
    // }
    // else if ( _viewport.longitude > maxBounds.lng.max ) {
    //   _viewport.longitude = maxBounds.lng.max;
    // }
    // else if ( _viewport.latitude < maxBounds.lat.min ) {
    //   _viewport.latitude = maxBounds.lat.min
    // }
    // else if ( _viewport.latitude > maxBounds.lat.max ) {
    //   _viewport.latitude = maxBounds.lat.max;
    // }

    setViewport(_viewport);
  }

 function handleGeocoderViewportChange(_viewport) {
    const geocoderDefaultOverrides = { transitionDuration: 4000 };

    console.log("geocoder", _viewport);
    // setTimeout(() => {
    //   return onViewportChange({
    //     ...viewport,
    //     ...geocoderDefaultOverrides
    //   });
    // },4000);

    flyViewPort({
      geoLocation: {
        latitude: _viewport.latitude,
        longitude: _viewport.longitude
      }
    }, _viewport.zoom, false);
  };

  function flyViewPort({
    geoLocation: {
      latitude,
      longitude,
    }
  }, zoom, offsetBool = true) {
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
    <ViewPortContext.Provider value={{ viewport, setViewport, flyViewPort, onViewportChange, mapConfig, setMapConfig, handleGeocoderViewportChange}}>
      {props.children}
    </ViewPortContext.Provider>
  );
}
export { ViewPortContext, ViewPortProvider };