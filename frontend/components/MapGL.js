import MapGL, {WebMercatorViewport} from 'react-map-gl';
import React, { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ViewPortContext } from './providers/MapProvider';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import {UserContext} from './Layout/DashboardLayout';

export const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2ZJApZ0Rg5UTsK7kPw';
const SINGLE_PROJECT_QUERY = gql `
    query SINGLE_PROJECT_QUERY($projectID: ID!) {
        project(where: { id: $projectID }) {
            mapBounds
            mapStyle
        }
    }
`;


const Maps = React.forwardRef((props, ref) => {
    const { viewport, setViewport, onViewportChange, mapConfig, setMapConfig} = useContext(ViewPortContext);

    const router = useRouter();
    const projectID = router.query.id;

    const { data: singleProjectData, loading: projectLoading, error, refetch: refetchProject} = useQuery(SINGLE_PROJECT_QUERY, {
      variables: {
        projectID: projectID || "d324dsf",
      }
    });

    const [mercator, setMercator] = useState(new WebMercatorViewport(viewport));

    useEffect(() => {
        let mounted = true;
        const mapExists = document.querySelector('.mapboxgl-map');
        refetchProject();
        const { project } = singleProjectData;
        if (projectLoading || error || !mapExists || !project) return;
      
        console.log(props.children)
        // console.log(bounds.geometry.coordinates);
        const bounds = JSON.parse(project.mapBounds);
        const geometry = bounds.geometry.coordinates[0];
    
        const lng = (geometry[1][0] + geometry[3][0]) / 2;
        const lat = (geometry[1][1] + geometry[3][1]) / 2;
    
        console.log(lat, lng); 


        console.log(mercator);

        if(mercator.width > 1) {
      const bound = mercator.fitBounds(
        [geometry[1], geometry[3]],
        {padding: 5, offset: [0, 0]}
      );
     
        setViewport(
          bound
        );
    
        console.log(bound);
    
        setMapConfig({
          minZoom: bound.zoom,
        maxBounds: [geometry[1], geometry[3]],
          originalLat: lat,
          originalLng: lng,
          mapStyle: project.mapStyle,
        });
    }
    
    
      return () => mounted = false;
      }, [singleProjectData, mercator]);
      
      useEffect(() => {
          if(mercator.width > 1) return;
        const vwprt = new WebMercatorViewport(viewport);
        setMercator(vwprt);
    });
    return (
        <MapGL ref={ref} {...props} {...viewport} minZoom={mapConfig.minZoom} id="mapGL" width="100%" height="100%" mapStyle={mapConfig.mapStyle} mapboxApiAccessToken={TOKEN} onViewportChange={onViewportChange}
            attributionControl={false}
        >
            {props.children}

        </MapGL>
    );
});

export default Maps;