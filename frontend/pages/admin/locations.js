import Map from '../../components/AllLocations'
import DashboardLayout from '../../components/Layout/DashboardLayout';

const Locations = props => (
  <DashboardLayout>
    <Map id={props.query.id} lat={props.query.lat} lon={props.query.lon}/>
  </DashboardLayout>
);

export default Locations;
