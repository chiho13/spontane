import React, {useEffect} from 'react';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import {ThemeProvider} from 'styled-components';
import Button from './UIKIT/iButton';
import {invertTheme} from './Login';
  
function LocationForm(props) {
    const {form, mode, defaultValue, marker, handleChange, loading, error, onSubmit} = props;
    const EditMode = mode === 'EDIT';

        return <Form fixed={true}
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
                                            Changes</Button> : <Button width="auto" disableRipple type="submit">Submit</Button>}
                        </ThemeProvider>
                       
                    </fieldset>
                </Form>
}

LocationForm.defaultProps = {
    mode: "EDIT"
}

export default LocationForm;