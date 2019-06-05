import AuthLayout from '../components/Layout/AuthLayout';
import Reset from '../components/Reset';

const ResetPasswordPage = (props) => {
  return <AuthLayout>
        <Reset resetToken={props.query.resetToken} />
    </AuthLayout>
};

export default ResetPasswordPage;