import React, {useEffect} from 'react';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import {ThemeProvider} from 'styled-components';
import Button from './UIKIT/iButton';
import {invertTheme} from './Login';

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

export const LocationFormStyle = styled(Form)`
position: absolute;
display: block;
border: 0;
top: 0;
border-radius: 0;
width: auto;
height: 100%;
margin: 0;
box-shadow: none;
right: -100%;
flex-basis: 0%;
padding: 32px;
max-width: 100%;
overflow-y: auto;
visibility: hidden;
background-color: #f7f7f7;
opacity: 0;
will-change, visibility, opacity, right;
transition: visibility 0.2s ease, opacity 0.2s ease, right 0.2s ease;

&.expandIn {
    opacity: 1;
    visibility: visible;
    right: 0;
}

h2 {
    margin-top: 64px;
}

button {
    font-family: ${props => props.theme.boldFont};
}
`;

function LocationForm(props) {
    const {form, mode, defaultValue, marker, handleChange, loading, error, onSubmit, dropMarker} = props;
    const EditMode = mode === 'EDIT';

        return <LocationFormStyle
                    isOpened={dropMarker}
                    className={dropMarker && 'expandIn'}
                    onSubmit={onSubmit}>
                        <h2>{ EditMode ? 'Update Location' : 'Add Location'}</h2>
                    <Error error={error}/>
                    <fieldset disabled={loading} hasgrid={"true"} aria-busy={loading}>
                        <div className="fieldset_wrapper">
                            <div className="wrapper">
                                <label htmlFor="city">
                                    City/Town
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City or Town"
                                    required
                                    defaultValue={defaultValue.city}
                                    onChange={handleChange}/>
                            </div>
                            <div className="wrapper">
                                <label htmlFor="country">
                                    Country</label>
                                <input
                                     className="form-input"
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    required
                                    defaultValue={defaultValue.country}
                                    onChange={handleChange}
                                    />
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
                                    placeholder="0"
                                    readOnly
                                    value={marker.latitude && parseFloat(marker.latitude).toFixed(4)}
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
                                    placeholder="0"
                                    readOnly
                                    value={marker.longitude && parseFloat(marker.longitude).toFixed(4)}
                                    />
                           </div>
                           
                            <div className="wrapper">
                                <label htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    type="number"
                                    id="description"
                                    name="description"
                                    placeholder="More Information about this place"
                                    required
                                    defaultValue={defaultValue.description}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <ThemeProvider theme={invertTheme}>
                            {EditMode ?  <Button width="auto" disableRipple type="submit">Sav{loading
                                                ? 'ing '
                                                : 'e '}
                                            Changes</Button> : <Button width="auto" disableRipple type="submit">Save</Button>}
                        </ThemeProvider>
                       
                    </fieldset>
                </LocationFormStyle>
}

LocationForm.defaultProps = {
    mode: "EDIT"
}

export default LocationForm;