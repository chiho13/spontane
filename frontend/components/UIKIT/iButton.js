import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/Button';

const iButton = styled(Button)`

  && { 
  display: block;
  background: ${props => props.theme.white};
  border-radius: 8px;
  border: 0;
  color: ${props => props.theme.black};
  height: 48px;
  padding: 12px 24px;
  font-size: 16px;
  text-transform: none;
  width: ${props => props.width || '100%'};
  justify-content: center;
  font-family: ${props => props.theme.fontFamily};
  line-height: 1.5;
  box-shadow: 0 1px 5px 1px rgba(100, 105, 135, .3);
  transition: all 0.4s ease;

  &:hover {
    background: ${props => props.theme.hoverColor};
    color: ${props => props.theme.black};
  }

  &[disabled] {
    opacity: 0.6;
    color: #eee;
  }
  
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: ${props => props.theme.boldFont};
  }
  }
`;

export default iButton;
