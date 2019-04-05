import styled from 'styled-components';
import LocationItem from '../../UIKIT/ListItemPaper';

const LocationListViewItemStyle = styled(LocationItem)`
    && {
        display: flex;
        position: relative;
        
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
            width: auto;
            position: absolute;
            right: 0;
        }
    }
`;


export default LocationListViewItemStyle;