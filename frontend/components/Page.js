import React, {Component} from 'react';
import Meta from '../components/Meta';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';

export const theme = {
    red: '#D64242',
    black: '#393939',
    white: '#FFFFFF',
    grey: '#cccccc',
    brandColor: '#007bff',
    lightgrey: '#E1E1E1',
    maxWidth: '100%',
    hoverColor: '#f1f1f1',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
    fontFamily: 'nunito, sans-serif',
    boldFont: 'nunito-bold, sans-serif',
};


const StyledPage = styled.div `
    color: ${props => props.theme.black};
`;

const Inner = styled.div `
    max-width: ${props => props.theme.maxWidth};
`;

injectGlobal `
@font-face {
    font-family: 'nunito';
    src: url('/static/nunito.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'nunito-bold';
    src: url('/static/nunito-bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
}

html {
    box-sizing: border-box;
    font-size: 16px;
}

*, *:before, *:after {
    box-sizing: inherit;
}

body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    line-height: 2;
    background: #f7f7f7;
}

ul, li, h1, h2, h3, p, a {
    padding: 0;
    margin: 0;
}

.mapboxgl-ctrl {
    display: none;
}

h1, h2, h3 {
    font-family: 'nunito-bold';
    font-size: 1.5rem;
    font-weight: bold;
    padding-left: 24px;
    margin-top: 16px;
}

p {
    font-family: 'nunito';
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