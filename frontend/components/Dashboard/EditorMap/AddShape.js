
import React, { useState, useEffect, useContext } from 'react';

import { ShapeEditorContext } from '../../providers/ShapeEditorProvider';

import { LocationFormStyle } from './LocationForm';
import { invertTheme } from '../../Login';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../../UIKIT/iButton';
import SelectColor from './SelectColor';
import { ViewPortContext } from '../../providers/MapProvider';

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
        padding: 24px;
    }
`;

const SelectColorsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
    padding-bottom: 16px;
`;

function AddShape() {
    const { form, setForm, handleChange, addShape, singleFeature, selectedShape} = useContext(ShapeEditorContext);

    const { mapConfig } = useContext(ViewPortContext);
    const [fillColor, setFillColor] = useState(mapConfig.markerColor);

    const [label, setLabel] = useState('Fill Color');

    useEffect(() => {
        setForm({
            ...form,
            fillColor
        });

    }, [addShape, fillColor]);

    useEffect(() => {
        setForm({
            ...form,
            fillColor: mapConfig.markerColor
        });
    }, [addShape, mapConfig]);

    return <AddShapeStyle>
        <LocationFormStyle>
            <SelectColorsContainer>
                <div>
                    <label>
                        Color
                    </label>
                    <SelectColor setColor={setFillColor} color={fillColor} />
                </div>
            </SelectColorsContainer>
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

            <div className="button_wrapper">
                <ThemeProvider theme={invertTheme}>
                    <Button width="auto" type="submit" disabled={singleFeature ? false : true}>Save</Button>
                </ThemeProvider>
            </div>
        </LocationFormStyle>

    </AddShapeStyle>
}

export default AddShape;