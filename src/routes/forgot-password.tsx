import { createFileRoute, Link as RouterLink } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import PublicLayout from '../layouts/Publiclayout';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import useForgotPassword from '../hooks/useForgotPassword';

export const Route = createFileRoute('/forgot-password')({
  component: () => (
    <PublicLayout>
      <ForgotPassword />
    </PublicLayout>
  ),
});

const ForgotPassword = () => {
  const { handleusernameSubmit, username, errors, setUsername, loading, disableSubmit, isSuccess } =
    useForgotPassword();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ mb: 4 }}>
        {t('forgotPassword.title')}
      </Typography>
      <TextField
        fullWidth
        size="small"
        label={t('forgotPassword.email')}
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleusernameSubmit();
          }
        }}
      />
      {errors.forgotPassword && (
        <Typography variant="body2" color="error" mt={2}>
          {errors.forgotPassword}
        </Typography>
      )}
      {isSuccess && (
        <Typography variant="body2" color="success" mt={2}>
          {t('forgotPassword.successfullyEmailSent')}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        loading={loading}
        disabled={disableSubmit}
        onClick={handleusernameSubmit}
        fullWidth
        sx={{ mt: 2, borderRadius: '50px', py: 1 }}
      >
        {t('forgotPassword.sendEmail')}
      </Button>
      <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
        {t('forgotPassword.backTo')}
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          fontWeight={600}
          fontSize={'large'}
          ml={1}
        >
          {t('forgotPassword.login')}
        </Link>
      </Typography>
    </Box>
  );
};
