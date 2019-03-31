import styled from 'styled-components';

const TabsStyle = styled.div`
border-bottom: 1px solid #ccc;
.tab-list {
    display: flex;
}
.tab-list-item {
    display: flex;
    align-items: center;
    list-style: none;
    margin-bottom: -1px;
    padding: 8px 12px;
    cursor: pointer;

    i {
        margin-right: 8px;
    }
  }
  
  .tab-list-active {
    background-color: white;
    border: solid #ccc;
    border-width: 1px 1px 0 1px;
  }
`;

export default TabsStyle;