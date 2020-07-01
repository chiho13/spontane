function TrainStation(props) {
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
     <path fillRule="evenodd" clipRule="evenodd" d="M72.839,13.551c1.102,0.868,2.158,1.83,3.166,2.886  c7.297,7.25,10.945,15.988,10.945,26.217c0,10.182-3.648,18.874-10.945,26.077c-0.117,0.164-0.234,0.387-0.352,0.668  c-0.281,0.165-0.539,0.399-0.773,0.704L53.976,92.097c-2.697,3.073-5.36,3.073-7.988,0L24.345,69.223  c-0.117-0.164-0.234-0.328-0.352-0.492C16.697,61.528,13.05,52.836,13.05,42.654c0-10.229,3.647-18.967,10.943-26.217  c1.01-1.056,2.088-2.018,3.238-2.886c6.451-5.302,14.064-7.953,22.838-7.953C58.75,5.598,66.34,8.249,72.839,13.551z M50.95,20.026  c0.328-0.329,0.715-0.493,1.16-0.493c0.446,0,0.799,0.141,1.057,0.422c0.375,0.329,0.563,0.716,0.563,1.162  c0,0.422-0.164,0.797-0.492,1.125c-0.234,0.282-0.575,0.446-1.021,0.493c-0.469,0-0.867-0.141-1.195-0.422  c-0.282-0.282-0.423-0.668-0.423-1.162C50.551,20.753,50.669,20.378,50.95,20.026z M50.069,28.085h0.881c0.375,0,0.703,0,0.984,0  c0.821,0.071,1.373-0.012,1.654-0.246c0.141-0.235,0.211-0.798,0.211-1.689c0-0.188,0-0.328,0-0.422  c-0.047-0.75-0.434-1.126-1.161-1.126c-1.807-0.047-3.589-0.047-5.349,0c-0.728,0-1.068,0.293-1.021,0.88  c0,0.281-0.036,0.727-0.106,1.337c0.024,0.563,0.247,0.986,0.67,1.267c0.07,0.023,0.164,0.035,0.281,0.035s0.223,0,0.316,0h2.639  V28.085z M63.021,29.281c-0.023,4.646-0.023,11.25,0,19.813c0,1.525-0.317,2.803-0.951,3.836c-0.633,1.056-1.653,1.865-3.061,2.428  l-0.353,0.281l6.546,9.854c-0.399,0-1.021,0.023-1.865,0.07c-0.728-0.047-1.326-0.094-1.795-0.141c-0.094,0-0.199-0.059-0.316-0.176  c-0.047-0.046-0.141-0.164-0.281-0.352c-1.619-2.323-2.922-4.223-3.906-5.701c-0.164-0.281-0.329-0.469-0.493-0.563  c-0.164-0.117-0.388-0.176-0.669-0.176c-3.871,0.047-7.754,0.035-11.648-0.035c-0.281,0-0.516,0.059-0.703,0.176  c-0.164,0.07-0.352,0.246-0.563,0.528c-0.869,1.29-2.183,3.237-3.941,5.841c-0.165,0.188-0.329,0.329-0.493,0.422  c-0.164,0.117-0.364,0.176-0.599,0.176c-0.445,0-0.961,0-1.548,0c-0.329,0-0.868,0-1.618,0l6.58-9.994  c-0.469-0.234-0.763-0.387-0.88-0.458c-1.126-0.516-1.971-1.22-2.534-2.111c-0.633-0.915-0.949-1.971-0.949-3.167  c0-9.267,0.012-16.176,0.035-20.728c0-1.642,0.539-3.003,1.618-4.082c1.103-1.056,2.452-1.595,4.048-1.619c1.242,0,3.658,0,7.248,0  c3.098,0.023,5.561,0.023,7.391,0c1.572-0.047,2.956,0.586,4.152,1.9C62.551,26.595,63.067,27.921,63.021,29.281z M59.079,30.056  c-0.517-0.469-1.08-0.704-1.689-0.704c-4.974-0.047-9.9-0.035-14.78,0.035c-0.681,0-1.255,0.223-1.724,0.668  c-0.446,0.469-0.692,1.032-0.74,1.689c-0.07,1.525-0.07,3.062,0,4.61c0,0.68,0.259,1.267,0.775,1.759  c0.563,0.422,1.16,0.633,1.794,0.633h7.214c1.689,0,2.957,0,3.801,0c1.432,0,2.651,0,3.66,0c0.727-0.023,1.325-0.281,1.795-0.774  c0.492-0.563,0.738-1.185,0.738-1.865c-0.047-1.243-0.094-2.698-0.141-4.364C59.735,31.135,59.501,30.572,59.079,30.056z   M55.454,48.073c-0.516,0.516-0.774,1.115-0.774,1.794c0.048,0.681,0.306,1.267,0.774,1.76c0.492,0.516,1.103,0.774,1.83,0.774  c0.68,0,1.278-0.258,1.795-0.774c0.469-0.493,0.68-1.091,0.633-1.794c0-0.704-0.211-1.314-0.633-1.83  c-0.517-0.399-1.115-0.598-1.795-0.598C56.51,47.405,55.899,47.627,55.454,48.073z M82.058,42.548c0-8.798-3.143-16.34-9.431-22.627  c-6.287-6.287-13.853-9.431-22.698-9.431c-8.797,0-16.34,3.144-22.627,9.431S17.87,33.75,17.87,42.548s3.145,16.34,9.432,22.627  c6.287,6.288,13.83,9.431,22.627,9.431c8.846,0,16.411-3.144,22.698-9.431C78.915,58.889,82.058,51.346,82.058,42.548z   M46.691,19.956c0.329-0.282,0.692-0.422,1.091-0.422c0.469,0,0.845,0.164,1.127,0.493c0.328,0.329,0.492,0.692,0.492,1.091  c0,0.398-0.164,0.774-0.492,1.125c-0.282,0.329-0.635,0.493-1.057,0.493c-0.445,0-0.832-0.164-1.161-0.493  c-0.328-0.352-0.492-0.727-0.492-1.125C46.199,20.672,46.363,20.285,46.691,19.956z M42.609,47.405  c-0.681,0-1.278,0.223-1.794,0.668c-0.446,0.516-0.67,1.115-0.67,1.794c0,0.681,0.247,1.267,0.74,1.76  c0.539,0.563,1.137,0.821,1.795,0.774c0.68,0,1.254-0.258,1.724-0.774c0.517-0.493,0.774-1.079,0.774-1.76  c0-0.75-0.258-1.372-0.774-1.865C43.981,47.604,43.384,47.405,42.609,47.405z"></path>
   </svg>
  }


  export default TrainStation;

