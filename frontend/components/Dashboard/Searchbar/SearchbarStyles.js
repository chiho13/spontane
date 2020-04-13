import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
 position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  font-size: 14px;
  font-family: ${props => props.highlighted ? props.theme.boldFont   : props.theme.fontFamily};
  padding: 10px;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 16px;' : null)};
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    font-size: 16px;
    text-indent: 26px;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }

    font-family: ${props => props.theme.fontFamily};
  }

  .material-icons {
      position: absolute;
      padding: 8px;
      left: 0;
  }

  input:focus + .material-icons {
    color: ${props => props.theme.brandColor}
  }
`;

export { DropDown, DropDownItem, SearchStyles };
