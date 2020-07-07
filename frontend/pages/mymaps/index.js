import ProjectsLayout from '../../components/Layout/DashboardLayout';

import Projects from '../../components/Dashboard/Project/Project';

const mymaps = () => (
  <ProjectsLayout hideList={true}>
    <Projects />
  </ProjectsLayout>
);

export default mymaps;