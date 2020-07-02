import React, {useEffect, useContext, useState, useMemo} from 'react';
import styled from 'styled-components';
import {perPage} from '../../config';

import {UserContext} from '../Layout/DashboardLayout';
import LocationItemStyles from './LocationListViewItem/LocationListViewItemStyle';
import DeleteButton from '../IconButtons/DeleteButton';


import Skeleton from './Skeleton';


const ShapesListViewStyle = styled.ol`
    display: block;
    max-width: ${props => props.theme.maxWidth};
    padding-bottom: 32px;
    height: calc(100vh - 182px);
    overflow-y: scroll;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const ShapeListViewItem = (props) => {
    const {shape} = props;
    return (
        <LocationItemStyles>
            <div className="location_content">
                <h3>{shape.properties.details}</h3>
            </div>
            <div className="buttonList">
                {/* <DeleteButton locationID={shap.id} showButton={true}/> */}
            </div>
        </LocationItemStyles>
    )
}

const ShapesListView = (props) => {
    const {loading, projectData: filteredProject} = useContext(UserContext);

    const {page} = props;

    const MemoiseShapes = useMemo(() => {
        if(loading) return;
        const reversed =  [...filteredProject.shapes].reverse();
        const shapes = reversed.slice((page - 1) * perPage, page * perPage);
        return shapes;
    }, [filteredProject, loading, page]);

    if(loading) {
        return <ShapesListViewStyle>
                    <Skeleton count={3} />
             </ShapesListViewStyle>
    }
    return (
        <ShapesListViewStyle>
            { MemoiseShapes.map((_shape) => {
                const parseJSON = JSON.parse(_shape.geojson);

                return <li key={_shape.id}>
                    <ShapeListViewItem shape={parseJSON} />
                </li>
            })
            }
        </ShapesListViewStyle>
    );
}

export default ShapesListView;
