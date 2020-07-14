import DashboardLayout from '../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from '../../../components/Dashboard/LocationViewSwitcher';
import MapView from '../../../components/MapInteract/LocationsMapView';
import Head from 'next/head';
import styled from 'styled-components';
const MapViewStyle = styled.div`


.map-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 60px)
}


.search_container {
  position: absolute;
  top: 32px;
  margin-left: 32px;
  width: 300px;
  z-index: 10;
  flex-grow: 1;
}

.flex-search {
  display: flex;
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
