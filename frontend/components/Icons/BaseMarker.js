import React, { useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import OriginalMarker from './MapMarkers/Original';
import CoffeeMarker from './MapMarkers/Coffee';
import AirportMarker from './MapMarkers/Airport';

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
  const [markerColor, setMarkerColor] = useState(pinColor);

  return (
    <BaseMarkerStyle
      onMouseEnter={() => {
        const hoverColor = darken(0.1, pinColor);
        setMarkerColor(hoverColor);
      }}
      onMouseLeave={() => {
        setMarkerColor(pinColor);
      }}
      onClick={onClick}
    >
      <DynamicMarker size={size} markerColor={markerColor} dropShadowColor={dropShadowColor} />
    </BaseMarkerStyle>
  );
}

BaseMarker.defaultProps = {
  size: 30,
  pinColor: '#f7f7f7',
  dropShadowColor: '#333333',
  markerType: 'Default'
}

export default BaseMarker;