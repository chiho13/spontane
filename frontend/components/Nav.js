import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import useUser from '../components/hooks/useUser';


const Nav = () => {
  const {
    data: {
      me: user
    }
 } = useUser();
  return <NavStyles>
  
    <Link href="/mymaps">
<a>{  user ? 'My Maps' : 'Login'}</a>
    </Link>
  </NavStyles>
};

export default Nav;
