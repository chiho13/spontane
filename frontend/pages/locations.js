import Map from '../components/AllLocations'
import HomeLayout from '../components/Layout/HomeLayout';

const Locations = props => (
  <HomeLayout>
    <Map id={props.query.id} lat={props.query.lat} lon={props.query.lon}/>
  </HomeLayout>
);

export default Locations;
