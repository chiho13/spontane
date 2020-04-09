import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from  '../../../../components/Dashboard/LocationViewSwitcher';
import MapView from  '../../../../components/LocationsMapView';
import Title from '../../../../components/Dashboard/MainContentTitle';
import Head from 'next/head';
import styled from 'styled-components';

const MapViewStyle = styled.div`
.map-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 140px)
}`;

const Locations = props => (
  <DashboardLayout>
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
