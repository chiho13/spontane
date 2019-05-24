import styled from 'styled-components';
import LocationItem from '../../UIKIT/ListItemPaper';

const LocationListViewItemStyle = styled(LocationItem)`
    && {
        display: flex;
        position: relative;
        justify-content: space-between;
        background-color: ${props => props.theme.white};
        border: none;
        margin-top: 2px;
        box-shadow: none;
        border-radius: 0;

        &:first-child {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        h3 {
            font-family: Helvetica;
        }

        .location_content {
            width: 80%;

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .buttonList {
            display: flex;
            width: auto;
        }
    }
`;


export default LocationListViewItemStyle;