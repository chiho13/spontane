import ProjectsLayout from '../../components/Layout/ProjectsLayout';
import Title from '../../components/Dashboard/MainContentTitle';
import Projects from '../../components/Dashboard/Project/Project';

const Admin = () => (
  <ProjectsLayout>
    <Title title="My Maps" />

    <Projects />
  </ProjectsLayout>
);

export default Admin;