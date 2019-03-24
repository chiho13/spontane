import styled from 'styled-components';

const SideBarLogoStyle = styled.nav`
    border-bottom: 1px solid #e1e5eb;

    .navbar-brand {
        display: block;
        padding-top: 16px;
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