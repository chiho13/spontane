import React, {Component} from 'react';
import LandingPageStyles from './styles/LandingPageStyles';

class LandingPage extends Component {
    render() {
        return (
            <LandingPageStyles>
                <div className="introHero">
                    <div className="container">
                        <div className="intro-message">
                            <h1>
                                Create seamless audio tour experiences for your visitors
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="midSectionHero">
                    <div className="container">
                        <div className="intro-message">
                            <h2>For self-guided audio walking tours. Engage your visitors without downloading an app </h2>
                        </div>
                    </div>
                </div>
            </LandingPageStyles>
        );
    }
}

export default LandingPage;