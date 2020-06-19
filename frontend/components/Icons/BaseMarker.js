import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import OriginalMarker from './MapMarkers/Original';
import UniversityMarker from './MapMarkers/University';
import CoffeeMarker from './MapMarkers/Coffee';
import HostelMarker from './MapMarkers/Hostel';
import AirportMarker from './MapMarkers/Airport';
import RestaurantMarker from './MapMarkers/Restaurant';
import ATMMarker from './MapMarkers/ATM';
import LandmarkMarker from './MapMarkers/Landmark';
import MetroMarker from './MapMarkers/Metro';
import TrainMarker from './MapMarkers/TrainStation';

import RestroomsMarker from './MapMarkers/Restrooms';
import FillingStationMarker from './MapMarkers/FillingStation';
import BusStopMarker from './MapMarkers/BusStop';
import CoachStationMarker from './MapMarkers/CoachStation';
import PoliceMarker from './MapMarkers/Police';
import FirstAidMarker from './MapMarkers/FirstAid';
import TargetMarker from './MapMarkers/Target';
import Siren from './MapMarkers/Siren';

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
  "Default": OriginalMarker,
  "Café": CoffeeMarker,
  "Food": RestaurantMarker,
  "Hostel": HostelMarker,
  "University": UniversityMarker,
  "ATM": ATMMarker,
  "Landmark": LandmarkMarker,
  "Toilet": RestroomsMarker,
  "Fuel Station": FillingStationMarker,
  "Train Station": TrainMarker,
  "Bus Stop": BusStopMarker,
  "Coach Station": CoachStationMarker,
  "Metro Station": MetroMarker,
  "Airport": AirportMarker,
  "Police": PoliceMarker,
  "First Aid": FirstAidMarker,
  "Target": TargetMarker,
  "Emergency": Siren
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