import styled from 'styled-components';

const MainSideBarStyle = styled.aside`
height: 100vh;
z-index: 100;
will-change:transform;
transition: transform 0.2s ease-in-out;
background-color: #ffffff;

@media (min-width: 700px) {
    transform: translateX(0);
    border-right: 1px solid ${props => props.theme.lightgrey};
}

@media (min-width: 900px) {
    flex-basis: 15%;
}

`;

export default MainSideBarStyle;