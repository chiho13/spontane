import React, {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import CityPin from './Icons/CityMarker';
import styled from 'styled-components';
import {auto} from 'async';
import Location from './Location';
import Link from 'next/link';

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
          }
        }
`;

class Mapbox extends Component {

    state = {
        viewport: {
            height: '100vh',
            width: '100vw',
            latitude: 54.9777,
            longitude: -1.6376,
            zoom: 8
        },
        locationDetail: null
    };


    closeLocationDetail = () => {
        this.setState({locationDetail: null})
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
                    <Link href={{
                        pathname: '/locations',
                        query: {
                            id: location.id
                        }
                    }}>
                    <CityPin size={20} onClick={() => this.setState({locationDetail: location})} />
                    </Link>
                    </Marker>
                    ))
                )
              }}
              </Query>
          );
    }

    _renderLocationDetail = () => {
        const {locationDetail} = this.state;

        return locationDetail && (
            <Location location={locationDetail} key={locationDetail.id} closeLocation={this.closeLocationDetail}/>
        )
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
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
                    onViewportChange={(viewport) => this.setState({viewport})}>
                    
                    {this._renderLocationDetail()}
                    {this._renderCityMarker()}
                </MapGL>
                )
               
    }
}

export default Mapbox;