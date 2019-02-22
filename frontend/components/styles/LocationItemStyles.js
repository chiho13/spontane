import styled, {keyframes} from 'styled-components';
import { fadeInRight, fadeOutRight, fadeInUp, fadeOutDown} from 'react-animations';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeOutRightAnimation = keyframes`${fadeOutRight}`;
const fadeInUpAnimation = keyframes`${fadeInUp}`;
const fadeInDownAnimation = keyframes`${fadeOutDown}`;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  animation: 0.6s ${props => props.isOpened ? fadeInUpAnimation : fadeInDownAnimation};

  @media (min-width: 700px) {
    width: 50%;
    bottom: initial;
    top: 100px;
    left: initial;
    right: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    animation: 0.6s ${props => props.isOpened ? fadeInRightAnimation : fadeOutRightAnimation};
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
