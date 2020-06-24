
import React, { useState, useEffect, useContext } from 'react';

import { ShapeEditorContext } from '../../providers/ShapeEditorProvider';

import { LocationFormStyle } from './LocationForm';

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
    padding: 8px;
    max-width: 100%;
    background-color: #f1f1f1;
    height: calc(100vh - 100px);
    overflow-y: auto;

    .wrapper {
        padding: 16px;
    }
`;

function AddShape() {
    const { form, handleChange, selectedShape } = useContext(ShapeEditorContext);
    return <AddShapeStyle>
        <LocationFormStyle>
            <div className="wrapper">
                <label htmlFor="details">
                    More Info
                    </label>
                <input className="form-input"
                    type="text"
                    id="details"
                    name="details"
                    placeholder="More info about this shape"
                    value={form.details}
                    autoComplete="off"
                    onChange={handleChange} />
            </div>
        </LocationFormStyle>
    </AddShapeStyle>
}

export default AddShape;