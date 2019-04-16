import UpdateLocation from '../../../components/UpdateLocation';
import DashboardLayout from '../../../components/Layout/DashboardLayout';

const Update = props => (
    <DashboardLayout><UpdateLocation id={props.query.id}/></DashboardLayout>
)

export default Update;