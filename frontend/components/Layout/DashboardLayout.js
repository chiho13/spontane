import MainSideBar from '../Dashboard/subComponents/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/subComponents/NavProfilePill';
import styled from 'styled-components';

const MainContent = styled.div`
  display: flex;
@media (min-width: 700px) {
  margin-left: 180px;
  height: 100vh;
  
}

@media (min-width: 900px) {
  margin-left: 200px;
}
`;

const DashboardLayout = props => (
  <div>
    <MainSideBar />
    <MainContent>
        <ProfileNav />
        {props.children}
    </MainContent>
  </div>
);

export default DashboardLayout;