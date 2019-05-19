import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import useUser from './hooks/useUser';

const Nav = () => {
  const {data: {me}} = useUser();
  const username = me ? <div>{me.name}</div> : null;

  return <NavStyles>
    {username}
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
};

export default Nav;
