import React, { useEffect, useState, useContext } from 'react';

import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';

const ShapeEditorContext = React.createContext();

function ShapeEditorProvider(props) {

  const [form,
    setForm,
    handleChange] = useForm({
      shape: null,
      lineColor: '#333333',
      fillColor: '#aaaaaa',
      strokeDasharray: 'none',
      strokeWidth: 2,
      details: ''
    });

  const [addShape, setAddShape] = useState(false);
  const [editShape, setEditShape] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [singleFeature, setSingleFeature] = useState(null);

  return <ShapeEditorContext.Provider value={{
      form, setForm, handleChange,
      addShape, setAddShape,
      editShape, setEditShape,
      selectedShape, setSelectedShape,
      singleFeature, setSingleFeature
    }}>
      {props.children}
    </ShapeEditorContext.Provider>
}
export { ShapeEditorContext, ShapeEditorProvider };