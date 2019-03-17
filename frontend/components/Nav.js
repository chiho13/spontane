import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/addLocation">
      <a>Create Tour</a>
    </Link>
    <Link href="/me">
      <a>About</a>
    </Link>
  </NavStyles>
);

export default Nav;
