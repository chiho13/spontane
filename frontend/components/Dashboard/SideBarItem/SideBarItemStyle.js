import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';

const SideBarItemStyle = styled.li`

    list-style: none;
    white-space: nowrap;
    max-width: 100%;
    font-family: ${props => props.theme.fontFamily};

    && {
        padding: 0;
    }

    a {
        display: flex;
        padding: 16px 24px;
        width: 100%;
        will-change: background-color,box-shadow,color;
        transition: box-shadow .2s ease,color .2s ease,background-color .2s ease;
        height: 100%;

        @media (min-width: 1200px) {
            padding: 16px 32px;
        }
        .material-icons {
            display: flex;
            align-items: center;
            white-space: nowrap;
            word-wrap: normal;
            color: #bbc0d1;
            font-size: 20px;
            transition: color 0.2s ease;

            @media (min-width: 1200px) {
                margin-right: 8px;
            }
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
        box-shadow: inset  0 -3px 0 ${props => props.theme.brandColor};
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
        display: none;
    }

    @media (min-width: 1200px) {

        span {
            display: block;
        }
    }
`;

export default SideBarItemStyle;