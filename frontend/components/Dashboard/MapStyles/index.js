import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';
import {ThemeProvider} from 'styled-components';
import {mapStyleLists} from './mapStyleList';

const SelectBaseMapStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .baseMap_wrapper {
        display: flex;
        cursor: pointer;
        background: #ffffff;
        border-width: 1px;
        border-style: solid;
        border-color: ${props => props.theme.grey};
        color: ${props => props.theme.black};
        font-family: ${props => props.theme.boldFont};
        transition: border-color 0.3s ease;
        margin: 16px;
        flex-basis: 33%;
        border-radius: 8px;
        box-shadow: 0 1px 6px rgba(0,0,0,0.1);
        box-sizing: border-box;

        .baseMap_image {
            width: 55%;
            height: 100%;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }

        &__selected {
            border-width: 2px;
            border-color: ${props => props.theme.brandColor};

            .baseMap_image {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
    
        }
    }


    .baseMap_labelText {
        padding-left: 16px;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .baseMap_radio {
        visibility: hidden;
        height: 0;
        width: 0;
        opacity: 0;
        position: absolute;
    }
`;

function SelectBaseMap() {

    const [selectedRadio, setSelectedRadio] = useState('');

    function handleRadio(event) {
        setSelectedRadio(event.target.value);
        console.log(event.target.value)
    }

    console.log(Object.keys(mapStyleLists));

    return <>
        
    <SelectBaseMapStyle>
        {Object.keys(mapStyleLists).map((val, i) => {  
            const selected = selectedRadio == mapStyleLists[val]["stylesURL"];
            console.log(selected)
            return <label  className={selected ? 'baseMap_wrapper baseMap_wrapper__selected' : 'baseMap_wrapper'} key={i}>
                <input  id={val} className="baseMap_radio" value={mapStyleLists[val]["stylesURL"]} type="radio" name="mapStyles" onChange={handleRadio}/>
                <img className="baseMap_image" src={mapStyleLists[val]["imagePath"]} />
                <span className="baseMap_labelText"> 
                    {val}
                </span>
            </label>
        })}
    </SelectBaseMapStyle>
    </>
}

export default SelectBaseMap;