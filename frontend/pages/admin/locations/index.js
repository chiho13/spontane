import DashboardLayout from '../../../components/Layout/DashboardLayout';
import LocationViewSwitcher from  '../../../components/Dashboard/subComponents/LocationViewSwitcher';
import Title from '../../../components/Dashboard/subComponents/MainContentTitle';

const Locations = props => (
  <DashboardLayout>
    <div>
    <Title title="My Locations" />
    <LocationViewSwitcher id={props.query.id} lat={props.query.lat} lon={props.query.lon} />
    </div>
   
  </DashboardLayout>
);

export default Locations;
