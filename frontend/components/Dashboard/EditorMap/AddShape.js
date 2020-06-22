
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

const AddShapeStyle = styled.div`
    position: absolute;
    display: block;
    border: 0;
    top: 0;
    height: 100%;
    border-radius: 0;
    width: 100%;
    margin: 0;
    box-shadow: none;
    right: 0;
    flex-basis: 0%;
    padding: 0;
    max-width: 100%;
    background-color: #f1f1f1;
    height: calc(100vh - 100px);
    overflow-y: auto;
`;

function AddShape() {
    return <AddShapeStyle>
            Add Shape
    </AddShapeStyle>
}

export default AddShape;