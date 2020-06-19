import styled from 'styled-components';

const IconButtonStyle = styled.div`
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
border: 1px solid #ddd;
border-radius: 6px;
color: ${props => props.theme.iconColor};
transition: all 0.3s ease;
cursor: pointer;
box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

&:hover {
  border-color: ${props => props.theme.iconColorHover};
  color: ${props => props.theme.iconColorHover};
}

.materialIcon {
    font-size: 18px;
    color: #777777;
}

&:hover .materialIcon {
  color: ${props => props.theme.iconColorHover};
}

a {
  display flex;
  align-items: center;
}
`;

export default IconButtonStyle;