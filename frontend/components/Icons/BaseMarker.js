import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import OriginalMarker from './MapMarkers/Original';
import CoffeeMarker from './MapMarkers/Coffee';
import AirportMarker from './MapMarkers/Airport';

import {ViewPortContext} from '../providers/MapProvider';

const BaseMarkerStyle = styled.div`
cursor: pointer;

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
  const { size, pinColor, onClick, dropShadowColor, markerType } = props;
  const DynamicMarker = Markers[markerType];

  return (
    <BaseMarkerStyle
      onClick={onClick}
    >
      <DynamicMarker size={size} markerColor={pinColor} dropShadowColor={dropShadowColor} />
    </BaseMarkerStyle>
  );
}

BaseMarker.defaultProps = {
  size: 30,
  dropShadowColor: '#ffffff',
  markerType: 'Default'
}

export default BaseMarker;