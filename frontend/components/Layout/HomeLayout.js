import Header from '../Header'
import styled from 'styled-components';

const HomeStyle = styled.div`
  .map-container {
    width: 100vw;
    height: 100vh;
  }
`;

const Layout = props => (
  <HomeStyle>
    <Header />
    {props.children}
  </HomeStyle>
);

export default Layout;