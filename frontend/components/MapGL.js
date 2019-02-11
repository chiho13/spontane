import React, {PureComponent} from 'react';
import MapGL, {Marker, FlyToInterpolator} from 'react-map-gl';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import CityPin from './Icons/CityMarker';
import styled from 'styled-components';
import {auto} from 'async';
import Location from './Location';
import Link from 'next/link';
// A viewport looking at San Francisco city area


const TOKEN = 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2' +
        'ZJApZ0Rg5UTsK7kPw';

const ALL_LOCATIONS_QUERY = gql `
        query ALL_LOCATIONS_QUERY {
          locations {
            id
            country
            city
            latitude
            longitude
            description
          }
        }
`;

const SINGLE_LOCATION_QUERY = gql`
    query SINGLE_LOCATION_QUERY($id: ID!) {
        location(where: { id: $id }) {
            id
            country
            city
            latitude
            longitude
            description
        }
    }
`;

class Mapbox extends PureComponent {

    state = {
        viewport: {
            height: '100vh',
            width: '100vw',
            latitude: 54.9777,
            longitude: -1.6376,
            zoom: this.props.id ? 9 : 6
        },
        locationDetail: null,
        singleLocation: null,
        paramProps: null,
        loading: false
    };

    closeLocationDetail = () => {
        this.setState({locationDetail: null});
        this.setState({singleLocation: null});
        this.setState({paramProps: null});
    }

    getCoordinates(x, y, LAT, ZOOM) {
        var degreesPerPixelX = 360 / Math.pow(2, ZOOM + 8);
        var degreesPerPixelY = 360 / Math.pow(2, ZOOM + 8) * Math.cos(LAT * Math.PI / 180);
    
        return {
            lat: degreesPerPixelY * ( y - window.innerHeight / 2),
            lon: degreesPerPixelX * ( x  - window.innerWidth / 2),
        };
    }

    _toggleLocationDetail = (location) => {
        let locationDetail = (this.state.locationDetail || this.state.singleLocation) && location.id === this.props.id;
            console.log(location.id, this.props.id);
        if(locationDetail) {
            this.closeLocationDetail()
        } else {
            this.setState({locationDetail: location});
            this._goToViewport(location);
        }
    }

    _locationPathName(location) {
        let locationDetail = (this.state.locationDetail || this.state.singleLocation) && location.id === this.props.id;
        let pathNameLocation  = {
            pathname: '/locations',
            query: {
                id: location.id,
                lat: location.latitude,
                lon: location.longitude
            }
        };

        let pathNameRoot = {
            pathname: '/'
        };
        let locationPathName = locationDetail ? pathNameRoot : pathNameLocation;

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
                return (
                    data
                    .locations
                    .map(location => (
                        <Marker key={`marker-${location.id}`}
                    longitude={location.longitude}
                    latitude={location.latitude}>
                    <Link href={this._locationPathName(location)}>
                    <CityPin size={20} onClick={() => this._toggleLocationDetail(location)} />
                    </Link>
                    </Marker>
                    ))
                )
              }}
              </Query>
          );
    }

    _renderLocationDetail = () => {
        let locationDetail = this.state.locationDetail || this.state.singleLocation;
        
        return locationDetail && (
            <Location location={locationDetail} key={locationDetail.id} closeLocation={this.closeLocationDetail}/>
        )
    }

    singleLocation = () => {
        const checkForProps = this.state.paramProps;
        return  checkForProps && <Query query={SINGLE_LOCATION_QUERY} variables={{
            id: this.props.id
        }}>
            {({error, loading, data}) => {
                if(error) console.log("error")
                if(loading) console.log("loading")
                const {location} = data;
                console.log(location)
                this.setState({singleLocation: location});
                return null
            }}
        </Query>
    }   

    _onViewportChange = viewport => this.setState({
        viewport: {...this.state.viewport, ...viewport}
    });

    _goToViewport = ({longitude, latitude}) => {
        
        const offset = this.getCoordinates(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), latitude, 8);
        const offsetLon = window.innerWidth > 1000 ? parseFloat(offset.lon) : 0;
        const offsetLat = window.innerWidth > 1000 ? 0 : parseFloat(offset.lat);

        this._onViewportChange({
          longitude: longitude + offsetLon,
          latitude: latitude + offsetLat,
          zoom: 8,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: 1000
        });
      };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.setState({paramProps: this.props.id});
       
        if(this.props.lat && this.props.lon) {
            const offset = this.getCoordinates(window.innerWidth * 0.625, window.innerHeight * (0.5 - (30 / window.innerHeight)), this.props.lat, this.state.viewport.zoom);
            const offsetLon = window.innerWidth > 1000 ? parseFloat(offset.lon) : 0;
            const offsetLat = window.innerWidth > 1000 ? 0 : parseFloat(offset.lat);

            this.setState({
                viewport: {...this.state.viewport, latitude: parseFloat(this.props.lat) + offsetLat, longitude: parseFloat(this.props.lon) + offsetLon}
            });
        }
    }

    updateDimensions = (e) => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                height: window.innerHeight,
                width: window.innerWidth
            }
        });
    }

    render() {
        return (
                <MapGL
                    {...this.state.viewport}
                    mapboxApiAccessToken={TOKEN}
                    onViewportChange={this._onViewportChange}>
                   
                    {this._renderLocationDetail()}
                    {this._renderCityMarker()}
                    {this.singleLocation()} 
                </MapGL>
                )
               
    }
}

export default Mapbox;