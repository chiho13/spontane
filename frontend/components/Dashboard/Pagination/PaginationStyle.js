import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 24px 0;
  margin-left: -10px;
  font-family: ${props => props.theme.boldFont}; 

  .prev, .next {
    margin-left: 16px;
    margin-right: 16px;
    border: 2px solid ${props => props.theme.brandColor};
    transition: background 0.3s ease;
    border-radius: 6px;
    padding: 0;

    i {
      color: ${props => props.theme.brandColor};
    }

    &:hover {
      color: #fff;
      background-color: ${props => props.theme.brandColor};

      i {
        color: #fff;
      }
    }
  }

  button[aria-disabled='true'] {
    border-color: #eee;
    color: grey;
    pointer-events: none;

    i {
      color: grey;
    }
  }

  .totalLocations {
    margin-right: 10px; 
  }

  button {
    display: flex;
    align-items: center;

    i {
      font-size: 30px;
    }
  }
`;

export default PaginationStyles;
