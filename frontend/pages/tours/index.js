import HomeLayout from '../../components/Layout/HomeLayout';
import AllLocations from '../../components/LocationsMapView';

const HomeTour = (props) => (
  <HomeLayout>
      <AllLocations id={props.query.id} lat={props.query.lat} lon={props.query.lon} pathname="/tour" editButton={false}/>
  </HomeLayout>
);

export default HomeTour;