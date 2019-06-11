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
        min-height: 200px;
        max-height: 370px;
        transition: background-color 0.2s ease;
        height: ${props => props.isDropDisabled ? '370px' : 'auto'};
        margin-top: 0.5rem;
        overflow: scroll;
        background-color: ${props => props.isDraggingOver ? '#C8F7C5' : '#DEDEDE'}
`;

function LocationListSelectColumn(props) {
    const {listItems, copy, removable} = props;
    return (
        <Container>
            <Title>{props.title}</Title>
            <Droppable droppableId={props.column.id} isDropDisabled={copy}>
                {(provided, snapshot) => (
                    <ListItems innerRef={provided.innerRef} 
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    isDropDisabled={copy}
                    >
                        { listItems.map((location, index) => <LocationSelectItems
                            key={location.dragId}
                            location={location}
                            city={location.city}
                            copy={copy}
                            removable={removable}
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
    copy: false,
    removable: false
}
