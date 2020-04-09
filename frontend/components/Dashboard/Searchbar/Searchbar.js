import React, {useState, useEffect} from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './SearchbarStyles';
import MaterialIcon from '@material/react-material-icon';

const SEARCH_LOCATIONS_QUERY = gql`
  query SEARCH_LOCATIONS_QUERY($searchTerm: String!, $userId: ID) {
    locations(where: { OR: [{ city_contains: $searchTerm }, { country_contains: $searchTerm }], user: {
              id: $userId
          }}, ) {
      id
      city
      country
      geoLocation {
                latitude
                longitude
        }
    }
  }
`;

function routeToLocation(location) {
  Router.push({
    pathname: '/admin/locations/map',
    query: {
        view: 'map',
      id: location.id,
      lat: location.geoLocation.latitude,
      lon: location.geoLocation.longitude
    },
  });
}

const AutoComplete = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
  
  const onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on

    setLoading(true);
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_LOCATIONS_QUERY,
      variables: { searchTerm: e.target.value },
    });

    setLocations(res.data.locations);
    setLoading(false);
  }, 350);

    useEffect(() => {
       return resetIdCounter();
    });
    
    return (
      <SearchStyles>
          <MaterialIcon icon="search" />
        <Downshift onChange={routeToLocation} itemToString={item => (item === null ? '' : item.city)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search Locations',
                      id: 'search',
                      className: loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {locations.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      {`${item.city}, ${item.country}`}
                    </DropDownItem>
                  ))}
                  {!locations.length &&
                    !loading && <DropDownItem> Nothing Found {inputValue}</DropDownItem>}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  };

export default AutoComplete;
