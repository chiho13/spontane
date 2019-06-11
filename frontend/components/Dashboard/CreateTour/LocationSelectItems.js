import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import MaterialIcon from '@material/react-material-icon';

const Container = styled.div `
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 1px solid lightgrey;
        border-radius: 8px;
        transition: background-color 0.3s ease;
        background-color: ${props => props.isDragging ? '#ACD4FF' : '#FFFFFF'}
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
    const {city, index, copy} = props;
    return (props.location.id && <Draggable draggableId={props.location.dragId} index={index}>
        {(provided, snapshot) => (<>
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
                isDragging={snapshot.isDragging}
                >
                <Title>{city}</Title>
            </Container>
            {snapshot.isDragging && copy && <Clone><Title>{city}</Title></Clone>}
            </>
        
        )}
    </Draggable>)
}

export default LocationSelectItem;
