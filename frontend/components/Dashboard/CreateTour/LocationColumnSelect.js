import styled from 'styled-components';
import LocationSelectItems from './LocationSelectItems';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div `
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        border-radius: 16px;
        background-color: #dedede;
`;

const Title = styled.div `
        padding: 1rem;
`;

const ListItems = styled.div `
        padding: 1rem;
`;

function LocationListSelectColumn(props) {
    const {listItems} = props;
    console.log("listItems: ", listItems);
    return (
        <Container>
            <Title>My Locations</Title>
            <Droppable droppableId={props.column.id}>
                {(provided) => (
                    <ListItems innerRef={provided.innerRef} {...provided.droppableProps}>
                        {listItems.map((location, index) => <LocationSelectItems key={location.id} location={location} city={location.city} index={index} />)}
                        {provided.placeholder}
                    </ListItems>
                )}
            </Droppable>
        </Container>
    )
}

export default LocationListSelectColumn;
