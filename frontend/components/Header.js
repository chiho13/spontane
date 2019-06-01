import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1 `
    font-size: 2rem;
    margin-left: 1.5rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);

    a {
        padding: 0.25rem 0.75rem;
        background: ${props => props.theme.black};
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }

    @media (max-width: 1000px) {
        margin: 0;
        text-align: center;
    }
`;

const StyledHeader = styled.header `
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;

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
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            <Logo>
                <Link href="/">
                    <a>spontane</a>
                </Link>
            </Logo>
            <Nav/>
        </div>
       
    </StyledHeader>
);

export default Header;