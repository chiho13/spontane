import styled from 'styled-components';

const TabsStyle = styled.div`
.tab-list {
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(100px, 1fr) );
    padding-left: 32px;
    margin: 0;
    padding: 0;
    border-top: 1px solid ${props => props.theme.grey};
}
.tab-list-item {
    display: flex;
    align-items: center;
    list-style: none;
    margin-bottom: -1px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    font-family: ${props => props.theme.fontFamily};
    font-weight: bold;
    text-transform: capitalize;
    background-color: white;
    border: 0;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;

    &:first-child:not(.tab-list-active) {
        border-right: 1px solid #f1f1f1;
    }

    &:last-child:not(.tab-list-active) {
        border-left: 1px solid #f1f1f1;
    }
    i {
        color: #555555;
        margin-right: 8px;
    }

    &:focus {
        outline: 0;
    }

    &:hover {
        background-color: #f9f9f9;
    }
  }

  .tab-list-active {
    color: ${props => props.theme.brandColor};
    background-color: #f1f1f1;
    box-shadow: none;
   
    border-top: 3px solid ${props => props.theme.brandColor};
   
    i {
        color: ${props => props.theme.brandColor};
    }

    &:hover {
        background-color: inherit;
    }
  }

  .tab-content {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    height: calc(100vh - 120px);
    overflow: auto;
    
  }
  
  .tab-content .map-container {
      position: relative;
      width: 100%;
      height: calc(100vh - 140px);
  }
`;

export default TabsStyle;