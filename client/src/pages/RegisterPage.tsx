import { RegisterForm } from "../components/forms/RegisterForm";
import { Page } from '../utils/styles/index';

export const RegisterPage = () => {
  return (
    <Page display="flex" justifyContent="center" alignItems="center">
      <RegisterForm />
    </Page>
  )
}