import React, { useEffect, useState, useContext } from 'react';

import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';

const ShapeEditorContext = React.createContext();

function ShapeEditorProvider(props) {
  const initialShapeForm = {
    shape: null,
    lineColor: '#333333',
    fillColor: '#aaaaaa',
    fillOpacity: 0.5,
    strokeDasharray: 'none',
    strokeWidth: 2,
    details: ''
  }

  const [form,
    setForm,
    handleChange] = useForm(initialShapeForm);

  const [addShape, setAddShape] = useState(false);
  const [editShape, setEditShape] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [singleFeature, setSingleFeature] = useState(null);
  const [shapeUpdateFeature, setShapeUpdateFeature] = useState({id: 'dfsdf'});

  return <ShapeEditorContext.Provider value={{
      form, setForm, handleChange, initialShapeForm,
      addShape, setAddShape,
      editShape, setEditShape,
      selectedShape, setSelectedShape,
      singleFeature, setSingleFeature,
      shapeUpdateFeature, setShapeUpdateFeature
    }}>
      {props.children}
    </ShapeEditorContext.Provider>
}
export { ShapeEditorContext, ShapeEditorProvider };