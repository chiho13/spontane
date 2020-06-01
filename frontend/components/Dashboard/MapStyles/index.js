import React, { useState } from 'react';
import Button from '../../UIKIT/iButton';
import { ThemeProvider } from 'styled-components';

import SelectMapStyle from './selectStyles';
import styled from 'styled-components';

export const SelectBaseMapStyle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 24px;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;

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
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.4s ease;

        &:hover {
            color: ${props => props.theme.brandColor};
            background-color: ${props => props.theme.white};
            transform: translate3d(0px, -4px, 0px);
            box-shadow: 0 8px 6px rgba(0,0,0,0.1);
        }

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


const invertWhite = ({ white, black }) => ({ black: white, white: black, hoverColor: '#1a88ff' });
const invertBrand = ({ white, brandColor }) => ({ black: white, white: brandColor, hoverColor: '#1a88ff' });

function SelectBaseMap(props) {
  
    return <>
        <h3>Choose a style</h3>
        <div className="navButtons">

            <ThemeProvider theme={invertWhite}>
                <Button type="button" onClick={props.previousStep}>Back</Button>
            </ThemeProvider>

            <ThemeProvider theme={invertBrand}>
                <Button type="button" onClick={props.nextStep}>Next</Button>
            </ThemeProvider>
        </div>
        <SelectBaseMapStyle>
            <SelectMapStyle />
        </SelectBaseMapStyle>
    </>
}

export default SelectBaseMap;