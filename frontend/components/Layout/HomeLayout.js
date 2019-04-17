import Header from '../Header'
import styled from 'styled-components';
import Head from 'next/head';

const HomeStyle = styled.div`
  .map-container {
    width: 100vw;
    height: 100vh;
  }
`;

const Layout = props => (
  <HomeStyle>
    <Head>
      <title>Spontane</title>
    </Head>
    <Header />
    {props.children}
  </HomeStyle>
);

export default Layout;