function CoffeeMarker(props) {
    const { size, markerColor, dropShadowColor } = props;
  
    return <svg
      height={size}
      viewBox="0 0 100 100"
      style={{
        transform: `translate(${-size / 2}px,${-size}px)`,
        filter: `drop-shadow(0 0 4px ${dropShadowColor}`,
        fill: markerColor || '#333333',
        stroke: 'none'
      }}
    >
      <g transform="translate(0,-952.36216)"><path d="m 50.000041,957.36216 a 35.585729,35.585729 0 0 0 -35.585884,35.58586 35.585729,35.585729 0 0 0 23.467876,33.42518 l 12.118008,20.989 12.128129,-21.0063 A 35.585729,35.585729 0 0 0 85.585767,992.94802 35.585729,35.585729 0 0 0 50.000041,957.36216 Z m 0,9.18977 A 26.396155,26.396155 0 0 1 76.396084,992.94802 26.396155,26.396155 0 0 1 50.000041,1019.3441 26.396155,26.396155 0 0 1 23.60384,992.94802 26.396155,26.396155 0 0 1 50.000041,966.55193 Z"></path><path  d="m 44.765582,987.29132 c -0.03248,0.0369 -0.06549,0.0757 -0.09994,0.11993 -0.314084,0.40288 -0.636377,1.09128 -0.863374,1.98578 -0.453638,1.78942 -0.467201,4.11744 -0.03284,5.9402 0.217896,0.91151 0.529838,1.62582 0.847135,2.05465 0.280356,0.37936 0.651368,0.50444 1.068957,0.67109 0.417411,0.16662 0.875331,0.37893 1.228676,0.93258 0.416162,0.65215 0.756657,1.49175 0.958135,2.52535 0.402064,2.0634 0.277144,4.5262 -0.330323,6.5611 -0.190057,0.6375 -0.418125,1.2032 -0.685275,1.6871 a 11.337344,9.0615999 81.930349 0 0 7.231968,-12.46936 11.337344,9.0615999 81.930349 0 0 -9.323127,-10.00842 z m -1.647693,0.13156 a 11.337344,9.0615999 81.930349 0 0 -6.97267,12.42091 11.337344,9.0615999 81.930349 0 0 9.059189,9.99611 c 0.0373,-0.04 0.07513,-0.082 0.114569,-0.1302 0.33889,-0.4132 0.693127,-1.1069 0.960991,-2.0046 0.535906,-1.7955 0.653152,-4.1207 0.299986,-5.9327 -0.176315,-0.906 -0.45792,-1.6127 -0.750233,-2.0301 -0.256443,-0.36609 -0.631559,-0.496 -1.054502,-0.664 -0.422943,-0.16797 -0.888359,-0.37828 -1.226535,-0.91579 -0.41402,-0.65874 -0.813049,-1.48321 -1.060212,-2.51979 -0.49272,-2.06582 -0.479157,-4.53192 0.03748,-6.56959 0.157399,-0.62093 0.354058,-1.17332 0.591941,-1.65025 z"></path><path  d="m 57.729409,992.82584 c -0.02427,0.0249 -0.04908,0.0509 -0.07495,0.0808 -0.235563,0.27311 -0.487366,0.74739 -0.67885,1.3703 -0.382612,1.24604 -0.473803,2.88734 -0.231459,4.18813 0.121708,0.65048 0.316583,1.16533 0.525377,1.47891 0.184346,0.27739 0.441681,0.37859 0.730246,0.51079 0.288565,0.1322 0.60372,0.2979 0.833751,0.7008 0.270541,0.4745 0.481299,1.0788 0.586945,1.8148 0.211115,1.4693 0.0364,3.2016 -0.463631,4.6155 -0.156328,0.4429 -0.336927,0.834 -0.542331,1.166 a 8.0055906,6.3986289 84.781906 0 0 5.538233,-8.5402 8.0055906,6.3986289 84.781906 0 0 -6.223329,-7.38586 z m -1.16693,0.0349 a 8.0055906,6.3986289 84.781906 0 0 -2.500717,1.08939 11.749248,9.3908225 81.930349 0 1 0.879257,3.30372 11.749248,9.3908225 81.930349 0 1 -1.828648,9.02574 8.0055906,6.3986289 84.781906 0 0 4.134133,2.4639 c 0.02802,-0.027 0.05604,-0.055 0.08548,-0.088 0.253766,-0.2795 0.527519,-0.7564 0.747913,-1.38 0.441146,-1.2475 0.605326,-2.8834 0.420267,-4.1736 -0.09298,-0.6452 -0.266258,-1.1536 -0.457743,-1.4583 -0.168106,-0.2671 -0.428118,-0.3719 -0.720609,-0.5052 -0.292312,-0.1334 -0.612821,-0.298 -0.83268,-0.6889 -0.268756,-0.47912 -0.521451,-1.0747 -0.65922,-1.81444 -0.275002,-1.47424 -0.178814,-3.21275 0.257157,-4.63166 0.132772,-0.4324 0.291063,-0.81505 0.475409,-1.14305 z"></path><path d="m 47.497758,984.21481 c -0.01428,-0.17321 -0.01428,-0.34745 0,-0.52066 0.0439,-0.7971 0.825364,-1.7984 1.732103,-3.12974 l 0,0 c 0.581413,-0.83438 1.099652,-1.64786 1.158008,-2.04421 0.232529,-1.60244 -2.609576,-2.47768 -2.736816,-2.46412 0.267328,0.44897 0.276251,0.88974 0.251446,1.33866 -0.04408,0.79715 -0.828398,1.7993 -1.736565,3.12891 l 0,0 c -0.578379,0.83348 -1.118925,1.64607 -1.175853,2.04317 -0.145978,0.98233 0.87783,1.6905 1.717648,2.08875 0.530196,0.25119 0.990079,0.37902 1.038441,0.37358 -0.162217,-0.27208 -0.223606,-0.54328 -0.24395,-0.81434" ></path><path d="m 52.75974,983.38454 c 0,-0.14692 0,-0.29208 0,-0.43814 0.02962,-0.67282 0.644051,-1.5145 1.352525,-2.63364 0.452745,-0.70278 0.857129,-1.38671 0.902635,-1.71955 0.180777,-1.34946 -2.32226,-2.38506 -2.421482,-2.37337 0.208795,0.37736 0.215933,0.74919 0.195589,1.12643 -0.04372,0.66934 -0.645479,1.51273 -1.356808,2.63087 l 0,0 c -0.452567,0.70116 -0.85588,1.38497 -0.900851,1.71868 -0.08762,0.62492 0.395461,1.18078 0.963667,1.59891 0.655651,0.4834 1.403386,0.78076 1.456209,0.77361 -0.131523,-0.22859 -0.173995,-0.45714 -0.189878,-0.6838"></path></g>
    </svg>
  }

export default CoffeeMarker;