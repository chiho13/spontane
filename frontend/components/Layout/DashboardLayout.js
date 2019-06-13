import MainSideBar from '../Dashboard/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/NavProfilePill/NavProfilePill';
import styled from 'styled-components';
import React, {useEffect, useState, useRef} from 'react';
import useUser from '../hooks/useUser';
import Loading from '../LoadingSpinner';
import Login from '../Login';
import AuthLayout from './AuthLayout';

import BuyCredit from '../Dashboard/BuyCredits';

const MainContent = styled.div `
  display: flex;
  position: relative;
@media (min-width: 700px) {
  margin-left: 172px;
  height: 100vh;
  
}

@media (min-width: 900px) {
  margin-left: 200px;
}

.dashboard_content {
  width: 100%;
}
`;

const DashboardNav = styled.div `
    position: fixed;
    top: 16px;
    right: 16px;
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
        called
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
        called
    }}>
        <> <MainSideBar/>
        <MainContent>
            <DashboardNav>
                {/* <BuyCredit /> */}
                <ProfileNav/>
            </DashboardNav>

            {pageLoad
                ? <div className="dashboard_content">
                        {props.children}
                    </div>
                : <Loading/>}
        </MainContent>
    </>
</UserContext.Provider>
};

export default DashboardLayout;