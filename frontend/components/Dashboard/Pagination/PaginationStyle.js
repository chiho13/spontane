import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  align-content: center;
  margin: 30px 0;
  margin-left: -10px;

  .prev, .next {
    margin-left: 10px;
    margin-right: 10px;
    border: 2px solid ${props => props.theme.grey};
    transition: background 0.3s ease;

    i {
      color: ${props => props.theme.grey};
    }

    &:hover {
      color: #fff;
      background-color: ${props => props.theme.grey};

      i {
        color: #fff;
      }
    }
  }

  a[aria-disabled='true'] {
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

  a {
    display: flex;
    align-items: center;

    i {
      font-size: 30px;
    }
  }
`;

export default PaginationStyles;
