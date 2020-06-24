import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from 'styled-components';
import MapGL, {TOKEN} from '../../MapGL';
import { Editor, EditingMode} from 'react-map-gl-draw';
import {featureStyle, editHandleStyle} from './areastyle';
import Button from '../../UIKIT/iButton';
import { DrawRectangleMode } from '@nebula.gl/edit-modes';
import {ThemeProvider} from 'styled-components';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '../../UIKIT/ProfilePaperDropdown';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '../../UIKIT/MenuItem';
import MaterialIcon from '@material/react-material-icon';
import {getCountryPreset, listOfCountryPresets} from './countryPresets';
import {ViewPortContext} from '../../providers/MapProvider';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Geocoder from 'react-map-gl-geocoder';
// import dynamic from 'next/dynamic';
// const Geocoder = dynamic(() => import('react-map-gl-geocoder'), {
//     ssr: false
//   });

let Geocoder;

if (typeof window !== 'undefined') { 
  Geocoder = require('react-map-gl-geocoder').default; 
}

const Mapstyle = styled.div`
  position: relative;
      width: 100%;
      height: calc(100vh - 220px);
      margin-top: 32px;

      .group_container {
          position: absolute;
          left: 16px;
          top: 16px;
          display: flex;
        width: 50%;

          button {
              margin-top: 0;
              margin-right: 16px;
              font-size: 14px;
              padding: 8px;
              border: 2px solid #444444;
              width: auto;
          }
      }
      .mapboxgl-map {
          border-radius: 8px;
      }

      .popper_wrapper {
          position: relative;
      }

      .insertArea_button {
          width: 150px;
      }

      .mapboxgl-ctrl {
          display: block !important;
      }
`;

const MenuListUL = styled.div`
      height: 200px;
      overflow-y: scroll;
`


const invertWhite = ({white, black}) => ({black: white, white: black, hoverColor: '#1a88ff'});
const invertBrand = ({white, brandColor}) => ({black: white, white: brandColor, hoverColor: '#1a88ff'});

function MapSetBounds(props) {
    const [selectedMode, setSelectedMode] = useState(null);
    const [selectedFeatureIndex, setSelectedFeatureIndexes] = useState(null);
    const [resetButton, setResetButton] = useState(false);

    const [drawSelected, setDrawSelected] = useState(false);

    const [disableButton, setDisableButton] = useState(true);

    const {setFeature, defaultBoundary, submitForm} = props;
    const editorRef = useRef(null);

    const initialViewPort = {
        latitude: 55,
        longitude: 0,
        zoom: 0
    };


    const {setViewport, handleGeocoderViewportChange} = useContext(ViewPortContext);

    // useEffect(() => {
    //     setViewport(initialViewPort);
    // }, [])

      function deleteSquare() {
    if (selectedFeatureIndex === null || selectedFeatureIndex === undefined) {
      return;
    }

    setDisableButton(true);
    editorRef.current.deleteFeatures(selectedFeatureIndex);
    setResetButton(false);
    setDrawSelected(false);
    setSelectedMode(null);
    setFeature(defaultBoundary);
  }

  const mapRef = useRef();

//   const handleGeocoderViewportChange = (viewport) => {
//       const geocoderDefaultOverrides = { transitionDuration: 1000 }
   
//       setViewport({
//         ...viewport,
//         ...geocoderDefaultOverrides
//       });
//     }

let anchorEl;

const [open,
    setOpen] = useState(false);

function handleToggle() {
    setOpen(!open)
}

function handleClose(event) {
    if (anchorEl.contains(event.target)) {
        return;
    }

    setOpen(false);
}

    useEffect(() => {
        if(drawSelected) {
            switchMode(DrawRectangleMode);
        } else {
            setSelectedMode(null);
        }
    }, [drawSelected]);



    function switchMode(mode) {
        const HandlerClass = mode;
        const modeHandler = new HandlerClass();
        setSelectedMode(modeHandler);
    }

    function selectArea(_feature) {
        setDisableButton(false);
        setFeature(JSON.stringify(_feature));
        editorRef.current.addFeatures(_feature)
        switchMode(EditingMode);
    }
    
    function drawArea() {
        editorRef.current.deleteFeatures(0);
        setDrawSelected(!drawSelected);
    }

    function selectedArea(event){
        editorRef.current.deleteFeatures(0);

        const { myValue } = event.currentTarget.dataset;

        const getFeature = getCountryPreset(myValue);

        setTimeout(() => {
            selectArea(getFeature);
        }, 0)
        handleClose(event);

    }

    function getCursor() {
        if(mapRef.current) {
            if(mapRef.current.state.isDragging) {
                return 'grabbing';
            }
        }

        return drawSelected ? 'crosshair' : 'grab';
    }

    return <div>
     <h3>Select map area</h3>
    <div className="navButtons">

    <ThemeProvider theme={invertWhite}>
            <Button type="button" onClick={props.previousStep}>Back</Button>
    </ThemeProvider>

    <ThemeProvider theme={invertBrand}>
            <Button type="button" disabled={!props.isActive} onClick={submitForm}>Create Project</Button>
    </ThemeProvider>
    </div>
    <p className="step3_text">If unselected, boundary defaults to world map</p>
   
    <Mapstyle>
   
        <MapGL ref={mapRef} getCursor={getCursor}>
              <Editor 
              ref={el => editorRef.current = el}
          clickRadius={12}
          onSelect={(selected) => {
            selected && setSelectedFeatureIndexes(selected.selectedFeatureIndex);
           
            if(selected.selectedFeatureIndex !== null) {
                setResetButton(true)
            } else {
                setResetButton(false)
            }


            if(selected.mapCoords === undefined) {
                switchMode(EditingMode);
            } 
          }}
          onUpdate={(feature) => {
              setFeature(JSON.stringify(feature.data[0]));
              setDisableButton(false);
              console.log(JSON.stringify(feature.data[0]));
          }}
          featureStyle={featureStyle}
          editHandleStyle={editHandleStyle}
          mode={selectedMode}
        />
          <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
          position="top-right"
          onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        />
        </MapGL>
       
         {resetButton ? <div className="group_container"><Button onClick={deleteSquare}>Clear</Button></div> : <div className="group_container">
         <Button selected={drawSelected} onClick={drawArea}>Draw Area</Button>
             {/* <Button onClick={selectArea}>Insert Area</Button> */}
             
        
             <div className="popper_wrapper">

             <Button buttonRef={node => {
                anchorEl = node;
            }}
                aria-owns={open
                ? 'menu-insert-area'
                : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                disableRipple
                className="insertArea_button"
                >
                Insert Preset
                <MaterialIcon icon="arrow_drop_down"/>

            </Button>
            <Popper open={open} anchorEl={anchorEl} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-insert-area"
                        style={{
                        transformOrigin: placement === 'bottom'
                            ? 'center top'
                            : 'center bottom'
                    }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuListUL>
                                        {
                                            listOfCountryPresets.map((el, i) => {
                                            return <MenuItem key={i} data-my-value={el} onClick={(event) => selectedArea(event)}>{el}</MenuItem>
                                            })
                                            }
                                </MenuListUL>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            </div>
            </div>
             
             }
     
    </Mapstyle>
    </div>
}


export default MapSetBounds;

// import React, { useState, useRef} from 'react';
// import styled from 'styled-components';
// // import MapGL from 'react-map-gl';
// import MapGL from '../../MapGL';

// import { Editor, EditingMode } from 'react-map-gl-draw';

// import {
//   DrawPointMode,
//   DrawLineStringMode,
//   DrawRectangleMode,
//   DrawPolygonMode,
// } from '@nebula.gl/edit-modes';

// import { MODES } from './constants';
// import Toolbar from './toolbar';

// const MODE_TO_HANDLER = {
//   [MODES.READ_ONLY]: null,
//   [MODES.EDITING]: EditingMode,
//   [MODES.DRAW_POINT]: DrawPointMode,
//   [MODES.DRAW_PATH]: DrawLineStringMode,
//   [MODES.DRAW_RECTANGLE]: DrawRectangleMode,
//   [MODES.DRAW_POLYGON]: DrawPolygonMode,
// };


// const Mapstyle = styled.div`
//     width: 100%;
//     height: calc(100vh - 252px);
//     left: 0;
//     top: 0;
// `;

// export default function MapSetBounds() {
//     const [selectedMode, setSelectedMode] = useState(null);
//     const [modeHandler, setModeHandler] = useState(null);
//     const [selectedFeatureIndex, setSelectedFeatureIndexes] = useState(null);
//     const editorRef = useRef(null);

//   const _onDelete = () => {
//     if (selectedFeatureIndex === null || selectedFeatureIndex === undefined) {
//       return;
//     }

//     editorRef.deleteFeatures(selectedFeatureIndex);
//   };

//   const _switchMode = (evt) => {
//     let _selectedMode = evt.target.id;
//     if (_selectedMode === selectedMode) {
//       selectedMode = null;
//     }

//     const HandlerClass = MODE_TO_HANDLER[selectedMode];
//     const modeHandler = HandlerClass ? new HandlerClass() : null;
//     setSelectedMode(_selectedMode);
//     setModeHandler(modeHandler)
//   };

//   const _renderToolbar = () => {
//     return (
//       <Toolbar
//         selectedMode={selectedMode}
//         onSwitchMode={_switchMode}
//         onDelete={_onDelete}
//       />
//     );
//   };

//     return (<Mapstyle>
//         <MapGL>
//         <Editor
//           ref={editorRef}
//           clickRadius={12}
//         //   onSelect={(selected) => {
//         //     selected && setSelectedFeatureIndexes(selected.selectedFeatureIndex);
//         //   }}
//           mode={modeHandler}
//         />
//         {_renderToolbar()}
//       </MapGL> </Mapstyle>
//     );
//   }

// import React from 'react';
// import { DrawRectangleMode, DrawPointMode, SnappableMode, TranslateMode, ScaleMode} from '@nebula.gl/edit-modes';


// const Tools = styled.div`
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   top: 10px;
//   right: 10px;
// `;

// const Button = styled.span`
//   color: #fff;
//   background-color: rgb(90, 98, 94);
//   font-size: 1em;
//   font-weight: 400;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
//     'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
//     'Noto Color Emoji';
//   border: 1px solid transparent;
//   border-radius: 0.25em;
//   margin: 0.05em;
//   padding: 0.1em 0.2em;
// `;


// const MODE_BUTTONS = [
//   // TODO: change these to icons
//   { mode: DrawRectangleMode, content: 'Rectangle' },
//   { mode: DrawPointMode, content: 'Draw Point' },
//   { mode: ScaleMode, content: 'Scale' },
//   { mode: new SnappableMode(new TranslateMode()), content: 'Edit' },
// ];

// function Toolbox(props) {
//   // Initialize to zero index on load as nothing is active. 

//   return (
//     <>
//       <Tools>
//         {MODE_BUTTONS.map((modeButton, i) => (
//           <Button
//             key={i}
//             style={{
//               backgroundColor:
//                 props.mode === modeButton.mode ? 'rgb(0, 105, 217)' : 'rgb(90, 98, 94)',
//             }}
//             onClick={() => {
//               props.onSetMode(() => modeButton.mode);
//             }}
//           >
//             {modeButton.content}
//           </Button>
//         ))}
//       </Tools>
     
//     </>
//   );
// }


// // import React from 'react';
// import DeckGL from '@deck.gl/react';
// import { EditableGeoJsonLayer } from '@nebula.gl/layers';
// // import { Toolbox } from '@nebula.gl/editor';
// // import { DrawRectangleMode, EditMode } from '@nebula.gl/edit-modes';
// import { StaticMap } from 'react-map-gl';
// import styled from 'styled-components';

// const Mapstyle = styled.div`
//   position: relative;
//       width: 100%;
//       height: 100vh;
// `;

// const MAPBOX_ACCESS_TOKEN =
// 'pk.eyJ1IjoiYW50aG9ueWhvZGVzdSIsImEiOiJjanI2aWdmMmYxNXB2NDN0ZzJnd3FsMHg3In0.SejE2ZJApZ0Rg5UTsK7kPw';

// const initialViewState = {
//   longitude: 0,
//   latitude: 55,
//   zoom: 12,
// };

// export default function Example() {
//   const [features, setFeatures] = React.useState({
//     type: 'FeatureCollection',
//     features: [{"type":"Feature","properties":{"shape":"Rectangle"},"geometry":{"type":"Polygon","coordinates":[[[-18.36914062500117,60.94938452276491],[8.525390624998632,60.94938452276491],[8.525390624998632,45.733420742426105],[-18.36914062500117,45.733420742426105],[-18.36914062500117,60.94938452276491]]]}}],
//   });
//   const [selectedFeatureIndexes, setSelectedFeatureIndexes] = React.useState([]);
//   const [mode, setMode] = React.useState(() => DrawRectangleMode);

  

//   const layer = new EditableGeoJsonLayer({
//     data: features,
//     mode,
//     selectedFeatureIndexes,
//     editHandleType: 'point',
//     onEdit: ({ updatedData }) => {
//       setFeatures(updatedData);
//     },
//   });

//   const _onLayerClick = function(info) {
    
//     console.log(info);
//     console.log('features', features.features);
//     if (features.features.length) {
//         console.log(`select editing feature ${info.index}`); // eslint-disable-line
//         // a feature was clicked
//         setSelectedFeatureIndexes([info.index]);
//       } else {
//         console.log('deselect editing feature'); // eslint-disable-line
//         // open space was clicked, so stop editing
//         setSelectedFeatureIndexes([])
//       }
//   }

//   console.log(features);

//   return (
//     <>
//         <Mapstyle>
//       <DeckGL
//         initialViewState={initialViewState}
//         controller={{
//           doubleClickZoom: false,
//         }}
//         layers={[layer]}
//         onClick={_onLayerClick}
//         getCursor={layer.getCursor.bind(layer)}
//       >
//         <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
//       </DeckGL>
//       <Toolbox
//         mode={mode}
//         features={features}
//         onSetMode={setMode}
//       />
//       </Mapstyle>
//     </>
//   );
// }



// import React, { Component } from "react";
// import ReactDom from "react-dom";
// import MapGL from "react-map-gl";
// import styled from 'styled-components';
// import {
//   Editor,
//   EditingMode,
//   DrawLineStringMode,
//   DrawPolygonMode
// } from "react-map-gl-draw";

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pwY3owbGFxMDVwNTNxcXdwMms2OWtzbiJ9.1PPVl0VLUQgqrosrI2nUhg";

// const MODES = [
//   { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
//   { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
//   { id: "editing", text: "Edit Feature", handler: EditingMode }
// ];

// const DEFAULT_VIEWPORT = {
//   width: 800,
//   height: 600,
//   longitude: -122.45,
//   latitude: 37.78,
//   zoom: 14
// };

// const Mapstyle = styled.div`
//     position:fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
 
// `;

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewport: DEFAULT_VIEWPORT,
//       modeId: null,
//       modeHandler: null
//     };
//   }

//   _switchMode = evt => {
//     const modeId =
//       evt.target.value === this.state.modeId ? null : evt.target.value;
//     const mode = DrawPolygonMode;
//     const modeHandler = mode ? new mode() : null;
//     this.setState({ modeId, modeHandler });
//   };

//   _renderToolbar = () => {
//     return (
//       <div
//         style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}
//       >
//         <select onChange={this._switchMode}>
//           <option value="">--Please choose a draw mode--</option>
//           {MODES.map(mode => (
//             <option key={mode.id} value={mode.id}>
//               {mode.text}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   };

//   _updateViewport = viewport => {
//     this.setState({ viewport });
//   };

//   render() {
//     const { viewport, modeHandler } = this.state;
//     return (<Mapstyle>
//       <MapGL
//         {...viewport}
//         width="100%"
//         height="100%"
//         mapboxApiAccessToken={MAPBOX_TOKEN}
//         mapStyle={"mapbox://styles/mapbox/light-v9"}
//         onViewportChange={this._updateViewport}
//       >
//         <Editor
//           // to make the lines/vertices easier to interact with
//           clickRadius={12}
//           mode={modeHandler}
//           onSelect={_ => {}}
//         />
//         {this._renderToolbar()}
//       </MapGL></Mapstyle>
//     );
//   }
// }