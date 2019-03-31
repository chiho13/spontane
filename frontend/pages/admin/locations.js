import AllLocations from '../../components/LocationsMapView'
import DashboardLayout from '../../components/Layout/DashboardLayout';
import LocationViewSwitcher from  '../../components/Dashboard/subComponents/LocationViewSwitcher';

const Locations = props => (
  <DashboardLayout>
    {/* <AllLocations id={props.query.id} lat={props.query.lat} lon={props.query.lon}/> */}
    <LocationViewSwitcher />
  </DashboardLayout>
);

export default Locations;
