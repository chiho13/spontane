import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {ThemeProvider} from 'styled-components';
import styled, {keyframes} from 'styled-components';
import ListView from '../LocationsListView';
import Tabs from '../SegmentTabs/Tabs';
import Pagination from '../Pagination/Pagination';

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

border: 0;
top: 0;
border-radius: 0;
width: auto;
margin: 0;
box-shadow: none;
right: 0;
flex-basis: 0%;
padding: 0;
max-width: 100%;
opacity: 0;
visibility: hidden;
background-color: #f1f1f1;
height: calc(100vh - 60px);
will-change, visibility, opacity, padding, flex-basis;
transition: visibility 0.2s ease, flex-basis 0.3s ease, padding 0.2s ease, opacity 0.2s ease;
box-shadow: 8px 0 10px -4px rgba(100, 100, 100, 0.3), -12px 0 10px -4px rgba(100, 100, 100, 0.3);

> div {
    display: none;
}

&.expandIn {
    position: relative;
    flex-basis: 30%;
    opacity: 1;
    visibility: visible;

    > div {
        display: block;
    }
}

h2 {
    margin-top: 32px;
}

button {
    font-family: ${props => props.theme.boldFont};
}
`;

const StickyTabs = styled.div`
  position: sticky;
  top: 0;
  padding-top: 4px;
  display: block;
  background-color: #f1f1f1;
  z-index: 10;
  padding-bottom: 4px;
`;


function RightPanel(props) {

    const router = useRouter();
    const page = router.query.page
    const [pageNum, setPageNum] = useState(parseFloat(page) || 1);
    const {layerOpen} = props;
        return <LayerStyle
                    className={layerOpen && 'expandIn'}>
                        {/* <h2>Layers</h2> */}
                        <Tabs id={props.id}>
                            <div label="Locations" icon="view_list">
                                <StickyTabs>
                                    <Pagination page={pageNum} setPageNum={setPageNum}/>
                                </StickyTabs>
                                 <ListView page={pageNum}/>
                                 {props.children}
                             </div>
                            <div label="Map Settings" icon="settings">
                                map
                            </div>
                         </Tabs>
                      
                </LayerStyle>
}

export default RightPanel;