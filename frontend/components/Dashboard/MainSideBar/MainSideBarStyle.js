import styled from 'styled-components';

const MainSideBarStyle = styled.nav`
display: flex;
width: 100vw;
z-index: 100;
will-change:transform;
transition: transform 0.2s ease-in-out;
background-color: #ffffff;
position: absolute;

@media (min-width: 700px) {
    transform: translateX(0);
    border-right: 1px solid ${props => props.theme.lightgrey};
}


.headerLogo {
    width: 100px;
}

`;

export default MainSideBarStyle;