function AirportMarker(props) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M72.839,13.551c1.103,0.868,2.158,1.83,3.167,2.886  c7.296,7.25,10.944,15.988,10.944,26.217c0,10.182-3.648,18.874-10.944,26.077c-0.117,0.164-0.234,0.387-0.352,0.668  c-0.282,0.165-0.54,0.399-0.774,0.704L53.977,92.097c-2.698,3.073-5.36,3.073-7.988,0L24.346,69.223  c-0.117-0.164-0.234-0.328-0.352-0.492C16.698,61.528,13.05,52.836,13.05,42.654c0-10.229,3.648-18.967,10.944-26.217  c1.009-1.056,2.088-2.018,3.237-2.886c6.452-5.302,14.064-7.953,22.839-7.953C58.751,5.598,66.34,8.249,72.839,13.551z   M70.974,31.921c-0.258,0.845-0.786,1.49-1.584,1.935c-0.985,0.517-2.24,1.197-3.765,2.042l-3.73,1.971  c-0.329,0.164-0.728,0.387-1.196,0.668c-0.446,0.234-0.845,0.434-1.197,0.598c-0.094,0.118-0.152,0.2-0.176,0.247  c-0.094,0.117-0.141,0.188-0.141,0.211c-0.07,0.845-0.152,2.686-0.246,5.525c-0.023,0-0.023,0.07,0,0.211  c0.258-0.141,0.445-0.247,0.563-0.317c0.188-0.165,0.388-0.27,0.599-0.316c0.47-0.188,0.868-0.165,1.196,0.07  c0.446,0.282,0.669,0.646,0.669,1.091c0,0.516-0.223,0.88-0.669,1.091c-0.234,0.117-0.574,0.293-1.021,0.528  c-0.492,0.235-0.88,0.434-1.161,0.598c-0.117,0.117-0.211,0.223-0.281,0.317c-0.047,0.07-0.094,0.188-0.141,0.352  c0,0.516-0.07,2.252-0.212,5.208c-0.094,2.135-0.176,3.883-0.246,5.243c-0.047,0.399-0.129,0.716-0.246,0.95  c-0.164,0.165-0.388,0.329-0.669,0.493c-0.188,0.117-0.48,0.27-0.88,0.458c-0.445,0.258-0.727,0.422-0.844,0.493  c-0.259,0.164-0.505,0.2-0.739,0.105c-0.117-0.07-0.234-0.27-0.353-0.598l-4.855-16.082c-0.094-0.211-0.153-0.375-0.177-0.493  l-0.492,0.246c-4.527,2.487-7.448,4.047-8.763,4.681c-0.164,0.094-0.27,0.199-0.316,0.316c-0.117,0.165-0.176,0.305-0.176,0.422  c-0.117,0.563-0.271,1.443-0.458,2.64c-0.211,1.126-0.398,1.982-0.563,2.569c0,0.281-0.082,0.528-0.246,0.739  c-0.118,0.188-0.294,0.34-0.528,0.457c-0.117,0.047-0.34,0.176-0.669,0.387c-0.305,0.141-0.539,0.176-0.703,0.105  c-0.165-0.07-0.294-0.27-0.388-0.598c-0.703-3.214-1.173-5.478-1.407-6.792c-0.141-0.516-0.388-0.938-0.739-1.267  c-0.681-0.704-1.502-1.537-2.464-2.499c-1.008-1.103-1.794-1.912-2.357-2.428c-0.234-0.281-0.328-0.516-0.281-0.704  c0-0.117,0.164-0.282,0.492-0.493c0.423-0.281,0.856-0.434,1.303-0.457c0.492,0,0.974,0.094,1.442,0.281  c0.61,0.329,1.313,0.634,2.111,0.915c0.962,0.422,1.666,0.739,2.111,0.95c0.118,0,0.235,0.023,0.353,0.07  c0.164,0,0.281-0.047,0.352-0.141c1.525-0.751,4.552-2.346,9.079-4.786c0.023,0,0.059-0.047,0.105-0.141l0.177-0.035  c-0.681-0.938-1.197-1.584-1.549-1.936L35.36,25.446c-0.164-0.211-0.234-0.375-0.211-0.493c0.047-0.165,0.211-0.329,0.493-0.493  c0.117-0.023,0.398-0.164,0.844-0.422c0.353-0.234,0.669-0.411,0.95-0.528c0.259-0.211,0.517-0.293,0.774-0.246  c0.259,0,0.54,0.082,0.845,0.246c1.009,0.633,2.476,1.537,4.399,2.71c1.993,1.196,3.472,2.099,4.434,2.709  c0.164,0.117,0.328,0.176,0.493,0.176c0.188,0,0.363-0.047,0.527-0.141c0.774-0.516,1.478-0.915,2.111-1.197  c0.328-0.164,0.669-0.188,1.021-0.07c0.328,0.141,0.575,0.352,0.739,0.634c0.117,0.352,0.117,0.692,0,1.021  c-0.094,0.305-0.306,0.54-0.634,0.704l-1.056,0.598l0.176,0.176c0.07,0.047,0.105,0.094,0.105,0.141  c0.329,0.141,1.091,0.551,2.288,1.232c0.844,0.54,1.548,0.962,2.111,1.267c0.164,0.117,0.281,0.176,0.352,0.176  c0.117,0.047,0.259,0.012,0.422-0.105c2.886-1.572,6.112-3.296,9.678-5.173c0.868-0.446,1.725-0.587,2.569-0.422  c0.892,0.258,1.536,0.786,1.936,1.583C71.173,30.325,71.255,31.123,70.974,31.921z M82.059,42.548c0-8.798-3.144-16.34-9.431-22.627  C66.34,13.634,58.774,10.49,49.93,10.49c-8.798,0-16.341,3.144-22.628,9.431s-9.431,13.83-9.431,22.627s3.144,16.34,9.431,22.627  c6.287,6.288,13.83,9.431,22.628,9.431c8.845,0,16.41-3.144,22.698-9.431C78.915,58.889,82.059,51.346,82.059,42.548z"></path>
    </svg>
  }

export default AirportMarker;