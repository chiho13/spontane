import AuthLayout from '../components/Layout/AuthLayout';
import Login from '../components/Login';
import useUser from '../components/hooks/useUser';

const LoginPage = () => {
  const {
   refetch
} = useUser();
  return  <AuthLayout>
          <Login refetch={refetch} redirect={true}/>
    </AuthLayout>
};

export default LoginPage;