import MainSideBar from '../Dashboard/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/NavProfilePill/NavProfilePill';
import styled from 'styled-components';
import React, {useEffect, useState, useRef} from 'react';
import useUser from '../hooks/useUser';
import Loading from '../LoadingSpinner';
import Login from '../Login';
import AuthLayout from './AuthLayout';

import BuyCredit from '../Dashboard/BuyCredits';
import {ViewPortProvider } from '../providers/MapProvider';

const DashboardContainer = styled.div`
    display: flex;
`;

const MainContent = styled.div `
  display: flex;
  position: relative;
  flex-grow: 1;

.dashboard_content {
  width: 100%;
}

`;

const DashboardNav = styled.div `
    position: fixed;
    top: 16px;
    right: 32px;
    z-index: 1000;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1rem;
`;

export const UserContext = React.createContext();

const DashboardLayout = props => {
    const {
        data: {
            me: user
        },
        loading,
        called, refetch
    } = useUser();
    const [pageLoad,
        setPageLoad] = useState(false);
    const [auth,
        setAuth] = useState(false);

    const [projectId, setProjectId] = useState(null);
    
    function setProjectID(id) {
        setProjectId(id);
    }

    // useEffect(() => {
    //     const isAuth = function (hasUser) {
    //         if (hasUser) {
    //             setAuth(true)
    //         } else {
    //             setAuth(false);
    //         }
    //         return true
    //     }

    //     if (isAuth && !loading) {
    //         isAuth(user)
    //     }
    // }, [loading, user]);

    useEffect(() => {
        setPageLoad(true);
    }, []);

    if(loading && !user) {
        return <Loading/>
    }

    if (!user) {
        return <AuthLayout>
            <Login title="Please log in to continue" continue={false}/>
        </AuthLayout>
    }

    return <UserContext.Provider
        value={{
        user,
        loading,
        called, refetch, projectId, setProjectID
    }}>
        <ViewPortProvider id={props.id} user={user}>
        
        <DashboardContainer>

        <MainSideBar/>
        <MainContent>
            <DashboardNav>
                {/* <BuyCredit /> */}
                <ProfileNav user={user} />
            </DashboardNav>

             <div className="dashboard_content">
                        {props.children}
                    </div>
        </MainContent>
        </DashboardContainer>
    </ViewPortProvider>
</UserContext.Provider>
};

export default DashboardLayout;