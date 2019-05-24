import React from 'react';
import { Mutation } from 'react-apollo';
import {CURRENT_USER_QUERY} from '../../hooks/useUser';
import gql from 'graphql-tag';
import MaterialIcon from '@material/react-material-icon';
import Router from 'next/router';
import MenuItem from '../../UIKIT/MenuItem';

const LOG_OUT_MUTATION = gql`
    mutation LOG_OUT_MUTATION {
        logout {
            message
        }
    }
`;


const Logout = (props) => {

    function signout(event, logout) {
        logout()
        props.handleClose(event);
    }

    return <Mutation mutation={LOG_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY}]}>
        {logout => <MenuItem onClick={(event) => signout(event, logout)}><MaterialIcon icon="exit_to_app" />Logout</MenuItem>}
    </Mutation>
}

export default Logout