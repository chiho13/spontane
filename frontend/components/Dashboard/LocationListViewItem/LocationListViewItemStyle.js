import styled from 'styled-components';
import LocationItem from '../../UIKIT/ListItemPaper';

const LocationListViewItemStyle = styled(LocationItem)`
    && {
        display: flex;
        position: relative;
        justify-content: space-between;
        background-color: #f1f1f1;
        border: none;
        margin-top: 4px;
        box-shadow: none;
        border-radius: 0;
        align-items: center;

        h3 {
            font-family: ${props => props.theme.boldFont};
        }

        .location_content {
            width: 80%;

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-family: ${props => props.theme.fontFamily};
            }
        }

        .buttonList {
            display: flex;
            width: auto;
        }
    }
`;


export default LocationListViewItemStyle;