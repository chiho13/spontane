import DashboardLayout from '../../../components/Layout/DashboardLayout';
import Title from '../../../components/Dashboard/MainContentTitle';
import Projects from '../../../components/Dashboard/Project/Project';

const Admin = () => (
  <DashboardLayout>
    <Title title="Projects" />

    <Projects />
  </DashboardLayout>
);

export default Admin;