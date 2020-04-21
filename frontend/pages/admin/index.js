import ProjectsLayout from '../../components/Layout/ProjectsLayout';
import Title from '../../components/Dashboard/MainContentTitle';
import Projects from '../../components/Dashboard/Project/Project';

const Admin = () => (
  <ProjectsLayout>
    <Title title="Projects" />

    <Projects />
  </ProjectsLayout>
);

export default Admin;