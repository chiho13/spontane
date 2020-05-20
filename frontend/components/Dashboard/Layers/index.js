import React, {useEffect} from 'react';
import Router from 'next/router';


import {ThemeProvider} from 'styled-components';


import styled, {keyframes} from 'styled-components';
import { fadeInLeft, fadeOutRight} from 'react-animations';

// const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
// const fadeOutRightAnimation = keyframes`${fadeOutRight}`;

const expandIn = keyframes`

0% {
    flex-basis: 0;
    opacity: 0;
}

100% {
    flex-basis: 35%;
    opacity: 1;
}

`;

const expandOut = keyframes`

0% { 
    padding: 32px;
    flex-basis: 35%;
    opacity: 1;
}

100% {
    padding: 0;
    opacity: 0;
    flex-basis: 0;
}

`;

export const LayerStyle = styled.div`
display: block;
position: relative;
border: 0;
top: 0;
border-radius: 0;
width: auto;
margin: 0;
box-shadow: none;
left: 0;
flex-basis: 0%;
padding: 0;
max-width: 100%;
overflow-y: auto;
flex-basis: 30%;
background-color: #eeeeee;
will-change, visibility, opacity, padding, flex-basis;
transition: visibility 0.2s ease, flex-basis 0.3s ease, padding 0.2s ease, opacity 0.2s ease;
box-shadow: 0 9px 0px 0px white, 0 -9px 0px 0px white, 8px 0 10px -4px rgba(100, 100, 100, 0.3), -12px 0 10px -4px rgba(100, 100, 100, 0.3);

&.expandIn {
    padding: 32px;
    opacity: 1;
    visibility: visible;
}

h2 {
    margin-top: 32px;
}

button {
    font-family: ${props => props.theme.boldFont};
}
`;

function Layers(props) {
    const {dropMarker} = props;
        return <LayerStyle
                    className={dropMarker && 'expandIn'}>
                        <h2>Layers</h2>
                        {props.children}
                </LayerStyle>
}


export default Layers;