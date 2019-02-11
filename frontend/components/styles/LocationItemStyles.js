import styled, {keyframes} from 'styled-components';
import { fadeInRight, fadeInUp} from 'react-animations';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeInUpAnimation = keyframes`${fadeInUp}`;
const Item = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid ${props => props.theme.lightgrey};
  box-shadow: ${props => props.theme.bs};
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 2;
  width: 100%;
  flex-direction: column;
  animation: 0.6s ${fadeInUpAnimation};

  @media (min-width: 700px) {
    width: 50%;
    bottom: initial;
    top: 100px;
    left: initial;
    right: 20px;
    animation: 0.6s ${fadeInRightAnimation};
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  h3 {
    padding: 0 3rem;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 16px;
    font-family: Helvetica
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }

  .closeLocation_icon {
    cursor: pointer;

    .cross_icon {
      position: absolute;
      top 5px;
      right: 5px;
      fill: #555;
      transition: fill 0.3s eases;
    }

    &:hover .cross_icon {
      fill: #777;
    }
  }

 
`;

export default Item;
