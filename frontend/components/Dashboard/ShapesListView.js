import React, {useEffect, useContext, useState, useMemo} from 'react';
import styled from 'styled-components';
import {perPage} from '../../config';

import {UserContext} from '../Layout/DashboardLayout';
import LocationItemStyles from './LocationListViewItem/LocationListViewItemStyle';
import DeleteButton from '../IconButtons/DeleteButton';
import { ShapeEditorContext } from '../providers/ShapeEditorProvider';
import Skeleton from './Skeleton';

import { useMutation } from '../hooks/useMutation';
import gql from 'graphql-tag';

const DELETE_SHAPE_MUTATION = gql`
mutation DELETE_SHAPE_MUTATION($id: ID!) {
    deleteShape(id: $id) {
        id
    }
}
`;


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
    const geojson = JSON.parse(shape.geojson);
    const {refetch} = useContext(UserContext);

    const [deleteShape] = useMutation(DELETE_SHAPE_MUTATION, {
        variables: {
            id: shape.id
        }
    });

    async function deleteStuff(e) {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this shape?')) {
            const res = await deleteShape();
            if (res) {
                refetch();
            }
        }
    }
    return (
        <LocationItemStyles >
            <div className="location_content">
                <h3>{geojson.properties.details}</h3>
            </div>
            <div className="buttonList">
                <DeleteButton showButton={true} deleteStuff={deleteStuff}/>
            </div>
        </LocationItemStyles>
    )
}

const ShapesListView = (props) => {
    const {loading, projectData: filteredProject} = useContext(UserContext);
    const {setHoverShape} = useContext(ShapeEditorContext);
    
    const {page, updateShape} = props;

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

                return <li key={_shape.id}
                onClick={() => {
                    updateShape(_shape);
                }}
                onMouseEnter={() => {
                    setHoverShape(_shape.id);
                }}
                onMouseLeave={() => {
                    setHoverShape('');
                }}
                >
                    <ShapeListViewItem shape={_shape} />
                </li>
            })
            }
        </ShapesListViewStyle>
    );
}

export default ShapesListView;
