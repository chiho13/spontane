import styled from 'styled-components';

const MainSideBarStyle = styled.aside`
top: 0;
position: fixed;
height: 100vh;
z-index: 100;
will-change:transform;
transition: transform 0.2s ease-in-out;
background-color: #ffffff;
transform: translateX(-100%);

@media (min-width: 700px) {
    transform: translateX(0);
    flex: 0 0 25%;
    max-width: 25%;
    box-shadow: 0 0.125rem 9.375rem rgba(90,97,105,.1), 0 0.25rem 0.5rem rgba(90,97,105,.12), 0 0.9375rem 1.375rem rgba(90,97,105,.1), 0 0.4375rem 2.1875rem rgba(165,182,201,.1)
}

@media (min-width: 900px) {
    flex: 0 0 18%;
    min-width: 200px;
    max-width: 18%;
}

`;

export default MainSideBarStyle;