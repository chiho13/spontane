import styled, {keyframes} from 'styled-components';
import { fadeInRight, fadeOutRight, fadeInUp, fadeOutDown} from 'react-animations';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeOutRightAnimation = keyframes`${fadeOutRight}`;
const fadeInUpAnimation = keyframes`${fadeInUp}`;
const fadeInDownAnimation = keyframes`${fadeOutDown}`;
const Item = styled.div`
  background: ${props => props.isExpanded ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${props => props.theme.lightgrey};
  box-shadow: ${props => props.theme.bs};
  position: fixed;
  bottom: 0;
  left: 0;
  display: block;
  z-index: 2;
  width: 100%;
  height: 160px;
  flex-direction: column;
  border-top-left-radius: ${props => props.isExpanded ? '0' : '10px'};
  border-top-right-radius: ${props => props.isExpanded ? '0' : '10px'};
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-bottom: none;
  overflow: hidden;
  transition: height ${props => props.isOpened ? '0.15s' : '0.5s'};
  animation: 0.6s ${props => props.isOpened ? fadeInUpAnimation : fadeInDownAnimation};

  .location_content {
    padding-top: 0;
    padding-left: 16px;
    padding-right: 64px;
    padding-bottom: 16px;
    overflow-y: scroll;
  }
  @media (min-width: 700px) {
    display: flex;
    width: 50%;
    bottom: initial;
    top: 100px;
    left: initial;
    right: 20px;
    max-height: 350px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: none;
    animation: 0.6s ${props => props.isOpened ? fadeInRightAnimation : fadeOutRightAnimation};
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  h3 {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    font-size: 16px;
    font-family: Helvetica
  }
  .buttonList {
    display: none;
    width: auto;
    span {
      margin-right: 8px;
    }

    @media (min-width: 700px) {
      display: flex;
      justify-content: flex-end;
    }
  }

  .dragNib {
    position: absolute;
    top: 8px;
    width: 24px;
    height: 4px;
    border-radius: 2px;
    background-color: #cfcfcf;
    left: 0;
    right: 0;
    margin: 0 auto;

    @media (min-width: 700px) {
      display: none
    }
  }

  .closeLocation_icon {
    cursor: pointer;
    position: sticky;
    top: 0;

    .cross_icon {
      position: absolute;
      top 8px;
      right: 8px;
      fill: #888;
      transition: fill 0.3s eases;
    }

    &:hover .cross_icon {
      fill: #444;
    }
  }
`;

export default Item;
