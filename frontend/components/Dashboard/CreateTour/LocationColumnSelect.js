import styled from 'styled-components';
import LocationSelectItems from './LocationSelectItems';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div `
        border-radius: 16px;
`;

const Title = styled.div `
        padding-top: 1rem;
        padding-bottom: 1rem;
`;

const ListItems = styled.div `
        padding: 0.5rem;
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        transition: background-color 0.2s ease;
        min-height: 200px;
        background-color: ${props => props.isDraggingOver ? '#cccccc' : '#dedede'}
`;

function LocationListSelectColumn(props) {
    const {listItems} = props;
    return (
        <Container>
            <Title>My Locations</Title>
            <Droppable droppableId={props.column.id}>
                {(provided, snapshot) => (
                    <ListItems innerRef={provided.innerRef} 
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    >
                        {listItems.map((location, index) => <LocationSelectItems
                            key={location.id}
                            location={location}
                            city={location.city}
                            index={index}/>)}
                        {provided.placeholder}
                    </ListItems>
                )}
            </Droppable>
        </Container>
    )
}

export default LocationListSelectColumn;
