import styled from 'styled-components';

const TabsStyle = styled.div`
.tab-list {
    display: grid;
    grid-template-columns: 100px 100px;
    grid-gap: 16px;
    padding-left: 32px;
    margin: 16px 0;


    a.active {
        color: ${props => props.theme.brandColor};
        border-color: ${props => props.theme.brandColor};
    
        i {
            color: ${props => props.theme.brandColor};
        }
    
        &:hover {
            background-color: inherit;
            border-color: inherit;
        }    color: ${props => props.theme.brandColor};
    border-color: ${props => props.theme.brandColor};

    i {
        color: ${props => props.theme.brandColor};
    }

    &:hover {
        background-color: inherit;
        border-color: inherit;
    }

    .tab-list-item {
        border: 2px solid ${props => props.theme.brandColor};
    }
    }
}
.tab-list-item {
    display: flex;
    align-items: center;
    list-style: none;
    margin-bottom: -1px;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 8px;
    font-size: 14px;
    font-family: ${props => props.theme.fontFamily};
    font-weight: bold;
    text-transform: capitalize;
    background-color: white;
    border: 2px solid rgba(100, 105, 135, .3);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 5px 1px rgba(100,105,135,.3);
    i {
        color: #555555;
        margin-right: 8px;
    }

    &:hover {
        background-color: #f9f9f9;
        border-color: rgba(100, 105, 135, .7);
    }

  }
  
  .tab-content .map-container {
      position: relative;
      width: 100%;
      height: calc(100vh - 140px)
  }
`;

export default TabsStyle;