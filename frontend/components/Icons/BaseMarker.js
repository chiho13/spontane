import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import OriginalMarker from './MapMarkers/Original';
import CoffeeMarker from './MapMarkers/Coffee';
import AirportMarker from './MapMarkers/Airport';

import {ViewPortContext} from '../providers/MapProvider';

const BaseMarkerStyle = styled.div`
display: flex;
cursor: pointer;

&:after {
  content: '';
  position: absolute;
  width: 42px;
  height: 47px;
  left: 30px;
  top: 0;
  transform: translate(-51px,-40px);
  border: 2px solid #dd0000;
  border-radius: 4px;
  display: ${props => props.selected ? 'block' : 'none'};
}
svg {
  transition: all 0.3s ease;
}
`;

export const Markers = {
  Default: OriginalMarker,
  Coffee: CoffeeMarker,
  Airport: AirportMarker
};

function BaseMarker(props) {
  const { size, pinColor, onClick, dropShadowColor, markerType, selected} = props;
  const DynamicMarker = Markers[markerType];

  return (
    <BaseMarkerStyle selected={selected}
      onClick={onClick}
    >
      <DynamicMarker size={size} markerColor={pinColor} dropShadowColor={dropShadowColor} />
    </BaseMarkerStyle>
  );
}

BaseMarker.defaultProps = {
  size: 35,
  selected: false,
  dropShadowColor: '#ffffff',
  markerType: 'Default'
}

export default BaseMarker;