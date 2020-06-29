import React, { useEffect, useState, useContext, useRef } from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import MaterialIcon from '@material/react-material-icon';
import styled from 'styled-components';
import Button from '../../UIKIT/iButton';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const OpacityPaper = styled(Paper)`
    && {
        position: absolute;
        left: 0;
        padding: 8px;
        padding-bottom: 0;
        width: 190px;
        z-index: 10;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

        .marker_text {
            margin-left: 8px;
        }
    }
`;


const OpacityButton = styled(Button)`
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

        .material-icons {
            margin-left: 8px;
        }

        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
        }

        .form-input {
            width: 95%;
        }

        .percent:after {
            content: '%';
            position: relative;
            right: 24px;
            top: 1px;
            pointer-events: none;
        }
    }
`;

const muiTheme = createMuiTheme({
    overrides:{
      MuiSlider: {
        thumb:{
        color: "#007bff",
        },
        track: {
          color: '#3395ff'
        }
      }
  }
  });

function Opacity(props) {

    const [percent, setPercent] = useState(50);

    const { opacityDec, setOpacityDec } = props;


    useEffect(() => {
        const perc = opacityDec * 100;

        setPercent(perc);
    }, [opacityDec])


    const buttonRef= useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

 
    function handleClose(event) {
        setAnchorEl(null)
    }

    function handleChange(event) {
        const {value} = event.target;
        
        setPercent(event.target.value);
        if(value > 100) {
            setPercent(100);
        }

        if(value < 0) {
            setPercent(0);
        }
        
    }

    function handleSlider(event, newValue) {

        const percentVal = parseInt(newValue);
        const decVal = percentVal / 100;
        setPercent(percentVal);

        setOpacityDec(decVal);
    }

    return <>
        <OpacityButton id="opacity-slider"
          aria-describedby={id} type="button" onClick={handleClick}
          ref={buttonRef}
            width="auto">

            <span className="buttonSpan_container">

                <div className="percent">
                <input
                    className="form-input"
                    type="number"
                    id="opacity"
                    name="opacity"
                    min={1} max={100}
                    value={percent}
                    autoComplete="off"
                    onChange={handleChange} />  
                </div>
                <MaterialIcon icon="arrow_drop_down" />
            </span>
        </OpacityButton>
        <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom-start">
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                        transformOrigin: placement === 'bottom'
                            ? 'center top'
                            : 'center bottom'
                    }}>
                    <OpacityPaper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <div>
                            <ThemeProvider theme={muiTheme}>
                                <Slider value={percent} onChange={handleSlider} aria-labelledby="opacity-slider"/>
                            </ThemeProvider>
                            </div>
                        </ClickAwayListener>
                    </OpacityPaper>
                </Grow>
            )}
        </Popper>
    </>
}

export default Opacity;