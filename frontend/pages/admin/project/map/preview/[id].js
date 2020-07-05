import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from '../../../../../components/Dashboard/LocationViewSwitcher';
import MapView from '../../../../../components/LocationsMapView';
import Title from '../../../../../components/Dashboard/MainContentTitle';
import Head from 'next/head';
import styled from 'styled-components';
import { LocationEditorProvider } from '../../../../../components/providers/LocationEditorProvider';
import { ShapeEditorProvider } from '../../../../../components/providers/ShapeEditorProvider';

const MapViewStyle = styled.div`

margin: 32px;

.map-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 220px)
}

.mapboxgl-map {
  visibility: visible !important;
  border-radius: 16px;
  box-shadow: 0 1px 5px 1px rgba(100,105,135,.3);
}


`;

const Locations = props => (
  <DashboardLayout id={props.query.id}>
    <Title title="My Locations" />
    <LocationViewSwitcher />
    <MapViewStyle>
      <LocationEditorProvider>
        <ShapeEditorProvider>
          <MapView locationID={props.query.locationID} minZoom={props.query.minZoom} pathname="map" editButton={true} />
        </ShapeEditorProvider>
      </LocationEditorProvider >
    </MapViewStyle>

  </DashboardLayout>
);

export default Locations;
