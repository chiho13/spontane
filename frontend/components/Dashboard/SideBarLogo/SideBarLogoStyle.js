import styled from 'styled-components';

const SideBarLogoStyle = styled.nav`
        display: flex;
        align-items: center;
    .navbar-brand {
        display: flex;
        padding-left: 16px;
        padding-right: 16px;
        text-align: center;
    }

    svg {
        width: 140px;
    }

    svg path {
        fill: ${props => props.theme.brandColor};
    }
`;

export default SideBarLogoStyle;