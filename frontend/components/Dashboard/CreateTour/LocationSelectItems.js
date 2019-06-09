import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div `
        margin-top: 1rem;
        padding: 0.5rem;
        border: 1px solid lightgrey;
        border-radius: 8px;
        background-color: #ffffff;
`;

const Title = styled.h2 `
        font-size: 1.1rem;
        font-family: 'Roboto';
        padding: 0;
        margin: 0
`;

function LocationSelectItem(props) {
    const {city, index} = props;
    return (
        props.location.id && <Draggable draggableId={props.location.id} index={index}>
            {(provided) => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>
                    <Title>{city}</Title>
                </Container>
            )}
        </Draggable>
    )
}

export default LocationSelectItem;
