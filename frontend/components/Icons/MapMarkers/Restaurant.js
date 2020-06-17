function RestaurantMarker(props) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M72.839,13.551c1.103,0.868,2.158,1.83,3.167,2.886  c7.296,7.25,10.944,15.988,10.944,26.217c0,10.182-3.648,18.874-10.944,26.077c-0.117,0.164-0.234,0.387-0.352,0.668  c-0.282,0.165-0.54,0.399-0.774,0.704L53.977,92.097c-2.698,3.073-5.36,3.073-7.988,0L24.346,69.223  c-0.117-0.164-0.234-0.328-0.352-0.492C16.698,61.528,13.05,52.836,13.05,42.654c0-10.229,3.648-18.967,10.944-26.217  c1.009-1.056,2.088-2.018,3.237-2.886c6.452-5.302,14.064-7.953,22.839-7.953C58.751,5.598,66.34,8.249,72.839,13.551z   M82.059,42.548c0-8.798-3.144-16.34-9.431-22.627C66.34,13.634,58.774,10.49,49.93,10.49c-8.798,0-16.341,3.144-22.628,9.431  s-9.431,13.83-9.431,22.627s3.144,16.34,9.431,22.627c6.287,6.288,13.83,9.431,22.628,9.431c8.845,0,16.41-3.144,22.698-9.431  C78.915,58.889,82.059,51.346,82.059,42.548z M57.144,49.023L52.534,22.49c-0.094-0.516,0.046-0.974,0.422-1.372  c0.234-0.282,0.574-0.446,1.021-0.493c0.516-0.07,0.927-0.012,1.231,0.176c0.423,0.234,0.669,0.657,0.739,1.267l3.237,26.604  c0.047,0.399,0.188,0.763,0.422,1.091c0.282,0.235,0.622,0.528,1.021,0.88c0.727,0.493,1.173,0.763,1.337,0.81  c0.469,0.469,0.903,0.903,1.302,1.302c1.173,1.455,1.631,3.602,1.373,6.44c-0.141,1.08-0.399,2.111-0.774,3.097  c-0.282,1.009-0.599,1.701-0.95,2.076c-0.798,0.868-1.561,1.361-2.287,1.478c-0.751,0.117-1.596-0.117-2.534-0.704  c-0.517-0.329-1.056-0.891-1.618-1.689c-0.634-0.915-1.174-1.9-1.619-2.956c-0.985-2.604-1.138-4.739-0.458-6.405  c0.188-0.563,0.481-1.091,0.88-1.583c0.094-0.164,0.399-0.586,0.915-1.267c0.352-0.399,0.587-0.774,0.704-1.126  C57.108,49.786,57.19,49.422,57.144,49.023z M43.524,19.851l2.323,13.583c0.094,0.469,0,0.95-0.281,1.443  c-0.212,0.258-0.575,0.598-1.092,1.021c-0.609,0.399-0.974,0.692-1.091,0.88c-0.281,0.398-0.398,0.762-0.352,1.091l4.434,26.006  c0.118,0.469,0.023,0.903-0.281,1.302c-0.281,0.329-0.669,0.516-1.161,0.563c-0.398,0.07-0.798,0.012-1.196-0.176  c-0.353-0.281-0.575-0.704-0.669-1.267L41.062,38.22c-0.094-0.352-0.34-0.645-0.739-0.879c-0.188-0.211-0.621-0.458-1.302-0.739  c-0.656-0.188-1.103-0.387-1.337-0.598c-0.446-0.399-0.704-0.821-0.774-1.267L35.29,21.047c-0.047-0.446,0.094-0.704,0.423-0.774  c0.352-0.047,0.551,0.152,0.598,0.598l1.619,11.332c0.047,0.258,0.188,0.469,0.423,0.633c0.163,0.117,0.328,0.176,0.492,0.176  c0.141-0.047,0.281-0.152,0.422-0.317c0.117-0.188,0.129-0.41,0.035-0.668l-1.618-11.402c-0.048-0.399,0.117-0.622,0.492-0.668  c0.306-0.023,0.481,0.164,0.528,0.563l1.795,12.176c0.094,0.282,0.176,0.481,0.246,0.599c0.211,0.164,0.398,0.211,0.563,0.141  c0.188,0,0.306-0.082,0.353-0.246c0.188-0.165,0.27-0.388,0.246-0.669l-1.865-12.176c-0.047-0.446,0.094-0.692,0.423-0.739  c0.398-0.047,0.609,0.152,0.633,0.598l1.619,11.402c0.047,0.211,0.188,0.375,0.422,0.493c0.141,0.118,0.281,0.152,0.423,0.106  c0.164,0,0.352-0.071,0.563-0.211c0.07-0.165,0.082-0.364,0.035-0.598l-1.725-11.367c-0.047-0.469,0.129-0.727,0.528-0.774  C43.29,19.158,43.478,19.358,43.524,19.851z"></path>
      </svg>
  }


  export default RestaurantMarker;

