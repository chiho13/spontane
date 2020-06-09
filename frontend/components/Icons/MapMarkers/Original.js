function OriginalMarker(props) {
    const { size, markerColor, dropShadowColor } = props;
  
    return <svg
      height={size}
      viewBox="0 0 100 100"
      style={{
        transform: `translate(${-size / 2}px,${-size}px)`,
        filter: `drop-shadow(0 0 4px ${dropShadowColor}`,
        fill: markerColor,
        stroke: 'none'
      }}
    >
      <path d="M76.243,16.072c-14.493-14.493-37.991-14.496-52.486,0C9.264,30.564,9.264,54.062,23.758,68.557l26.243,26.242  l26.242-26.242C90.736,54.062,90.736,30.564,76.243,16.072z M50.003,64.107c-12.042,0-21.8-9.754-21.798-21.792  c0-12.039,9.759-21.799,21.798-21.796c12.035-0.002,21.792,9.755,21.795,21.793C71.798,54.354,62.039,64.107,50.003,64.107z" />
    </svg>
  }


  export default OriginalMarker;