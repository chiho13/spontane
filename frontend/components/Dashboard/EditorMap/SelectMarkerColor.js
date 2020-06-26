import React, { useEffect, useState, useContext } from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';
import SelectColor from './SelectColor';

import { SketchPicker } from 'react-color';

import { ViewPortContext } from '../../providers/MapProvider';
import { LocationEditorContext } from '../../providers/LocationEditorProvider';

const SelectColorPaper = styled(Paper)`
    && {
        position: absolute;
        right: -100px;
        padding: 0;
        width: 200px;
        z-index: 10;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

        .marker_text {
            margin-left: 8px;
        }
    }
`;


const SelectColorButton = styled(Button)`
    && {
        height: 60px;
        padding: 10px;

        &:hover {
            background: #ffffff;
        }

        .buttonSpan_container {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }

    .selectColor_swatch {
        width: 40px;
        height: 40px;
        margin-right: 16px;
        border-radius: 8px;
        border: 1px solid #aaaaaa;
    }
`;

function SelectMarkerColor() {
    const { mapConfig } = useContext(ViewPortContext);
    const { form, setForm, dropMarker, editLocation } = useContext(LocationEditorContext)
    const [pinColor, setPinColor] = useState(form.pinColor);

    useEffect(() => {
        setForm({
            ...form,
            pinColor
        });

    }, [dropMarker, pinColor]);

    useEffect(() => {
        if (editLocation) return;
        setForm({
            ...form,
            pinColor: mapConfig.markerColor
        });
    }, [dropMarker, mapConfig, editLocation]);


    return <div>
        <label>
            Select Color
            </label>
        <SelectColor setColor={setPinColor} color={form.pinColor}/>
    </div>
}

export default SelectMarkerColor;