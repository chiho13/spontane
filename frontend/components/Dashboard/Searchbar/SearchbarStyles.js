import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
 position: absolute;
  width: 100%;
  z-index: 2;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.lightgrey};
  max-height: 300px;
  overflow: auto;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid #eee;
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
  flex-grow: 1;
  input {
    width: 100%;
    padding: 12px;
    border: 0;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    text-indent: 32px;
    border-radius:8px;
    box-sizing: border-bbox;
    border: 2px solid white;
    transition: all 0.3s ease;
    will-change: border-color;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }

    font-family: ${props => props.theme.fontFamily};
  }

  .material-icons {
      position: absolute;
      padding: 12px;
      left: 0;
  }

  input:focus {
    outline: 0;
    border-color: ${props => props.theme.brandColor};
  }

  input:focus + .material-icons {
    color: ${props => props.theme.brandColor}
  }
`;

export { DropDown, DropDownItem, SearchStyles };
