import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import styled, { keyframes } from 'styled-components';
import ListView from '../LocationsListView';
import ShapeListView from '../ShapesListView';
import Tabs from '../SegmentTabs/Tabs';
import Pagination from '../Pagination/Pagination';
import AddLocation from './AddLocation';
import UpdateLocation from './UpdateLocation';
import AddShape from './AddShape';
import UpdateShape from './UpdateShape';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';
import { ShapeEditorContext } from '../../providers/ShapeEditorProvider';
import MapSettings from '../MapSettings';

export const LayerStyle = styled.div`
    display: block;
    border: 0;
    top: 0;
    border-radius: 0;
    width: auto;
    margin: 0;
    box-shadow: none;
    overflow: hidden;
    right: 0;
    flex-basis: 0%;
    padding: 0;
    max-width: 100%;
    opacity: 0;
    visibility: hidden;
    height: calc(100vh - 60px);
    will-change, visibility, opacity, padding, flex-basis;
    transition: visibility 0.2s ease, flex-basis 0.4s ease, padding 0.2s ease, opacity 0.3s ease;
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
  display: block;
`;

const SecondaryRightPanel = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    right: -100%;
    visibility: hidden;
    opacity: 0;
    will-change, visibility, opacity, right;
    transition: visibility 0.2s ease, opacity 0.2s ease, right 0.3s ease;

    &.expandIn {
        opacity: 1;
        visibility: visible;
        right: 0;
    }


    button {
        font-family: ${props => props.theme.boldFont};
    }
`;


function RightPanel(props) {
    const router = useRouter();
    const page = router.query.page
    const [locPageNum, setLocPageNum] = useState(parseFloat(page) || 1);
    const [shapePageNum, setShapePageNum] = useState(parseFloat(page) || 1);
    const { dropMarker, editLocation } = useContext(LocationEditorContext);
    const { addShape, singleFeature, editShape } = useContext(ShapeEditorContext);

    const [editLoc, setEditLoc] = useState(editLocation);
    const [editShp, setEditShp] = useState(editShape);

    useEffect(() => {
        setEditLoc(editLocation);
    }, [editLocation]);

    useEffect(() => {
        setEditShp(editShape);
    }, [editShape]);


    const { layerOpen, updateLocation, updateShape, enableMarker, showMarker } = props;
    return <LayerStyle
        className={layerOpen && 'expandIn'}>
        <Tabs id={props.id}>
            <div label="Locator" icon="view_list">
                <StickyTabs>
                    <Pagination page={locPageNum} setPageNum={setLocPageNum} />
                </StickyTabs>
                <ListView page={locPageNum} updateLocation={updateLocation} />
                {showMarker && <SecondaryRightPanel className={'expandIn'}>
                    {editLoc ? <UpdateLocation enableMarker={enableMarker} /> : <AddLocation enableMarker={enableMarker} />}
                </SecondaryRightPanel>}
            </div>
            <div label="Shapes" icon="layers">
                <ShapeListView page={shapePageNum} updateShape={updateShape}/>
                {singleFeature && <SecondaryRightPanel className={'expandIn'}>
                    {editShp ? <UpdateShape /> : <AddShape />}
                </SecondaryRightPanel>}
            </div>
            <div label="Map Settings" icon="settings">
                <MapSettings />
            </div>
        </Tabs>
    </LayerStyle>
}

export default RightPanel;