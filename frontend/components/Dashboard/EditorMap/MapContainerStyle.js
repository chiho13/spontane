import styled from 'styled-components';

const CreateLocationMapStyle = styled.div `
    position: relative;
    display: flex;
    width: 100%;
    overflow: hidden;
    
      .map_container {
        position: relative;
        flex-grow: 1;
        height: calc(100vh - 60px);
      }

      [data-type="fill"] {
        cursor: move;
      }
`;

export default CreateLocationMapStyle;