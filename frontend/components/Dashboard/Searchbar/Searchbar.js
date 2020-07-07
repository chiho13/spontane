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
import {useRouter} from 'next/router'
import useLocalStorage from '../../hooks/useLocalStorage';

const AutoComplete = () => {
    const router = useRouter();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user: data} = useContext(UserContext);
    const {flyViewPort, mapConfig} = useContext(ViewPortContext);
    const [projectID, setProjectID] = useLocalStorage('projectID', router.query.id);
  
  const onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on

    setLoading(true);

    const filteredProject = data && data.projects.find(el => {
      return el.id === projectID
    });

    const filtered = filteredProject.locations.filter((el) => {
      return el.city.toLowerCase().includes(e.target.value.toLowerCase()) || el.country.toLowerCase().includes(e.target.value.toLowerCase());
    });


    setLocations(filtered);
    setLoading(false);
  }, 350);



  function routeToLocation(location) {
    
    // const href = `/mymaps/preview/[id]`;
            
    // const newPath = `/mymaps/preview/${router.query.id}` + `?locationID=${location.id}` + `&minZoom=${mapConfig.minZoom}`;
    
    // router.push(href, newPath, {shallow: true});

    flyViewPort(location, 12, false);
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
                      className: loading ? 'form-input loading' : 'form-input',
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
