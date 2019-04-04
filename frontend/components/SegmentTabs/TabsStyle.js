import styled from 'styled-components';

const TabsStyle = styled.div`
.tab-list {
    display: grid;
    grid-template-columns: 100px 100px;
    grid-gap: 16px;
    padding-left: 32px;
    margin: 16px 0;
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
    font-family: 'Roboto';
    font-weight: bold;
    box-shadow: 0 3px 5px 2px rgba(100, 105, 135, .3);

    i {
        margin-right: 8px;
    }
  }
  
  .tab-list-active {
    background-color: white;
    color: ${props => props.theme.brandColor};
  }

  .tab-content > div {
      width: 100%;
      height: calc(100vh - 150px)
  }
`;

export default TabsStyle;