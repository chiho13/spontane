import MainSideBar from '../Dashboard/MainSideBar/MainSideBar';
import ProfileNav from '../Dashboard/NavProfilePill/NavProfilePill';
import styled from 'styled-components';
import React, {useEffect, useState, useRef} from 'react';
import useUser from '../hooks/useUser';
import Loading from '../LoadingSpinner';
import Login from '../Login';
import AuthLayout from './AuthLayout';
import {useRouter} from 'next/router';
import BuyCredit from '../Dashboard/BuyCredits';
import {ViewPortProvider } from '../providers/MapProvider';
import Logo from '../../components/Dashboard/SideBarLogo/SideBarLogo';


const DashboardContainer = styled.div`
    display: block;
`;

const MainContent = styled.div `
  display: flex;
  position: relative;
  flex-grow: 1;
  top: 60px;

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
    const router = useRouter();
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
    
    const {hideList} = props;
    function setProjectID(id) {
        setProjectId(id);
    }


    const projectData = user && user.projects.find(el => {
        return el.id === router.query.id
    });

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

    if (!user && !loading) {
        return <AuthLayout>
            <Login title="Please log in to continue" continue={false} refetch={refetch}/>
        </AuthLayout>
    }

    return <UserContext.Provider
        value={{
        user,
        loading,
        called, refetch, projectId, setProjectID, projectData
    }}>
        <ViewPortProvider id={props.id} user={user}>
        
        <DashboardContainer>
         <MainSideBar user={user} hideList={hideList}/>
        <MainContent>
             <div className="dashboard_content">
                        {props.children}
                    </div>
        </MainContent>
        </DashboardContainer>
    </ViewPortProvider>
</UserContext.Provider>
};

export default DashboardLayout;

DashboardLayout.defaultProps = {
    hideList: false
}