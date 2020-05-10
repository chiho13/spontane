import React, { useEffect } from 'react';

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
        }
    }
`;


function ViewPortProvider(props) {
  // new
  const router = useRouter();

  const { data: singleProjectData, loading: projectLoading, error } = useQuery(SINGLE_PROJECT_QUERY, {
    variables: {
      projectID: router.query.id
    }
  });

  const { viewport, setViewport, onViewportChange } = useViewPort({
    latitude: 55,
    longitude: 0,
    zoom: 2
  })

  useEffect(() => {

    if (projectLoading || error) return;
    const { project } = singleProjectData;

    const bounds = JSON.parse(project.mapBounds);

    console.log(bounds.geometry.coordinates);
    const geometry = bounds.geometry.coordinates[0];


    const lng = (geometry[1][0] + geometry[3][0]) / 2;
    const lat = (geometry[1][1] + geometry[3][1]) / 2;


    console.log(lat, lng);


    const vwprt = new WebMercatorViewport(viewport);
const bound = vwprt.fitBounds(
  [geometry[1], geometry[3]],
  {padding: 5, offset: [0, 0]}
);
    // setViewport({
    //   ...viewport,
    //   latitude: lat, longitude: lng, zoom: 2.5
    // });

    setViewport(
      bound
    );


  }, [singleProjectData]);


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
    <ViewPortContext.Provider value={{ viewport, setViewport, flyViewPort, onViewportChange }}>
      {props.children}
    </ViewPortContext.Provider>
  );
}
export { ViewPortContext, ViewPortProvider };