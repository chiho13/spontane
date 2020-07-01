function RestroomsMarker(props) {
    const { size, markerColor, dropShadowColor } = props;
  
    return <svg
      height={size}
      viewBox="0 0 100 100"
      style={{
        
        filter: `drop-shadow(0 0 4px ${dropShadowColor}`,
        fill: markerColor,
        stroke: 'none'
      }}
    >
   <g><path fillRule="evenodd" clipRule="evenodd" d="M50,5.614c-19.595,0-35.478,15.884-35.478,35.478   c0,9.797,4.357,18.302,10.391,25.088L50,94.386L75.087,66.18c6.031-6.786,10.391-15.291,10.391-25.087   C85.478,21.498,69.594,5.614,50,5.614z M70.763,61.854c-5.314,5.313-12.655,8.6-20.763,8.6c-8.11,0-15.45-3.284-20.764-8.6   c-5.313-5.314-8.599-12.655-8.599-20.763c0-16.217,13.146-29.363,29.363-29.363c16.216,0,29.362,13.146,29.362,29.363   C79.362,49.199,76.075,56.54,70.763,61.854z"></path><path fillRule="evenodd" clipRule="evenodd" d="M40.889,34.956c3.31,0,6.009-2.699,6.009-6.009c0-3.309-2.699-6.009-6.009-6.009   s-6.009,2.7-6.009,6.009C34.879,32.256,37.579,34.956,40.889,34.956z"></path><polygon fillRule="evenodd" clipRule="evenodd" points="40.889,36.262 30.177,36.262 35.533,46.386 40.889,56.51 46.245,46.386    51.6,36.262  "></polygon><path fillRule="evenodd" clipRule="evenodd" d="M58.367,34.956c3.31,0,6.009-2.699,6.009-6.009c0-3.309-2.699-6.009-6.009-6.009   s-6.009,2.7-6.009,6.009C52.358,32.256,55.058,34.956,58.367,34.956z"></path><polygon fillRule="evenodd" clipRule="evenodd" points="58.367,36.262 53.011,46.386 47.656,56.51 58.367,56.51 69.078,56.51    63.724,46.386  "></polygon></g> </svg>
  }


  export default RestroomsMarker;

