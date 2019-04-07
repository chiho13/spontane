import React, {PureComponent} from 'react';
import {Marker, FlyToInterpolator} from 'react-map-gl';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import CityPin from './Icons/CityMarker';
import Location from './LocationMapViewItem';
import Link from 'next/link';
import getCoordinates from './helpers/offsetLocation';
import MapGL from './MapGL';

const ALL_LOCATIONS_QUERY = gql `
        query ALL_LOCATIONS_QUERY {
          locations {
            id
            country
            city
            geoLocation {
                latitude
                longitude
            }
            description
          }
        }
`;

const SINGLE_LOCATION_QUERY = gql `
    query SINGLE_LOCATION_QUERY($id: ID!) {
        location(where: { id: $id }) {
            id
            country
            city
            geoLocation {
                latitude
                longitude
            }
            description
        }
    }
`;

class AllLocations extends PureComponent {

    _isMounted = false;

    state = {
        viewport: {
            latitude: 53.9777,
            longitude: -1.6376,
            zoom: this.props.id
                ? 9
                : 6
        },
        locationDetail: null,
        singleLocation: null,
        paramProps: null,
        isOpened: false,
        events: {},
        editButton: this.props.editButton
    };

    offsetMarker = () => {
        const offset = getCoordinates().getCoords(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), this.props.lat, this.state.viewport.zoom);
        const offsetLon = window.innerWidth > 1000
            ? parseFloat(offset.lon)
            : 0;
        const offsetLat = window.innerWidth > 1000
            ? 0
            : parseFloat(offset.lat);

        this
            .refs
            .changeViewport
            .onViewportChange({
                latitude: parseFloat(this.props.lat) + offsetLat,
                longitude: parseFloat(this.props.lon) + offsetLon
            })
    }

    closeLocationDetail = () => {
        this.setState({isOpened: false});
        this.setState({paramProps: null});
        setTimeout(() => {
            this.setState({locationDetail: null});
            this.setState({singleLocation: null});
        }, 500);
    }

    _toggleLocationDetail = (location) => {
        let locationDetail = (this.state.locationDetail || this.state.singleLocation) && location.id === this.props.id;
        console.log(location.id, this.props.id);
        if (locationDetail) {
            this.closeLocationDetail()

        } else {
            this.setState({locationDetail: location, isOpened: true});
            this._goToViewport(location);
        }
    }

    _locationPathName = (location) => {
        let locationDetail = (this.state.locationDetail || this.state.singleLocation) && location.id === this.props.id;
        let pathNameLocation = {
            pathname: this.props.pathname,
            query: {
                id: location.id,
                lat: location.geoLocation.latitude,
                lon: location.geoLocation.longitude
            }
        };

        let pathNameRoot = {
            pathname: this.props.pathname
        };
        let locationPathName = locationDetail
            ? pathNameRoot
            : pathNameLocation;

        return locationPathName;
    }

    _renderCityMarker = () => {

        return (
            <Query query={ALL_LOCATIONS_QUERY}>
                {({data, error, loading}) => {
                    if (loading) 
                        return <p>Loading...</p>;
                    if (error) 
                        return <p>Error: {error.message}</p>;
                    return (data.locations.map(location => (
                        <Marker
                            key={`marker-${location.id}`}
                            longitude={location.geoLocation.longitude}
                            latitude={location.geoLocation.latitude}>
                            <Link href={this._locationPathName(location)}>
                                <CityPin size={20} onClick={() => this._toggleLocationDetail(location)}/>
                            </Link>
                        </Marker>
                    )))
                }}
            </Query>
        );
    }

    _renderLocationDetail = () => {
        let locationDetail = this.state.locationDetail || this.state.singleLocation;

        return locationDetail && (<Location
            location={locationDetail}
            key={locationDetail.id}
            closeLocation={this.closeLocationDetail}
            isOpened={this.state.isOpened}
            pathname={this.props.pathname}
            editButton={this.state.editButton}/>)
    }

    singleLocation = () => {
        const checkForProps = this.state.paramProps && this._isMounted;
        return checkForProps && <Query
            query={SINGLE_LOCATION_QUERY}
            variables={{
            id: this.props.id
        }}
            onCompleted={data => {
            const {location} = data;
            this.setState({singleLocation: location, isOpened: true});
        }}>
            {({error, loading, data}) => {
                if (error) 
                    console.log("error")
                if (loading) 
                    console.log("loading")
                return null;
            }}
        </Query>
    }

    _onViewportChange = viewport => this.setState({
        viewport: {
            ...this.state.viewport,
            ...viewport
        }
    });

    _goToViewport = ({
        geoLocation: {
            longitude,
            latitude
        }
    }) => {
        const offset = getCoordinates().getCoords(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), latitude, 9);
        const offsetLon = window.innerWidth > 1000
            ? parseFloat(offset.lon)
            : 0;
        const offsetLat = window.innerWidth > 1000
            ? 0
            : parseFloat(offset.lat);

        this
            .refs
            .changeViewport
            .onViewportChange({
                longitude: longitude + offsetLon,
                latitude: latitude + offsetLat,
                zoom: 9,
                transitionInterpolator: new FlyToInterpolator(),
                transitionDuration: 1000
            });
    };

    componentDidMount() {
        this.setState({paramProps: this.props.id});
        this.props.id && this.offsetMarker();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="map-container">
                <MapGL
                    viewport={{
                    ...this.state.viewport
                }}
                    ref="changeViewport">

                    {this._renderCityMarker()}
                    {this.singleLocation()}
                </MapGL>
                {this._renderLocationDetail()}
            </div>
        )
    }
}

export default AllLocations;
export {ALL_LOCATIONS_QUERY};