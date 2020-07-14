import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;

  a,
  button {
    padding: 1rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1rem;
    background: none;
    border: 0;
    cursor: pointer;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.white};

    @media (min-width: 1200px) {
          padding: 1rem 3rem;
    }

    &:after {
      height: 2px;
      background: ${props => props.theme.white};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.95, 0, 2.31);
      left: 50%;
      margin-top: 1rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 80px);
      }
    @media (max-width: 700px) {
        width: calc(100% - 10px);
    }

    }
  }
  justify-content: flex-end;
`;

export default NavStyles;
