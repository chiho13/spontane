import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import Form from '../../styles/Form';
import Error from '../../ErrorMessage';
import { ThemeProvider } from 'styled-components';
import Button from '../../UIKIT/iButton';
import { invertTheme } from '../../Login';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';
import styled, { keyframes } from 'styled-components';
import { fadeInRight, fadeOutRight } from 'react-animations';
import Cross from '../../Icons/Cross';
import CustomMarker from './CustomMarker';
import SelectMarkerColor from './SelectMarkerColor';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeOutRightAnimation = keyframes`${fadeOutRight}`;

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

export const LocationFormStyle = styled(Form)`
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

h2 {
    margin-top: 24px;
}

.wrapper {
    position: relative;
    grid-column: span 2;
}

button {
    font-family: ${props => props.theme.boldFont};
    padding: 0;
}

fieldset {
    position: relative;
}

.button_wrapper {
    position: sticky;
    display: flex;
    bottom: 0;
    right: 0;
    padding: 24px;
    padding-top: 16px;
    width: 100%;
    background-color: #f1f1f1;
    box-shadow: 0 -5px 6px rgba(0, 0, 0, 0.1);

    button[type="submit"] {
        margin-top: 8px;
    }
}


.form-input {
    width: 90%;
}

.fieldset_wrapper {
    padding: 24px;
}
`;

const SuggestionBoxStyle = styled.div`
    display: block;
    background: rgba(255,255,255,0.9);
    animation: 0.6s ${fadeInRightAnimation};
    position: absolute;
    top: 21px;
    right: -8px;
    max-height: 100px;
    width: 66%;
    border-radius: 8px;
    padding: 4px;
    box-shadow: 2px 2px 2px ${props => props.theme.brandColor};
    border: 1px solid #eeeeee;

    .suggestion_title {
        font-family: 'nunito';
        font-size: 14px;
        font-style: italic;
        margin-left: 8px;
    }

    button {
        -webkit-appearance: none;
        background: none;
        font-family: 'nunito';
        font-size: 16px;
        border: none;
        color: ${props => props.theme.brandColor};
        cursor: pointer;
        padding: 8px;
    }

    .clickSuggestion {
        &:hover {
            text-decoration: underline;
        }
    }

    .closeSuggestion {
        position: absolute;
        height: 32px;
        top:0;
        right: 0;
        &:hover svg {
            fill: ${props => props.theme.brandColor};
        }
    }
`;

const SelectMarkerContainer = styled.div`
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 2px solid #cccccc;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    background-color: #f1f1f1;

    .current_marker {
        font-size: 16px;
        padding-left: 8px;
    }

    span.dynamic_marker {
        transform: none !important; 
    }

    svg {
        filter: none !important;
        animation: none !important;
    }
`;


function SuggestionBox(props) {
    const { suggestions, onClose, insertForm} = props;
    return <SuggestionBoxStyle>
        <div className="suggestion_title">Suggested</div>
        <button type="button" className="clickSuggestion" onClick={insertForm}>
            {suggestions}
        </button>
        <button type="button" className="closeSuggestion" onClick={onClose}>
            <Cross />
        </button>
    </SuggestionBoxStyle>
}

function LocationForm(props) {
    const { suggestions, setSuggestions, form, setForm, dropMarker } = useContext(LocationEditorContext);
    const { mode, defaultValue, handleChange, loading, error, onSubmit } = props;

    function closeSuggestion(suggest) {
        switch(suggest) {
            case 'place': 
            setSuggestions({
                ...suggestions,
                place: null
            });
            break;

            case 'address':
            setSuggestions({
                ...suggestions,
                address: null
            });
    }
    }

    function insertInForm(suggest) {
        switch(suggest) {
            case 'place': 
            setForm({
                ...form,
                city: suggestions.place
            });
            break;
            case 'address':
                setForm({
                    ...form,
                    country: suggestions.address
                });
        }
        closeSuggestion(suggest);
    }
          
    const EditMode = mode === 'EDIT';
    return <LocationFormStyle
        onSubmit={onSubmit}>
        <SelectMarkerContainer>
            <SelectMarkerColor form={defaultValue} setForm={setForm} dropMarker={dropMarker} />
            <CustomMarker form={defaultValue} setForm={setForm} dropMarker={dropMarker}/>
        </SelectMarkerContainer>
        <fieldset disabled={loading} hasgrid={"true"} aria-busy={loading}>
            <div className="fieldset_wrapper">
                <div className="wrapper">
                    {suggestions.place && <SuggestionBox suggestions={suggestions.place} onClose={() => closeSuggestion('place')} insertForm={() => insertInForm('place')} />}
                    <label htmlFor="city">
                        Place name
                                </label>
                    <input
                        className="form-input"
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Drop marker to get suggested place name"
                        required
                        value={defaultValue.city}
                        autoComplete="off"
                        onChange={handleChange} />
                </div>

                <div className="wrapper">
                {suggestions.address && <SuggestionBox suggestions={suggestions.address} onClose={() => closeSuggestion('address')} insertForm={() => insertInForm('address')} />}
                    <label htmlFor="city">
                        Address
                                </label>
                    <input
                        className="form-input"
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Drop marker on map to get suggested address"
                        required
                        value={defaultValue.country}
                        autoComplete="off"
                        onChange={handleChange} />
                </div>

                <div className="geowrapper">
                    <label htmlFor="latitude">
                        Latitude:
                                </label>
                    <input
                        className="form-input"
                        type="number"
                        id="latitude"
                        name="latitude"
                        readOnly
                        value={defaultValue.latitude && parseFloat(defaultValue.latitude).toFixed(4)}
                    />
                </div>

                <div className="geowrapper">
                    <label htmlFor="longitude">
                        Longitude:
                                </label>

                    <input
                        className="form-input"
                        type="number"
                        id="longitude"
                        name="longitude"
                        readOnly
                        value={defaultValue.longitude && parseFloat(defaultValue.longitude).toFixed(4)}
                    />
                </div>

                <div className="wrapper">
                    <label htmlFor="description">
                        More Info
                                </label>
                    <textarea
                        type="number"
                        id="description"
                        name="description"
                        placeholder="More Information about this place"
                        required
                        value={defaultValue.description}
                        onChange={handleChange} />
                </div>
            </div>
            <div className="button_wrapper">
                <ThemeProvider theme={invertTheme}>
                    {EditMode ? <Button width="auto" type="submit">{loading
                        ? 'Updating '
                        : 'Update '}
                    </Button> : <Button width="auto" type="submit" disabled={form.latitude == 0}>Save</Button>}
                </ThemeProvider>
            </div>

        </fieldset>
    </LocationFormStyle>
}

LocationForm.defaultProps = {
    mode: "EDIT"
}

export default LocationForm;