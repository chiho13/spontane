import styled from 'styled-components';
import LocationItem from '../../UIKIT/ListItemPaper';

const LocationListViewItemStyle = styled(LocationItem)`
    && {
        display: flex;
        position: relative;
        justify-content: space-between;
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