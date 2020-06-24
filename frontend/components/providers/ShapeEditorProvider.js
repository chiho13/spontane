import React, { useEffect, useState, useContext } from 'react';

import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';

const ShapeEditorContext = React.createContext();

function ShapeEditorProvider(props) {

  const [form,
    setForm,
    handleChange] = useForm({
      lineColor: '#333333',
      fillColor: '#aaaaaa',
      details: ''
    });

  const [addShape, setAddShape] = useState(false);
  const [editShape, setEditShape] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [singleLocation, setSingleLocation] = useState({ ...form, id: 'dsd' });

  return <ShapeEditorContext.Provider value={{
      form, setForm, handleChange,
      addShape, setAddShape,
      editShape, setEditShape,
      selectedShape, setSelectedShape,
      singleLocation, setSingleLocation
    }}>
      {props.children}
    </ShapeEditorContext.Provider>
}
export { ShapeEditorContext, ShapeEditorProvider };