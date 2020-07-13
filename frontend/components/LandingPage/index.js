import React, {Component} from 'react';
import LandingPageStyles from './LandingPageStyles';
import HeroSVG from './herosvg';
import Button from '../UIKIT/iButton';
import styled, {ThemeProvider} from 'styled-components';


const JoinButton = styled(Button)`

    && {
        font-size: 20px;
        font-family: ${props => props.theme.boldFont};
        width: auto;
        height: auto;
        padding: 12px 32px;
        margin-top: 64px;
    }

`;

const heroTheme = () => ({white: "#ff9999", hoverColor: '#ff6666', boldFont:  'nunito-bold, sans-serif'});

const LandingPage = () => {
        return (
            <LandingPageStyles>
                <div className="introHero">
                    <div className="container">
                        <div className="intro-message">
                            <h1>
                                Create interactive
                                <br /> maps
                            </h1>
                            <ThemeProvider theme={heroTheme}>
                                <JoinButton href="/signup">
                                    Start
                                </JoinButton>
                            </ThemeProvider>
                        </div>
                        <HeroSVG />
                    </div>
                </div>

                {/* <div className="midSectionHero">
                    <div className="container">
                        <div className="intro-message">
                            <h2>Visualise your next destination</h2>
                        </div>
                    </div>
                </div> */}
            </LandingPageStyles>
        );
};

export default LandingPage;