import {useContext} from 'react';


import PropTypes from 'prop-types';
import {ThemeProvider} from 'styled-components';
import MaterialIcon from '@material/react-material-icon';
import IconButtonStyle from './IconButtonStyle';
import gql from 'graphql-tag';

import { useRouter } from 'next/router';
import {UserContext} from '../Layout/DashboardLayout';
import {useMutation} from '../hooks/useMutation';

const theme = {
    iconColor: '#777777',
    iconColorHover: '#ff4c4c'
};

const DeleteButton = (props) => {
    const {deleteStuff} = props;
    
    return <ThemeProvider theme={theme}>
                <IconButtonStyle onClick={deleteStuff}>
                    <MaterialIcon icon="delete" className="materialIcon" /></IconButtonStyle>
            </ThemeProvider>
};


export default DeleteButton;