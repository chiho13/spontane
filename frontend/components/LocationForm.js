import React from 'react';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

function CreateLocationForm(props) {
    const {form, mode, defaultValue, marker, handleChange, loading, error, onSubmit} = props;
    const EditMode = mode === 'EDIT';
        return <Form
                    onSubmit={onSubmit}>
                    <Error error={error}/>
                    <fieldset disabled={loading} hasgrid={"true"} aria-busy={loading}>
                        <div className="fieldset_wrapper">
                            <div className="wrapper">
                                <label htmlFor="city">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
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
                                    />
                            </div>
                           
                            <div className="wrapper">
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
                            <div className="wrapper">
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
                                    placeholder="Enter a description"
                                    required
                                    defaultValue={defaultValue.description}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        {EditMode ?  <button type="submit">Sav{loading
                                                ? 'ing '
                                                : 'e '}
                                            Changes</button> : <button type="submit">Submit</button>}
                    </fieldset>
                </Form>
}

export default CreateLocationForm;