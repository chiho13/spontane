import MainSideBar from '../Dashboard/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/NavProfilePill/NavProfilePill';
import styled from 'styled-components';
import React, {useEffect, useState, useRef} from 'react';
import useUser from '../hooks/useUser';
import Loading from '../LoadingSpinner';
import Login from '../Login';
import AuthLayout from './AuthLayout';

import Logo from '../../components/Dashboard/SideBarLogo/SideBarLogo';

import BuyCredit from '../Dashboard/BuyCredits';
import {ViewPortProvider } from '../providers/MapProvider';


const MainContent = styled.div `
  display: flex;
  position: relative;

@media (min-width: 700px) {
  height: 100vh; 
}

.navbar-brand {
    margin-left: 64px;
    margin-right: 32px;
    margin-top: 16px;
}

.dashboard_content {
  width: 100%;
}
`;

const DashboardNav = styled.div `
    position: fixed;
    top: 28px;
    right: 32px;
    z-index: 1000;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1rem;
`;

export const UserContext = React.createContext();

const ProjectLayout = props => {
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
        setAuth] = useState(true);

    useEffect(() => {
        const isAuth = function (hasUser) {
            if (hasUser) {
                setAuth(true)
            } else {
                setAuth(false);
            }
            return true
        }

        if (isAuth && !loading) {
            isAuth(user)
        }
    }, [loading, user]);

    useEffect(() => {
        setPageLoad(true);
    }, []);

    if (!auth) {
        return <AuthLayout>
            <Login title="Please log in to continue" continue={false}/>
        </AuthLayout>
    }

    return <UserContext.Provider
        value={{
        user,
        loading,
        called, refetch
    }}>
        <ViewPortProvider id={props.id}>
        <>
        <MainContent>
            <Logo />
            <DashboardNav>
                <ProfileNav />
            </DashboardNav>

            {pageLoad
                ? <div className="dashboard_content">
                        {props.children}
                    </div>
                : <Loading/>}
        </MainContent>
    </>
    </ViewPortProvider>
</UserContext.Provider>
};

export default ProjectLayout;