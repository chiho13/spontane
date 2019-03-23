import styled from 'styled-components';

const SideBarItemStyle = styled.li`
    list-style: none;
    white-space: nowrap;
    min-width: 100%;
    max-width: 100%;
    will-change: background-color,box-shadow,color;
    transition: box-shadow .2s ease,color .2s ease,background-color .2s ease;
    a {
        display: flex;
        padding: 16px 24px;
    }

    span {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .materials-icons {
        display: flex;
        align-items: center;
        white-space: nowrap;
        word-wrap: normal;
        margin-right: 8px;
        width: 20px;
        -webkit-font-smoothing: antialiased;
    }

    svg {
        will-change: fill;
        font-size: 20px;
    }
`;

export default SideBarItemStyle;