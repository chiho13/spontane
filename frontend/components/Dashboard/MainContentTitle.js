import React, { Component } from 'react';
import styled from 'styled-components';


const TitleStyle = styled.div`
    h2 {
        padding-left: 32px;
    }
`;

class MainContentTitle extends Component {
    render() {
        return (
            <TitleStyle>
                <h2>
                    {this.props.title}
                </h2>
            </TitleStyle>
        );
    }
}

export default MainContentTitle;