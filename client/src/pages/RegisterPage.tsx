import { RegisterForm } from '../components/forms/register';
import { Page } from '../utils/styles/index';

export const RegisterPage = () => {
  return (
    <Page display="flex" justifyContent="center" alignItems="center">
      <RegisterForm />
    </Page>
  )
}