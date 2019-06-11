import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import LocationColumnSelect from './LocationColumnSelect';
import CreateTourForm from './CreateTourForm';
import {UserContext} from '../../Layout/DashboardLayout';
import {DragDropContext} from 'react-beautiful-dnd';
import uuid from 'uuid/v4'

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
                city: 'Loading...',
                dragId: uuid()
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
                    cur["dragId"] = uuid();
                    acc[cur.dragId] = cur;
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

        const start = initialData.columns[source.droppableId];
        const finish = initialData.columns[destination.droppableId];

        const firstLocations = start
        .locationIds
        .map(locationId => initialData.locations[locationId]);

        const formDroppedLocations = finish
        .locationIds
        .map(locationId => initialData.locations[locationId]);

        if(start === finish) {
            const newLocationIds = Array.from(start.locationIds);
            newLocationIds.splice(source.index, 1);
    
            newLocationIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
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
            return
        }

        const startLocationIds = Array.from(start.locationIds);
        startLocationIds.splice(source.index, 1);
        const sourceClone = Array.from(firstLocations);
    // const destClone = Array.from(destination);
    const item = sourceClone[source.index];
     const destClone = Array.from(destination);

    // console.log(item);

        const newStart = {
            ...start,
            locationIds: startLocationIds
        }

        console.log(startLocationIds)

        const finishLocationIds = Array.from(finish.locationIds);
        destClone.splice(destination.index, 0, {...item, dragId: uuid()});

        const dragIdFinish = destClone[0]['dragId'];

        finishLocationIds.splice(destination.index, 0, dragIdFinish);
        
        console.log(...destClone)
        // console.log(finishLocationIds);

        const finished = {
            [dragIdFinish]: destClone[0]
        }
       
        console.log(finished);
        console.log(destination)
        const newFinish = {
                id: destination.droppableId,
                locationIds: finishLocationIds
        }

        const newState = {
            ...initialData,
            columns: {
                ...initialData.columns,
                [newFinish.id] : newFinish
            },
            locations: {
                ...initialData.locations,
                ...finished
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
                    column={firstColumn}
                    copy={true}
                    />
                <CreateTourForm listItems={formDroppedLocations}
                column={formFieldColumn}
                />
            </DragDropContext>
        </Container>
    </div>
}

export default CreateTour;