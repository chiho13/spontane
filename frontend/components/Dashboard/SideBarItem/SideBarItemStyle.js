import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';

const SideBarItemStyle = styled(ListItem)`

    list-style: none;
    white-space: nowrap;
    min-width: 100%;
    max-width: 100%;
    font-family: ${props => props.theme.fontFamily};

    && {
        padding: 0;
    }

    a {
        display: flex;
        padding: 16px 32px;
        width: 100%;
        will-change: background-color,box-shadow,color;
        transition: box-shadow .2s ease,color .2s ease,background-color .2s ease;

        .material-icons {
            display: flex;
            align-items: center;
            white-space: nowrap;
            word-wrap: normal;
            margin-right: 8px;
            color: #bbc0d1;
            font-size: 20px;
            transition: color 0.2s ease;
        }

        &:hover {
            background-color: #f5f5f5;
            color: ${props => props.theme.black};
        }

        &:hover i {
            color: ${props => props.theme.black};
        }
    }

    a.active {
        box-shadow: inset 3px 0 0 ${props => props.theme.brandColor};
        background-color: #f5f5f5;
        color: ${props => props.theme.brandColor};

        i {
            color: ${props => props.theme.brandColor};
        }
    }


    span {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
    }
`;

export default SideBarItemStyle;