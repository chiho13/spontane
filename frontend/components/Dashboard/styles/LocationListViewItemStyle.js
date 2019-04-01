import styled from 'styled-components';
import LocationItem from '../../UIKIT/ListItemPaper';

const LocationListViewItemStyle = styled(LocationItem)`
    && {
        display: flex;
        
        h3 {
            font-family: Helvetica;
        }
        
        .location_content {
            flex-grow: 1;
        }

        .buttonList {
            width: auto;
        }
    }
`;


export default LocationListViewItemStyle;