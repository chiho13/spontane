import MapGL, { WebMercatorViewport } from 'react-map-gl';
import React, { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ViewPortContext } from './providers/MapProvider';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import { UserContext } from './Layout/DashboardLayout';

export const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2ZJApZ0Rg5UTsK7kPw';
const SINGLE_PROJECT_QUERY = gql`
    query SINGLE_PROJECT_QUERY($projectID: ID!) {
        project(where: { id: $projectID }) {
            mapBounds
            mapStyle
        }
    }
`;


const Maps = React.forwardRef((props, ref) => {
    const {loading, projectData, } = useContext(UserContext);
    const { viewport, setViewport, onViewportChange, mapConfig, setMapConfig } = useContext(ViewPortContext);

    const router = useRouter();
    const projectID = router.query.id;

    // const { data: singleProjectData, loading: projectLoading, error, refetch: refetchProject } = useQuery(SINGLE_PROJECT_QUERY, {
    //     variables: {
    //         projectID: projectID,
    //     }
    // });

    const [mercator, setMercator] = useState(new WebMercatorViewport(viewport));

    useEffect(() => {
        if (loading || !projectData) return;

        const bounds = JSON.parse(projectData.mapBounds);
        const geometry = bounds.geometry.coordinates[0];

        const lng = (geometry[1][0] + geometry[3][0]) / 2;
        const lat = (geometry[1][1] + geometry[3][1]) / 2;

        if (mercator.width > 1) {
            const bound = mercator.fitBounds(
                [geometry[1], geometry[3]],
                { padding: 5, offset: [0, 0] }
            );

            setViewport(
                bound
            );

            setMapConfig({
                minZoom: bound.zoom,
                maxBounds: [geometry[1], geometry[3]],
                originalLat: lat,
                originalLng: lng,
                mapStyle: projectData.mapStyle,
                markerColor: projectData.markerColor,
                title: projectData.title,
                loadedMap: true
            });

        }

    }, [loading, mercator]);

    useEffect(() => {
        let vwprt = new WebMercatorViewport(viewport);
          if(mercator.width > 1) return;
        setMercator(vwprt);

    });

    return (
        <MapGL ref={ref} {...props} {...viewport} minZoom={mapConfig.minZoom} id="mapGL" width="100%" height="100%" mapStyle={mapConfig.mapStyle} mapboxApiAccessToken={TOKEN} onViewportChange={onViewportChange}
            attributionControl={false}
            doubleClickZoom={false}
        >
            {props.children}

        </MapGL>
    );
});

export default Maps;