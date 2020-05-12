import React, { useEffect, useState } from 'react';

import useViewPort from '../hooks/useViewPort';
import getCoordinates from '../helpers/offsetLocation';
import { FlyToInterpolator, WebMercatorViewport} from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';


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
  const projectID = router.query.id

  const { data: singleProjectData, loading: projectLoading, error } = useQuery(SINGLE_PROJECT_QUERY, {
    variables: {
      projectID: projectID
    }
  });

  const [viewport, setViewport] = useState({
    latitude: 55,
    longitude: 0,
    zoom: 2
  }) ;


  const [mapConfig, setMapConfig] = useState({
    minZoom: 1,
    mapStyle: "mapbox://styles/anthonyhodesu/ck0y2dle1013q1cpk194xrvtu"
  });

  const [maxBounds, setMaxBounds] = useState({
    lat: {
      min: -78,
      max: 78
    },
    lng: {
      min: -175,
      max: 175
    }
  });

  useEffect(() => {
    const mapExists = document.querySelector('.mapboxgl-map');

    if (projectLoading || error || !mapExists) return;
    const { project } = singleProjectData;

    const bounds = JSON.parse(project.mapBounds);

    console.log(project);
    console.log(bounds.geometry.coordinates);
    const geometry = bounds.geometry.coordinates[0];

    // const lng = (geometry[1][0] + geometry[3][0]) / 2;
    // const lat = (geometry[1][1] + geometry[3][1]) / 2;


    // console.log(lat, lng);


    const vwprt = new WebMercatorViewport(viewport);
const bound = vwprt.fitBounds(
  [geometry[1], geometry[3]],
  {padding: 5, offset: [0, 0]}
);
 
    setViewport(
      bound
    );

    setMapConfig({
      mapStyle: project.mapStyle,
      minZoom: bound.zoom
    });

    setMaxBounds({
      lat: {
        min: geometry[3][1],
        max: geometry[1][1]
      },
      lng: {
        min: geometry[3][0],
        max: geometry[1][0]
      }
    })

  }, [singleProjectData]);

  function onViewportChange(_viewport) {
    if ( _viewport.longitude < maxBounds.lng.min ) {
      _viewport.longitude = maxBounds.lng.min;
    }
    else if ( _viewport.longitude > maxBounds.lng.max ) {
      _viewport.longitude = maxBounds.lng.max;
    }
    else if ( _viewport.latitude < maxBounds.lat.min ) {
      _viewport.latitude = maxBounds.lat.min
    }
    else if ( _viewport.latitude > maxBounds.lat.max ) {
      _viewport.latitude = maxBounds.lat.max;
    }

    setViewport(_viewport);
  }

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
    <ViewPortContext.Provider value={{ viewport, setViewport, flyViewPort, onViewportChange, mapConfig, setMapConfig }}>
      {props.children}
    </ViewPortContext.Provider>
  );
}
export { ViewPortContext, ViewPortProvider };