import styled from 'styled-components';

const IconButtonStyle = styled.a`
font-size: 14px;
font-family: 'Roboto';
margin: 8px;
padding: 8px;
display: flex;
justify-content: center;
align-items: center;
width: 32px;
height: 32px;
background: #fff;
border: 1px solid #ccc;
border-radius: 6px;
color: ${props => props.theme.iconColor};
transition: all 0.3s ease;
cursor: pointer;

&:hover {
  border-color: ${props => props.theme.iconColorHover};
  color: ${props => props.theme.iconColorHover};
}

.materialIcon {
    font-size: 18px;
}
`;

export default IconButtonStyle;