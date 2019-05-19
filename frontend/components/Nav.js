import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => (
  <NavStyles>
    <User>
       {(data) => {
         console.log(data);
         return <p>User</p>
       }}
    </User>
    <Link href="/addLocation">
      <a>Create Tour</a>
    </Link>
    <Link href="/">
      <a>Pricing</a>
    </Link>
    <Link href="/">
      <a>Login</a>
    </Link>
  </NavStyles>
);

export default Nav;
