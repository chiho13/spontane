import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Logo from './Logo';

const StyledHeader = styled.header`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: ${props => props.theme.brandColor};
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
    .nav_container {
        display: flex;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
    }

    .logo_container {
        display:flex;
        align-items: center;
    }
    
    .bar {
        background: linear-gradient(to bottom, rgba(12,12,12,0.4) 0%,rgba(255,255,255,0) 100%); 
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: 1000px) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }

    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey}
    }

    .headerLogo {
        width: 140px;
    }
`;

const Header = () => {
    const invertBrand = ({ white }) => ({ brandColor: white });
    return <StyledHeader>
        <div className="nav_container">

            <Link href="/">
                <a className="logo_container">
                    <Logo theme={invertBrand} />
                </a>
            </Link>

        <Nav />
        </div>
    </StyledHeader>
};

export default Header;