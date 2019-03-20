import MainSideBar from '../Dashboard/subComponents/MainSideBar/MainSideBar';

const DashboardLayout = props => (
  <div>
    <MainSideBar />
    {props.children}
  </div>
);

export default DashboardLayout;