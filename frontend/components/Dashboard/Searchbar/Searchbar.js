import React, {useState, useEffect, useContext} from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './SearchbarStyles';
import MaterialIcon from '@material/react-material-icon';
import {UserContext} from '../../Layout/DashboardLayout';
import {ViewPortContext} from '../../providers/MapProvider';


const AutoComplete = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user: data} = useContext(UserContext);
    const {flyViewPort} = useContext(ViewPortContext);
  
  const onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on

    setLoading(true);

    const filtered = data.locations.filter((el) => {
      return el.city.toLowerCase().includes(e.target.value.toLowerCase()) || el.country.toLowerCase().includes(e.target.value.toLowerCase());
    });

    console.log(filtered)

    setLocations(filtered);
    setLoading(false);
  }, 350);



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

      Router.onRouteChangeComplete = () => {
        flyViewPort(location);
      };

  };


    useEffect(() => {
       return resetIdCounter();
    });
    
    return (
      <SearchStyles>
        <Downshift onChange={routeToLocation} itemToString={item => (item === null ? '' : item.city)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (<>
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
                        <MaterialIcon icon="search" />
                  </>
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
