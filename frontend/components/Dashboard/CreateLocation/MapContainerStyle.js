import styled from 'styled-components';

const CreateLocationMapStyle = styled.div `
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh;
      
      h3 {
        display: block;
        position: absolute;
        top: 30px;
        right: 30px;
        font-family: ${props => props.theme.boldFont};
        font-size: 24px;
        color: ${props => props.theme.brandColor};
      }

      .map_container {
        position: relative;
        flex-grow: 1;
        height: 100vh;
      }
`;

export default CreateLocationMapStyle;