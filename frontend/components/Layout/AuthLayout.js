import styled from 'styled-components';
import Logo from '../Logo';

const AuthStyle = styled.div`
display: block;
height: 100vh;
position: fixed;
width: 100%;
background: linear-gradient(45deg, rgba(0,123,255,1) 0%, rgba(66,151,255,1) 100%);
overflow-y: auto;

svg {
  position: absolute;
  top: 3rem;
  left: 4rem;
  width: 180px;
}
`;

const whitelogo = ({white}) => ({brandColor: white});

const AuthLayout = props => (
  <AuthStyle>
    <Logo theme={whitelogo} />
    {props.children}
  </AuthStyle>
);

export default AuthLayout;