import React, { useEffect, useState, useContext} from 'react';

import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';

const LocationEditorContext = React.createContext();



function LocationEditorProvider(props) {
  // new
  const router = useRouter();

  const initialForm = {
    country: '',
    city: '',
    description: '',
    latitude: 0,
    longitude: 0,
    markerType: 'Default',
    pinColor: '#dd0000',
    dropShadow: '#f1f1f1'
  };

  const [form,
    setForm,
    handleChange] = useForm(initialForm);

    const [dropMarker, setDropMarker] = useState(false);
    const [editLocation, setEditLocation] = useState(false);
    const [singleLocation, setSingleLocation] = useState({...form, id: 'dsd'});

    const [suggestions, setSuggestions] = useState({
      place: null,
      address: null
    });

  return (
    <LocationEditorContext.Provider value={{form, setForm, handleChange, initialForm,
    dropMarker, setDropMarker, 
    editLocation, 
    setEditLocation, 
    singleLocation, setSingleLocation, 
    suggestions, setSuggestions
    }}>
      {props.children}
    </LocationEditorContext.Provider>
  );
}
export { LocationEditorContext, LocationEditorProvider };