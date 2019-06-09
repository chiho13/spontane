import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import LocationColumnSelect from './LocationColumnSelect';
import CreateTourForm from './CreateTourForm';
import {UserContext} from '../../Layout/DashboardLayout';
import {DragDropContext} from 'react-beautiful-dnd';


const CreateTourStyle = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    top: 100px;
    margin-left: 2rem;
    margin-right: 2rem;
    grid-gap: 2rem;
`;


function CreateTour() {
    const {user: data, loading} = useContext(UserContext);

    
    const [initialData, setReorderState] = useState({
        locations: {
            'location-0' : {id: 'location-0', city: 'Loading...'},
            'location-1' : {id: 'location-1', city: 'Loading1...'}
        },
        columns: {
            'column-1': {   
                id: 'column-1',
                locationIds: ['location-0', 'location-1']
            }
        }
    });
    
    useEffect(() => {
        const onCompleted = DATA => {
            const locationData = DATA.locations.reduce((acc, cur, i) => {
                acc[cur.id] = cur;
                return acc
            }, {});
            setReorderState({
                locations: locationData,
                columns: {
                    'column-1': {
                        id: 'column-1',
                        locationIds: Object.keys(locationData)
                    }
                }
            });
          }

          if (onCompleted) {
            if (onCompleted && !loading) {
              onCompleted(data)
            } 
          }
          
    }, [loading]);


    function onDragEnd(result) {
        const {destination, source, draggableId} = result;

        if(!destination) {
            return
        }

        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }


        const column = initialData.columns[source.droppableId];
        const newLocationIds = Array.from(column.locationIds);
        
        console.log(newLocationIds);
        newLocationIds.splice(source.index, 1);
        console.log(newLocationIds);
        newLocationIds.splice(destination.index, 0, draggableId);
        console.log(newLocationIds);

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
    console.log(Object.keys(initialData.columns));
    return <CreateTourStyle>
        <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(initialData.columns).map(columnId => {
        const column = initialData.columns[columnId];
        const locations = column.locationIds.map(locationId => initialData.locations[locationId]);
        return <LocationColumnSelect key={column.id} listItems={locations} column={column}/> })}

            <CreateTourForm/>
        </DragDropContext>  
    </CreateTourStyle>
}

export default CreateTour;