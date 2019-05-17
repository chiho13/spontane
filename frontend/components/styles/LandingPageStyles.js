import styled from 'styled-components';

const LandingPage = styled.div `
text-align: left;
color: #f8f8f8;
margin-top: -76px;

.introHero {
    padding-top: 50px;
    padding-bottom: 50px;
    background: linear-gradient(rgba(253, 227, 167, 0.4), rgba(245, 171, 53, 0.5)), url(https://res.cloudinary.com/monkeyking/image/upload/v1552846612/holeintherocksunset_fs8b9h.jpg);
    background-size: cover;
    height: 90vh;
}

.midSectionHero {
    background: linear-gradient(rgba(241, 231, 254, 0.3), rgba(174, 168, 211, 0.5)), url(https://res.cloudinary.com/monkeyking/image/upload/v1552848931/dusk_nduaod.jpg);
    background-size: cover;
}

.container {
    max-width: 1180px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
}

.intro-message {
    position: relative;
    padding-top: 10%;
    padding-bottom: 20%;

    h1 {
        font-size: 40px;
    }
}

`;

export default LandingPage;
// https://res.cloudinary.com/monkeyking/image/upload/v1552848931/dusk_nduaod.jpg