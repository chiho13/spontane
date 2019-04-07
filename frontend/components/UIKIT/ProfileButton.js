import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const iButton = styled(Button)`
  && { 
  display: block;
  background: #fff;
  border-radius: 8px;
  border: 0;
  color: ${props => props.theme.black};
  height: 48px;
  padding: 12px 24px;
  font-size: 14px;
  text-transform: none;
  width: 150px;
  justify-content: center;
  font-family: 'Roboto';
  line-height: 1.5;
  box-shadow: 0 1px 5px 1px rgba(100, 105, 135, .3);

  &:hover {
    background-color: #f1f1f1;
  }
  
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  }
`;

export default iButton;
