import React, {Component} from 'react';
import Meta from '../components/Meta';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';

const theme = {
    red: '#D64242',
    black: '#393939',
    white: '#FFFFFF',
    grey: '#3A3A3A',
    brandColor: '#007bff',
    lightgrey: '#E1E1E1',
    maxWidth: '100%',
    hoverColor: '#f1f1f1',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};


const StyledPage = styled.div `
    color: ${props => props.theme.black};
`;

const Inner = styled.div `
    max-width: ${props => props.theme.maxWidth};
`;

injectGlobal `
@font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

html {
    box-sizing: border-box;
    font-size: 10px;
}

*, *:before, *:after {
    box-sizing: inherit;
}

body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
    background: rgb(156,186,218);
    background: linear-gradient(90deg, rgba(156,186,218,0.9192051820728291) 0%, rgba(194,217,242,1) 31%, rgba(220,225,231,1) 100%);
}

ul, li, h1, h2, h3, p, a {
    padding: 0;
    margin: 0;
}


h1, h2 {
    font-family: 'Roboto';
    font-weight: bold;
    padding-left: 24px;
    margin-top: 16px;
}

a {
    text-decoration: none;
    color: ${theme.black}
}
`;

export default class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    <Inner>
                        {this.props.children}
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        )
    }
}