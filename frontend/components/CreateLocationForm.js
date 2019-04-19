import React from 'react';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

function CreateLocationForm(props) {
    const {form, marker, handleChange, createLocation, loading, error} = props;
        return <Form
                    onSubmit={async e => {
                    e.preventDefault();
                    const res = await createLocation();
                    console.log(res);
                    Router.push({
                        pathname: '/admin/locations',
                        query: {
                            view: 'Map',
                            id: res.data.createLocation.id,
                            lat: form.latitude,
                            lon: form.longitude
                        }
                    })
                }}>
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
                                    value={form.city}
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
                                    value={form.country}
                                    onChange={handleChange}/>
                            </div>
                           
                            <div className="wrapper">
                                <label htmlFor="latitude">
                                    Latitude:
                                </label>
                                <input
                                    type="text"
                                    id="latitude"
                                    name="latitude"
                                    placeholder="0"
                                    disabled
                                    value={marker.latitude && parseFloat(marker.latitude).toFixed(4)}
                                    />

                            </div>
                            <div className="wrapper">
                                <label htmlFor="longitude">
                                    Longitude:
                                </label>

                                <input
                                    type="text"
                                    id="longitude"
                                    name="longitude"
                                    placeholder="0"
                                    disabled
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
                                    value={form.description}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
}

export default CreateLocationForm;