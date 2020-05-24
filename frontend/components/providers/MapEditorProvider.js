import React, { useEffect, useState, useContext} from 'react';

import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';

const MapEditorContext = React.createContext();

function MapEditorProvider(props) {
  // new
  const router = useRouter();

  const [form,
    setForm,
    handleChange] = useForm({
        country: '',
        city: '',
        description: '',
        latitude: 0,
        longitude: 0
    });

    const [dropMarker, setDropMarker] = useState(false);

  return (
    // new
    <MapEditorContext.Provider value={{form, setForm, handleChange, dropMarker, setDropMarker}}>
      {props.children}
    </MapEditorContext.Provider>
  );
}
export { MapEditorContext, MapEditorProvider };