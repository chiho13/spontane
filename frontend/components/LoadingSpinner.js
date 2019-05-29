import styled, {keyframes} from 'styled-components';

const svgAnimation = keyframes`
    0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
`;

const circleAnimation = keyframes`
0%,
25% {
  stroke-dashoffset: 280;
  transform: rotate(0);
}

50%,
75% {
  stroke-dashoffset: 75;
  transform: rotate(45deg);
}

100% {
  stroke-dashoffset: 280;
  transform: rotate(360deg);
}
`;

const LoadingSpinnerSVG = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
svg {
    width: 100px;
    height: 100px;
    animation: 1s linear infinite ${svgAnimation};
    max-width: 100px;
}
circle {
    animation: 0.6s ease-in-out infinite both ${circleAnimation};
    display: block;
    fill: transparent;
    stroke: ${props => props.theme.brandColor};
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 280;
    stroke-width: 10px;
    transform-origin: 50% 50%;
}
`;


const LoadingSpinner = () => (
    <LoadingSpinnerSVG>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45"/>
        </svg>
    </LoadingSpinnerSVG>
);

export default LoadingSpinner