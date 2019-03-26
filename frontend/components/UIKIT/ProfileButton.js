import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const iButton = styled(Button)`
  && { 
  display: flex;  
  background: #fff;
  border-radius: 8px;
  border: 0;
  color: ${props => props.theme.black};
  height: 48px;
  padding: 12px 24px;
  font-size: 14px;
  text-transform: none;
  min-width: 140px;
  text-align:center;
  font-family: 'Roboto';
  box-shadow: 0 3px 5px 2px rgba(100, 105, 135, .3);

  &::after {
    margin-left: 8px;
    content: "";
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-bottom: 0;
    border-left: 4px solid transparent;
  }
  }
`;

export default iButton;
