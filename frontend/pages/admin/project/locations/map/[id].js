import DashboardLayout from '../../../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from  '../../../../../components/Dashboard/LocationViewSwitcher';
import MapView from  '../../../../../components/LocationsMapView';
import Title from '../../../../../components/Dashboard/MainContentTitle';
import Head from 'next/head';
import styled from 'styled-components';

const MapViewStyle = styled.div`

margin: 32px;

.map-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 190px)
}

.mapboxgl-map {
  border-radius: 16px;
  box-shadow: 0 1px 5px 1px rgba(100,105,135,.3);
}

`;

const Locations = props => (
  <DashboardLayout id={props.query.id}>
    <Head>
      <title>My Locations</title>
    </Head>
    <Title title="My Locations" />
    <LocationViewSwitcher />
    <MapViewStyle>
        <MapView id={props.query.id} lat={props.query.lat} lon={props.query.lon} pathname="map" editButton={true}/>
    </MapViewStyle>
  
  </DashboardLayout>
);

export default Locations;
