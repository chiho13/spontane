import React, {useState, useEffect, useContext} from 'react';

import styled from 'styled-components';
import useForm from '../../hooks/useForm';
import gql from 'graphql-tag';

import {useRouter} from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

import MapSetBounds from '../MapSetBounds';
import SetMapStyle from '../MapStyles/selectStyles';

import {SelectBaseMapStyle} from '../MapStyles';

import {ViewPortContext} from '../../providers/MapProvider';
import { UserContext } from '../../Layout/DashboardLayout';
import MaterialIcon from '@material/react-material-icon';
import {useMutation} from '../../hooks/useMutation';

import Button from '../../UIKIT/iButton';
import { ThemeProvider } from 'styled-components';

toast.configure();

const UPDATE_PROJECT_MUTATION = gql`
    mutation UPDATE_PROJECT_MUTATION(
        $id: ID!
        $title: String!
        $mapBounds: String
        $mapStyle: String
        $markerColor: String
    ) {
        updateProject(
            id: $id
            title: $title
            mapBounds: $mapBounds
            mapStyle: $mapStyle
            markerColor: $markerColor
        ) {
            id
        }
    }
`;


const MapSettingsStyle = styled.div`
    padding: 8px;
    margin-left: 8px;
    margin-right: 8px;
    height: calc(100vh - 100px);

    h3 {
        font-size: 18px;
        padding-left: 0;
    }

    .mapSettings_save {
        width: auto;
        position: absolute;
        bottom: 16px;
    }

    .form-input {
        font-family: ${props => props.theme.fontFamily};
        width: 80%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #999;
        border-radius: 8px;
        transition: all 0.3s ease;
        margin-top: 16px;
        margin-bottom: 16px;
        &:focus {
          outline: 0;
          border-width: 2px;
          border-color: ${props => props.theme.brandColor};
        }
    
        @media (min-width: 700px) {
          font-size: 14px;
        }
    }
`;


const SetMapStyleOveride = styled(SelectBaseMapStyle)`
    grid-auto-flow: column; 
    grid-template-columns: auto; 
    padding-bottom: 16px;
    padding-top: 8px;
    overflow-x: auto;

    .baseMap_wrapper {
        width: 220px;
    }
`;

const invertBrand = ({ white, brandColor }) => ({ black: white, white: brandColor, hoverColor: '#1a88ff' });


function MapSettings(props) {
    const [form,
        setForm,
        handleChange] = useForm({
            title: ''
        });
    
    const router = useRouter();
    const worldBoundary = '{"type":"Feature","properties":{"shape":"Rectangle"},"geometry":{"type":"Polygon","coordinates":[[[-184,84],[184,84],[184,-84],[-184,-84],[-184,84]]]}}'
    
    const {mapConfig} = useContext(ViewPortContext);
    const {refetch} = useContext(UserContext);

    const [updateProject, {loading, error, data}] = useMutation(UPDATE_PROJECT_MUTATION, {
        variables: {
            id: router.query.id,
            ...form
        }
    });

    useEffect(() => {
        setForm({title: mapConfig.title, mapStyle: mapConfig.mapStyle, markerColor: mapConfig.markerColor});
    }, [mapConfig]);

    const notify = () => toast.success("Map Settings updated!", {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        className: css({ fontFamily: "nunito, sans-serif" })
    });

    const saveSettings = async () => {
       const res =  await updateProject();

       if(res) {
            notify();
            refetch();
       }
    }

    return <MapSettingsStyle>

        <div className="wrapper">
            <label htmlFor="title">
                <h3>Title</h3>
            </label>
            <input
                 className="form-input"
                type="text"
                id="title"
                name="title"
                placeholder=""
                required
                value={form.title}
                onChange={handleChange} 
                />
        </div>

            <h3>Map Style</h3>
            <SetMapStyleOveride>
                
                <SetMapStyle mapStyle={mapConfig.mapStyle}/>
            </SetMapStyleOveride>

            <ThemeProvider theme={invertBrand}>
                <Button type="button" className="mapSettings_save" onClick={saveSettings}>Apply</Button>
            </ThemeProvider>
    </MapSettingsStyle>
}


// const NewProject = () => {
//     return  <MapSetBounds />
// }

export default MapSettings;