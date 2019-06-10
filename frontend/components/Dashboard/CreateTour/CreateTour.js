import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import LocationColumnSelect from './LocationColumnSelect';
import CreateTourForm from './CreateTourForm';
import {UserContext} from '../../Layout/DashboardLayout';
import {DragDropContext} from 'react-beautiful-dnd';

const Container = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    top: 60px;
    margin-left: 2rem;
    margin-right: 2rem;
    grid-gap: 2rem;
`;

function CreateTour() {
    const {user: data, loading} = useContext(UserContext);

    const [initialData,
        setReorderState] = useState({
        locations: {
            'location-0': {
                id: 'location-0',
                city: 'Loading...'
            }
        },
        columns: {
            'column-1': {
                id: 'column-1',
                locationIds: ['location-0']
            },
            'column-2': {
                id: 'column-2',
                locationIds: []
            }
        }
    });

    useEffect(() => {
        const onCompleted = DATA => {
            const locationData = DATA
                .locations
                .reduce((acc, cur, i) => {
                    acc[cur.id] = cur;
                    return acc
                }, {});
            setReorderState({
                locations: locationData,
                columns: {
                    'column-1': {
                        id: 'column-1',
                        locationIds: Object.keys(locationData)
                    },
                    'column-2': {
                        id: 'column-2',
                        locationIds: []
                    }
                }
            });
        }

        if (onCompleted) {
            if (onCompleted && !loading && data) {
                onCompleted(data)
            }
        }

    }, [loading]);

    function onDragEnd(result) {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const column = initialData.columns[source.droppableId];
        const newLocationIds = Array.from(column.locationIds);

        newLocationIds.splice(source.index, 1);

        newLocationIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            locationIds: newLocationIds
        }

        const newState = {
            ...initialData,
            columns: {
                ...initialData.columns,
                [newColumn.id]: newColumn
            }
        }

        setReorderState(newState)
    }

    const firstColumn = initialData.columns['column-1'];
    const firstLocations = firstColumn
        .locationIds
        .map(locationId => initialData.locations[locationId]);

    const formFieldColumn = initialData.columns['column-2'];
    const formDroppedLocations = formFieldColumn
        .locationIds
        .map(locationId => initialData.locations[locationId]);

    return <div>
        <h2>Create a Tour</h2>
        <Container>
            <DragDropContext onDragEnd={onDragEnd}>
                <LocationColumnSelect
                    key={firstColumn.id}
                    listItems={firstLocations}
                    column={firstColumn}/>
                <CreateTourForm listItems={formDroppedLocations}
                column={formFieldColumn}
                />
            </DragDropContext>
        </Container>
    </div>
}

export default CreateTour;