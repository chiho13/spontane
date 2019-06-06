import MainSideBar from '../Dashboard/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/NavProfilePill/NavProfilePill';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import useUser from '../hooks/useUser';
import Router from 'next/router';
import Loading from '../LoadingSpinner';
import Login from '../Login';
import AuthLayout from './AuthLayout';

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

export const UserContext = React.createContext();

const DashboardLayout = props => {
    const {data: {
            me
        }, loading, called} = useUser();
    const [pageLoad,
        setPageLoad] = useState(false);
    const [auth,
        setAuth] = useState(true);

    const [user, setUser] = useState('');

    useEffect(() => {
        if (loading && called) {
            return
        }
        const timeout = setTimeout(() => {
            if (me) {
                setAuth(true)
                setUser({
                  id: me.id,
                  name: me.name
                });
            } else {
                setAuth(false);
            }
        }, 200);
        return () => {
            clearTimeout(timeout);
        }
    });

    useEffect(() => {
        setPageLoad(true);
    }, [pageLoad]);

    if (!auth) {
        return <AuthLayout>
            <Login title="Please log in to continue" continue={false}/>
        </AuthLayout>
    }

    return <UserContext.Provider value={user}>
        <> <MainSideBar/>
        <MainContent>
            <ProfileNav/> {pageLoad
                ? <div className="dashboard_content">
                        {props.children}
                    </div>
                : <Loading/>}
        </MainContent>
    </>
</UserContext.Provider>
};

export default DashboardLayout;