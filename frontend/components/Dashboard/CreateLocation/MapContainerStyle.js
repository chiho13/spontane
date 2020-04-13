import styled from 'styled-components';

const CreateLocationMapStyle = styled.div `
    position: relative;
      width: 100%;
      height: 100vh;

      h3 {
        display: block;
        position: absolute;
        top: 30px;
        left: 30px;
        font-family: ${props => props.theme.boldFont};
        font-size: 24px;
        color: ${props => props.theme.brandColor};
      }
`;

export default CreateLocationMapStyle;