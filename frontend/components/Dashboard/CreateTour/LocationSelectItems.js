import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div `
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 1px solid lightgrey;
        border-radius: 8px;
        transition: background-color 0.3s ease;
        background-color: ${props => props.isDragging ? '#ACD4FF' : '#FFFFFF'}
`;

const Title = styled.h2 `
        font-size: 1.1rem;
        font-family: 'Roboto';
        padding: 0;
        margin: 0
`;

function LocationSelectItem(props) {
    const {city, index} = props;
    return (props.location.id && <Draggable draggableId={props.location.id} index={index}>
        {(provided, snapshot) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
                isDragging={snapshot.isDragging}
                >
                <Title>{city}</Title>
            </Container>
        )}
    </Draggable>)
}

export default LocationSelectItem;
