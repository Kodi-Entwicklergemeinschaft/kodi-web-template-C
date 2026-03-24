import { createFileRoute } from '@tanstack/react-router';
import PublicLayout from '../layouts/Publiclayout';
import ResetPassword from '../components/ResetPassword';

const PasswordForgot = () => {
  return <ResetPassword />;
};

export const Route = createFileRoute('/PasswordForgot')({
  component: () => (
    <PublicLayout>
      <PasswordForgot />
    </PublicLayout>
  ),
});
