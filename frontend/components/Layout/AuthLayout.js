import styled from 'styled-components';

const AuthStyle = styled.div`
display: block;
height: 100vh;
position: fixed;
width: 100%;
background: linear-gradient(45deg, rgba(0,123,255,1) 0%, rgba(66,151,255,1) 100%);
overflow-y: auto;
`;

const AuthLayout = props => (
  <AuthStyle>
    {props.children}
  </AuthStyle>
);

export default AuthLayout;