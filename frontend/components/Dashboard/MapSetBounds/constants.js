export const MODES = {
  READ_ONLY: 'READ_ONLY',
  EDITING: 'EDITING',
  DRAW_POINT: 'DRAW_POINT',
  DRAW_PATH: 'DRAW_PATH',
  DRAW_POLYGON: 'DRAW_POLYGON',
  DRAW_RECTANGLE: 'DRAW_RECTANGLE',
  DRAW_RECTANGLE_ONE_CLICK: 'DRAW_RECTANGLE_ONE_CLICK',
};

export const GEOJSON_TYPE = {
  POINT:'Point',
  LINE_STRING:'LineString',
  POLYGON: 'Polygon'
}

export const SHAPE = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  POLYGON: 'Polygon',
  RECTANGLE:'Rectangle',
  CIRCLE: 'Circle',
}

export const RENDER_TYPE = {
  POINT:'Point',
  LINE_STRING: 'LineString',
  POLYGO: 'Polygon',
  RECTANGLE: 'Rectangle',
}

export const RENDER_STATE = {
  INACTIVE: 'INACTIVE',
  UNCOMMITTED: 'UNCOMMITTED',
  SELECTED: 'SELECTED',
  HOVERED: 'HOVERED',
  CLOSING: 'CLOSING',
}

export const GUIDE_TYPE = {
  TENTATIVE: 'tentative',
  EDIT_HANDLE: 'editHandle',
  CURSOR_EDIT_HANDLE: 'cursorEditHandle',
}

export const ELEMENT_TYPE = {
  FEATURE: 'feature',
  FILL: 'fill',
  SEGMENT: 'segment',
  EDIT_HANDLE: 'editHandle'
}

export const EDIT_TYPE = {
  ADD_FEATURE: 'addFeature',
  ADD_POSITION: 'addPosition',
  REMOVE_POSITION: 'removePosition',
  MOVE_POSITION: 'movePosition',
  FINISH_MOVE_POSITION : 'finishMovePosition'
}

export const COUNTRY_PRESETS = {
  UK: 'UK',
  NORTH_AMERICA: 'North America',
  SOUTH_AMERICA: 'South America',
  AFRICA: 'Africa',
  EUROPE: 'Europe',
  ASIA: 'Asia',
  OCEANIA: 'Oceania',
  ITALY: 'Italy'
}

