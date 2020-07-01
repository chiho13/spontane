function FillingStationMarker(props) {
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
    <g><path fillRule="evenodd" clipRule="evenodd" d="M50,5.531c-19.631,0-35.543,15.913-35.544,35.543   c0,9.815,4.366,18.336,10.411,25.135L50,94.469l25.134-28.26c6.043-6.799,10.41-15.319,10.41-25.135   C85.544,21.444,69.63,5.531,50,5.531z M69.874,60.948C64.788,66.035,57.761,69.181,50,69.181c-7.763,0-14.788-3.146-19.875-8.232   c-5.086-5.087-8.231-12.113-8.231-19.874c0-15.523,12.584-28.105,28.106-28.105c15.521,0,28.105,12.582,28.105,28.105   C78.105,48.835,74.96,55.861,69.874,60.948z"></path><path fillRule="evenodd" clipRule="evenodd" d="M67.137,35.896l-0.128-0.595l-1.238-3.745c0.199-0.158,0.305-0.424,0.192-0.656   l-1.066-2.22c-0.192-0.402-0.647-0.598-1.072-0.46l-0.57,0.186l-0.002,0.003L61.751,27.5l-0.786,0.193l-1.621-0.824v-3.116   c0-0.702-0.575-1.276-1.277-1.276H39.294c-0.702,0-1.276,0.574-1.276,1.276v35.565c0,0.702,0.574,1.276,1.276,1.276h18.772   c0.702,0,1.277-0.574,1.277-1.276V44.984c0.561,0.022,1.045,0.159,1.253,0.56c0.226,0.437,0.201,1.604,0.173,2.901   c-0.011,0.507-0.022,1.031-0.022,1.334h0.003c0,2.893,0.396,5.753,3.439,5.753c0.296,0,0.576-0.037,0.844-0.11   c1.353-0.367,2.205-1.567,2.699-3.242c0.437-1.479,0.603-3.355,0.603-5.32c0-4.216-0.756-8.939-1.201-10.963L67.137,35.896z    M62.693,32.76c0.092-0.223,0.25-0.414,0.487-0.453l1.056-0.172l0.908,2.796l-0.961,0.085c-0.33,0.029-0.632-0.11-0.793-0.399   l-0.665-1.192C62.607,33.215,62.603,32.982,62.693,32.76z M55.81,36.305H41.55c-0.723,0-1.314-0.592-1.314-1.315v-9   c0-0.723,0.592-1.314,1.314-1.314h14.26c0.724,0,1.315,0.592,1.315,1.314v9C57.125,35.713,56.533,36.305,55.81,36.305z    M66.069,51.69c-0.324,1.101-0.804,1.868-1.491,2.056c-0.118,0.032-0.248,0.049-0.389,0.049c-1.512,0-1.708-1.997-1.708-4.016   h0.003c0-0.584,0.008-0.945,0.016-1.3c0.034-1.531,0.063-2.907-0.363-3.729c-0.613-1.183-1.692-1.493-2.793-1.51V27.778   l1.192,0.608l-0.005,0.008l0.196,0.796l1.254,0.759l-0.567,0.69c-0.006,0.006-0.001,0.014-0.006,0.02l-0.012,0.005l-0.496,0.88   c-0.1,0.176-0.122,0.368-0.035,0.549c0.611,1.279,1.259,2.507,1.92,3.768c0.145,0.275,0.434,0.422,0.74,0.374l1.839-0.286   c0.403,1.659,1.233,6.55,1.233,10.911C66.598,48.683,66.452,50.395,66.069,51.69z"></path></g>
     </svg>
  }


  export default FillingStationMarker;

