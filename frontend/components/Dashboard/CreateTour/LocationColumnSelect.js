import styled from 'styled-components';
import LocationSelectItems from './LocationSelectItems';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div `
        border-radius: 16px;
`;

const Title = styled.div `
       padding: 0;
`;

const ListItems = styled.div `
        padding: 0.5rem;
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        transition: background-color 0.2s ease;
        min-height: 200px;
        margin-top: 0.5rem;
        background-color: ${props => props.isDraggingOver ? '#cccccc' : '#dedede'}
`;

function LocationListSelectColumn(props) {
    const {listItems, copy} = props;
    return (
        <Container>
            <Title>{props.title}</Title>
            <Droppable droppableId={props.column.id} isDropDisabled={copy}>
                {(provided, snapshot) => (
                    <ListItems innerRef={provided.innerRef} 
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    >
                        { listItems.map((location, index) => <LocationSelectItems
                            key={location.dragId}
                            location={location}
                            city={location.city}
                            copy={copy}
                            index={index}/>)}
                        {provided.placeholder}
                    </ListItems>
                )}
            </Droppable>
        </Container>
    )
}

export default LocationListSelectColumn;

LocationListSelectColumn.defaultProps = {
    title: 'My Locations',
    copy: false
}
