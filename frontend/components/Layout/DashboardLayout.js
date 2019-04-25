import MainSideBar from '../Dashboard/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/NavProfilePill/NavProfilePill';
import styled from 'styled-components';

const MainContent = styled.div`
  display: flex;
  position: relative;
@media (min-width: 700px) {
  margin-left: 172px;
  height: 100vh;
  
}

@media (min-width: 900px) {
  margin-left: 200px;
}

.dashboard_content {
  width: 100%;
}
`;

const DashboardLayout = props => (
  <div>
    <MainSideBar />
    <MainContent>
        <ProfileNav />
        <div className="dashboard_content">
          {props.children}
        </div>
    </MainContent>
  </div>
);

export default DashboardLayout;