import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';
import {ThemeProvider} from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import {ViewPortContext} from '../../providers/MapProvider';

import {mapStyleLists} from './mapStyleList';

const SelectBaseMapStyle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 24px;
    width: 100%;
    margin-top: 16px;

    .baseMap_wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
        cursor: pointer;
        background: #ffffff;
        border-width: 1px;
        border-style: solid;
        padding: 0;
        border-color: ${props => props.theme.grey};
        color: ${props => props.theme.black};
        font-family: ${props => props.theme.boldFont};
        transition: border-color 0.3s ease;
        flex-basis: 33%;
        border-radius: 8px;
        box-shadow: 0 1px 6px rgba(0,0,0,0.1);
        box-sizing: border-box;
        align-items: center;
        margin: 0;

        &:focus {
            outline: 0;
            border-width: 2px;
            border-color: ${props => props.theme.black};
        }

        .baseMap_image {
            width: 100%;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }
        .material-icons { 
            position: absolute;
            opacity: 0;
            bottom: 12px;
            right: 12px;
            transition: all 0.3s ease;
            font-size: 32px;
            color: ${props => props.theme.grey};
        }

        &__selected {
            border-width: 2px;
            border-color: ${props => props.theme.brandColor};

            .material-icons {
                opacity: 1;
                color: ${props => props.theme.brandColor};
            }
    
        }
    }


    .baseMap_labelText {
        font-size: 16px;
        width: 100%;
        padding: 16px;
    }

    .baseMap_radio {
        visibility: hidden;
        height: 0;
        width: 0;
        opacity: 0;
        position: absolute;
    }

    .baseMap_radio:focus + .baseMap_wrapper {
        background-color: ${props => props.theme.grey};
    }
`;


function ButtonRadio(props) {

    const {val, selected, setSelectedRadio, setDisableButton} = props;

    const radioButton = useRef(null);
    const {mapConfig, setMapConfig} = useContext(ViewPortContext);

    function handleRadio(event) {

        const getMapStyle = radioButton.current.dataset.mapStyle
        event.preventDefault();
        setSelectedRadio(getMapStyle);
        setDisableButton(false);

        setMapConfig({
            ...mapConfig,
            mapStyle: getMapStyle 
        })
    }

    return <button type="button" ref={radioButton} className={selected ? 'baseMap_wrapper baseMap_wrapper__selected' : 'baseMap_wrapper'} data-map-style={mapStyleLists[val]["stylesURL"]} onClick={handleRadio}>
    <img className="baseMap_image" src={mapStyleLists[val]["imagePath"]} />
    <span className="baseMap_labelText"> 
        {val}
        <MaterialIcon icon="done" />
    </span>
</button>
}

const invertWhite = ({white, black}) => ({black: white, white: black, hoverColor: '#1a88ff'});
const invertBrand = ({white, brandColor}) => ({black: white, white: brandColor, hoverColor: '#1a88ff'});

function SelectBaseMap(props) {
    const [selectedRadio, setSelectedRadio] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    return <>
         <h3>Choose a style</h3>
    <div className="navButtons">

    <ThemeProvider theme={invertWhite}>
            <Button  onClick={props.previousStep}>Back</Button>
    </ThemeProvider>

    <ThemeProvider theme={invertBrand}>
            <Button disabled={disableButton} onClick={props.nextStep}>Next</Button>
    </ThemeProvider>
    </div>
    <SelectBaseMapStyle>
        {Object.keys(mapStyleLists).map((val, i) => {  
            const selected = selectedRadio == mapStyleLists[val]["stylesURL"];
            return <ButtonRadio key={i} val={val} selected={selected} setSelectedRadio={setSelectedRadio} setDisableButton={setDisableButton} />
        })}
    </SelectBaseMapStyle>
    </>
}

export default SelectBaseMap;