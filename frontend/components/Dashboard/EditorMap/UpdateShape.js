
import React, { useState, useEffect, useContext } from 'react';

import { ShapeEditorContext } from '../../providers/ShapeEditorProvider';
import { Mutation } from 'react-apollo';
import { LocationFormStyle } from './LocationForm';
import { invertTheme } from '../../Login';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../../UIKIT/iButton';
import SelectColor from './SelectColor';
import SelectOpacity from './Opacity';
import LineStyle from './LineStyle';
import LineThickness from './LineThickness';
import { toast } from 'react-toastify';
import { ViewPortContext } from '../../providers/MapProvider';
import gql from 'graphql-tag';
import { UserContext } from '../../Layout/DashboardLayout';
import { useRouter } from 'next/router';
import { css } from 'glamor';

toast.configure();


const UPDATE_SHAPE_MUTATION = gql `
    mutation UPDATE_SHAPE_MUTATION(
        $id: ID!
        $geojson: String!
        $user: String
    ) {
        updateShape(
            id: $id
            geojson: $geojson
            user: $user
        ) {
            id
        }
    }
`;

const UpdateShapeStyle = styled.div`
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

    .cancel_update {
        border: 0;
        background: none;
        color: ${props => props.theme.brandColor};
        font-family: ${props => props.theme.fontFamily};
        font-size: 16px;
        margin-left: 40px;
        margin-top: 8px;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const ShapeProperties = styled.fieldset`
margin: 0;
h4 {
    font-family: ${props => props.theme.boldFont};
    font-size: 18px;
    padding-left: 24px;
}
`;

const ShapeContainer = styled.div`
    margin-bottom: 250px;
`;

const SelectColorsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 16px;

    label {
        margin-top: 0;
    }

    border-bottom: 1px solid #aaaaaa;

    @media (min-width: 1408px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
 
`;

function AddShape() {
    const router = useRouter();
    const { user, refetch } = useContext(UserContext);
    const { form, setForm, handleChange, addShape, setAddShape, singleFeature, selectedShape, setSelectedShape, setSingleFeature, editShape, shapeUpdateFeature } = useContext(ShapeEditorContext);

    const [fillColor, setFillColor] = useState(form.fillColor);
    const [strokeColor, setStrokeColor] = useState(form.strokeColor);
    const [fillOpacityDec, setFillOpacityDec] = useState(form.fillOpacity);

    const [lineDash, setLineDash] = useState(form.strokeDasharray);
    const [lineThickness, setLineThickness] = useState(form.strokeWidth);
    const [localFeature, setLocalFeature] = useState(null);

    useEffect(() => {
        const clonedFeature = { ...singleFeature };

        clonedFeature.properties.style = {
            stroke: strokeColor,
            fill: fillColor,
            strokeWidth: lineThickness,
            fillOpacity: fillOpacityDec,
            strokeDasharray: lineDash
        }

        clonedFeature.properties.details = form.details;

        setSingleFeature(clonedFeature);

    }, [addShape, fillColor, strokeColor, fillOpacityDec, lineDash, lineThickness, selectedShape]);

    useEffect(() => {
        if (singleFeature) {
            const stringifySingleFeature = JSON.stringify(singleFeature);
            setLocalFeature(stringifySingleFeature);
        }

    }, [singleFeature]);

    const notify = () => toast.success("Shape created!", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });

    async function onSubmit(e, updateShape) {
        e.preventDefault();
        const res = await updateShape({
            variables: {
                id: router.query.id,
                user: user.id,
                geojson: localFeature
            }
        });

        if (res) {
            notify();
            refetch();
            setAddShape(false);
            setSelectedShape(null);
            setSingleFeature(null);
        }
    }

    return <UpdateShapeStyle>
        <Mutation mutation={UPDATE_SHAPE_MUTATION}>
            {(updateShape, { loading, error }) => (<LocationFormStyle onSubmit={e => onSubmit(e, updateShape)}>
                <div className="wrapper">
                    <label htmlFor="details">
                        Title
                    </label>
                    <input className="form-input"
                        type="text"
                        id="details"
                        name="details"
                        placeholder="About this shape"
                        value={form.details}
                        autoComplete="off"
                        required
                        onChange={handleChange} />
                </div>
                <ShapeContainer>
                    <ShapeProperties>
                        <h4>
                            Shape
                    </h4>
                        <SelectColorsContainer>
                            <div>
                                <label>
                                    Fill:
                    </label>
                                <SelectColor setColor={setFillColor} color={fillColor} />
                            </div>

                            <div>
                                <label>
                                    Opacity:
                    </label>
                                <SelectOpacity setOpacityDec={setFillOpacityDec} opacityDec={fillOpacityDec} />
                            </div>
                        </SelectColorsContainer>
                    </ShapeProperties>

                    <ShapeProperties>
                        <h4>
                            Line
                    </h4>
                        <SelectColorsContainer>
                            <div>
                                <label>
                                    Color:
                    </label>
                                <SelectColor setColor={setStrokeColor} color={strokeColor} placement="top-start"/>
                            </div>

                            <div>
                                <label>
                                    Style:
                    </label>
                                <LineStyle setLineDash={setLineDash} lineDash={lineDash} placement="top-start"/>
                            </div>

                            <div>
                                <label>
                                    Thickness:
                            </label>
                                <LineThickness setLineThickness={setLineThickness} lineThickness={lineThickness} placement="top"/>
                            </div>
                        </SelectColorsContainer>
                    </ShapeProperties>
                </ShapeContainer>
                <div className="button_wrapper abs">
                    <ThemeProvider theme={invertTheme}>
                        <Button width="auto" type="submit" disabled={localFeature ? false : true}>Update</Button>
                    </ThemeProvider>

                    <button type="button" className="cancel_update" onClick={() => {
                           setAddShape(false);
                           setSelectedShape(null);
                           setSingleFeature(null);
                    }}>Cancel</button>
                </div>
            </LocationFormStyle>)}
        </Mutation>

    </UpdateShapeStyle>
}

export default AddShape;