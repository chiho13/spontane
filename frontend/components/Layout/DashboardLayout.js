import MainSideBar from '../Dashboard/subComponents/MainSideBar/MainSideBar';
import styled from 'styled-components';

const MainContent = styled.div`
  height: 100vh;

@media (min-width: 700px) {
  margin-left: 180px;
}

@media (min-width: 900px) {
  margin-left: 200px;
}
`;

const DashboardLayout = props => (
  <div>
    <MainSideBar />
    <MainContent>
        {props.children}
    </MainContent>
  </div>
);

export default DashboardLayout;