import { RENDER_STATE, SHAPE } from './constants';

const RECT_STYLE = {
  stroke: '#444444',
  strokeWidth: 2,
  x: -6,
  y: -6,
  height: 12,
  width: 12,
};

const CIRCLE_RADIUS = 8;

const SELECTED_STYLE = {
  stroke: '#444444',
  strokeWidth: 2,
  fill: '#007bff',
  fillOpacity: 0.5,
};

const HOVERED_STYLE = {
  stroke: '#444444',
  strokeWidth: 2,
  fill: '#444444',
  fillOpacity: 0.5,
};

const UNCOMMITTED_STYLE = {
  stroke: '#555555',
  strokeWidth: 2,
  fill: '#999999',
  fillOpacity: 0.3,
};

const INACTIVE_STYLE = UNCOMMITTED_STYLE;

const DEFAULT_STYLE = {
  stroke: '#000000',
  strokeWidth: 2,
  fill: '#a9a9a9',
  fillOpacity: 0.1,
};

export function featureStyle({ feature, state }) {
  const type = feature.properties.shape || feature.geometry.type;

  // const hasStyle = feature.properties.hasOwnProperty("style");

  // if(hasStyle) {
  //   console.log(feature.properties.style)
  // }
  let style = null;

  switch (state) {
    case RENDER_STATE.SELECTED:
      style = { ...SELECTED_STYLE };
      break;

    case RENDER_STATE.HOVERED:
      style = { ...HOVERED_STYLE };
      break;

    case RENDER_STATE.UNCOMMITTED:
    case RENDER_STATE.CLOSING:
      style = { ...UNCOMMITTED_STYLE };
      break;

    case RENDER_STATE.INACTIVE:
      style = { ...INACTIVE_STYLE };
      break;

    default:
      style = { ...DEFAULT_STYLE };
  }

  switch (type) {
    case SHAPE.POINT:
      style.r = CIRCLE_RADIUS;
      break;
    case SHAPE.LINE_STRING:
      style.fill = 'none';
      break;
    case SHAPE.POLYGON:
      if (state === RENDER_STATE.CLOSING) {
        style.strokeDasharray = '4,2';
      }

      break;
    case SHAPE.RECTANGLE:
      if (state === RENDER_STATE.UNCOMMITTED) {
        style.strokeDasharray = '4,2';
      }

      break;
    default:
  }

  return style;
}

export function editHandleStyle({ feature, shape, index, state }) {
  let style = {};
  switch (state) {
    case RENDER_STATE.SELECTED:
      style = { ...SELECTED_STYLE };
      break;

    case RENDER_STATE.HOVERED:
      style = { ...HOVERED_STYLE };
      break;

    case RENDER_STATE.UNCOMMITTED:
    case RENDER_STATE.CLOSING:
      style = { ...UNCOMMITTED_STYLE };
      break;

    case RENDER_STATE.INACTIVE:
      style = { ...INACTIVE_STYLE };
      break;

    default:
      style = { ...DEFAULT_STYLE };
  }

  switch (shape) {
    case 'circle':
      //@ts-ignore
      style.r = CIRCLE_RADIUS;
      break;
    case 'rect':
      style = { ...style, ...RECT_STYLE };
      break;
    default:
  }

  return style;
}
