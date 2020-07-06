import React, { Component } from 'react';
import styled from 'styled-components';


const TitleStyle = styled.div`
    .main-title {
        padding-left: 0;
        margin-top: 0;
        font-family: ${props => props.theme.boldFont};
        margin-bottom: 32px;
    }
`;

const MainContentTitle = (props) => {
    return (
        <TitleStyle>
            <h2 className="main-title">
                {props.title}
            </h2>
        </TitleStyle>
    );
};

export default MainContentTitle;