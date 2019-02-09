import React, {PureComponent} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
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

const SINGLE_LOCATION_QUERY = gql`
    query SINGLE_LOCATION_QUERY($id: ID!) {
        location(where: { id: $id }) {
            id
            country
            city
            latitude
            longitude
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
            zoom: 5
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

    _toggleLocationDetail = (location) => {
        let locationDetail = (this.state.locationDetail || this.state.singleLocation) && location.id === this.props.id;
            console.log(location.id, this.props.id);
        if(locationDetail) {
            this.closeLocationDetail()
            
        } else {
            this.setState({locationDetail: location});
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

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.setState({paramProps: this.props.id});

        if(this.props.lat && this.props.lon) {

        this.setState({
            viewport: {...this.state.viewport, latitude: Number(this.props.lat), longitude: Number(this.props.lon)}
          });
          console.log("lat: ", this.props.lat);
          console.log("lon: ", this.props.lon);
        }
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
                    {this.singleLocation()} 
                </MapGL>
                )
               
    }
}

export default Mapbox;