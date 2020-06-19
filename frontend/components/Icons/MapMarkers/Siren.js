import styled,  {keyframes}  from 'styled-components';

function glowing (props) {
    const animation = keyframes`

0% {
  filter: drop-shadow(0 0 4px ${props.markerColor});
  opacity: 1;
}

70% {
  filter: drop-shadow(0 0 1px ${props.markerColor});
  opacity: 0.9;
}
100% {
  filter: drop-shadow(0 0 8px ${props.markerColor});
  opacity: 1;
}

`
    return animation;
  };

const MarkerStyle = styled.svg`
  filter: drop-shadow(0 0 4px ${props => props.markerColor});
  animation: 1s ease ${glowing} infinite;
`;

function Siren(props) {
    const { size, markerColor } = props;
  
    return <MarkerStyle markerColor={markerColor}
      height={size}
      viewBox="0 0 100 100"
      style={{
        transform: `translate(${-size / 2}px,${-size}px)`,
        fill: markerColor,
        stroke: 'none'
      }}
    >
   <path d="M79,75.9H21c-1.6,0-2.8,1.3-2.8,2.8v9.4c0,1.6,1.3,2.8,2.8,2.8H79c1.6,0,2.8-1.3,2.8-2.8v-9.4     C81.9,77.2,80.6,75.9,79,75.9z"></path><path d="M25.7,71.9h48.5V56.6c0-13.4-10.9-24.3-24.3-24.3l0,0c-13.4,0-24.3,10.9-24.3,24.3V71.9z"></path><path d="M50,25.5c2.2,0,4-1.8,4-4V13c0-2.2-1.8-4-4-4s-4,1.8-4,4v8.5C46,23.8,47.8,25.5,50,25.5z"></path><path d="M22.5,34.6c0.8,0.8,1.8,1.2,2.8,1.2s2-0.4,2.8-1.2c1.5-1.5,1.5-4.1,0-5.6l-6-6c-1.5-1.5-4.1-1.5-5.6,0     c-1.5,1.5-1.5,4.1,0,5.6L22.5,34.6z"></path><path d="M15,52.6H6.5c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4H15c2.2,0,4-1.8,4-4C19,54.4,17.2,52.6,15,52.6z"></path><path d="M93.5,52.6H85c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4h8.5c2.2,0,4-1.8,4-4C97.5,54.4,95.7,52.6,93.5,52.6z"></path><path d="M74.7,35.8c1,0,2-0.4,2.8-1.2l6-6c1.5-1.5,1.5-4.1,0-5.6c-1.5-1.5-4.1-1.5-5.6,0l-6,6c-1.5,1.5-1.5,4.1,0,5.6     C72.7,35.4,73.7,35.8,74.7,35.8z"></path>
    </MarkerStyle>
  }


  export default Siren;

