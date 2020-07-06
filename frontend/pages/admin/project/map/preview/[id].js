import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from '../../../../../components/Dashboard/LocationViewSwitcher';
import MapView from '../../../../../components/LocationsMapView';
import Head from 'next/head';
import styled from 'styled-components';
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

.search_container {
  position: absolute;
  top: 32px;
  margin-left: 32px;
  width: 250px;
  z-index: 10;
}


`;

const Locations = props => (
  <DashboardLayout id={props.query.id}>
    <MapViewStyle>
          <MapView locationID={props.query.locationID} minZoom={props.query.minZoom} pathname="map" editButton={true} />
    </MapViewStyle>
  </DashboardLayout>
);

export default Locations;
