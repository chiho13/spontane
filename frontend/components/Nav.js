import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => {
  return <NavStyles>
  
    <Link href="/">
      <a>Pricing</a>
    </Link>
    <Link href="/admin">
      <a>Login</a>
    </Link>
  </NavStyles>
};

export default Nav;
