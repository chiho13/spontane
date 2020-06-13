import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import MaterialIcon from '@material/react-material-icon';
import { ViewPortContext } from '../../providers/MapProvider';
import {mapStyleLists} from './mapStyleList';

function ButtonRadio(props) {

    const {val, selected, setSelectedRadio} = props;

    const radioButton = useRef(null);
    const {mapConfig, setMapConfig} = useContext(ViewPortContext);

  
    
    function handleRadio(event, _mapStyle) {

        const mapStyle = mapStyleLists[val]["stylesURL"];
        const markerColor = mapStyleLists[val]["markerColor"];
        event.preventDefault();
        setSelectedRadio(mapStyle);

        setMapConfig({
            ...mapConfig,
            mapStyle,
            markerColor
        });
    }

    return <button type="button" ref={radioButton} className={selected ? 'baseMap_wrapper baseMap_wrapper__selected' : 'baseMap_wrapper'} onClick={handleRadio}>
    <img className="baseMap_image" src={mapStyleLists[val]["imagePath"]} />
    <span className="baseMap_labelText"> 
        {val}
        <MaterialIcon icon="done" />
    </span>
</button>
}


function SelectStyles(props) {
    const {mapConfig} = useContext(ViewPortContext);
    const [selectedRadio, setSelectedRadio] = useState(mapConfig.mapStyle);


    useEffect(() => {
        if(props.mapStyle) {
            setSelectedRadio(props.mapStyle);
        }
    }, []);
    return <>
    {Object.keys(mapStyleLists).map((val, i) => {  
        const selected = selectedRadio == mapStyleLists[val]["stylesURL"];
        return <ButtonRadio key={i} val={val} selected={selected} setSelectedRadio={setSelectedRadio} />
    })}
</>
}

export default SelectStyles;