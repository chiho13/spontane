import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import MaterialIcon from '@material/react-material-icon';

import {useContext} from 'react';
import {TourContext} from './CreateTour';

const Container = styled.div `
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 1px solid lightgrey;
        border-radius: 8px;
        transition: background-color 0.3s ease;
        background-color: ${props => props.isDragging ? '#ACD4FF' : '#FFFFFF'};

        .material-icons {
            display: flex;
            align-items: center;
            transition: color 0.3s ease;
            color: ${props => props.theme.grey};
            cursor: pointer;

            &:hover {
                color: ${props => props.theme.red};
            }
        }
`;


const Clone = styled(Container)`
    ~ div {
        transform: none !important;
    }
`; 

const Title = styled.h2 `
        font-size: 1.1rem;
        font-family: 'Roboto';
        padding: 0;
        margin: 0
`;

function LocationSelectItem(props) {
    const {city, index, copy, removable} = props;
    const removeItem = useContext(TourContext);
    return (props.location.id && <Draggable draggableId={props.location.dragId} index={index}>
        {(provided, snapshot) => (<>
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
                isDragging={snapshot.isDragging}
                >
                <Title>{city}</Title>
                {removable && <MaterialIcon icon="delete" tabIndex="-1" onClick={(e) => removeItem(e, props.location.dragId)}/>}
            </Container>
            {snapshot.isDragging && copy && <Clone><Title>{city}</Title></Clone>}
            </>
        
        )}
    </Draggable>)
}

export default LocationSelectItem;
