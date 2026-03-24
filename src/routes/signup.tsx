import React, { useState } from 'react';
import { createFileRoute, redirect, Link as RouterLink } from '@tanstack/react-router';
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import useSignup from '../hooks/useSignup';
import PublicLayout from '../layouts/Publiclayout';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IContextType } from '../types/login';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@tanstack/react-router';
const Signup: React.FC = () => {
  const {
    handleSubmit,
    handleChange,
    errors,
    formData,
    handleClickShowPassword,
    showPassword,
    loading,
    disableSubmit,
    isCredsValidated
  } = useSignup();
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  return (
    <Box
      sx={{
        height: '100%',
        px: { xs: 2, sm: 0 },
        maxWidth: { xs: '70vw', sm: 450 },
        '@media (max-width: 399px)': {
          px: 0.01,
          maxWidth: '70vw',
        },
      }}
    >

      <Typography variant="h4" mb={4}>
        {t('signup.title')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          fullWidth
          label={t('signup.firstName')}
          size="small"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.firstname}
          helperText={errors.firstname}
        />
        <TextField
          fullWidth
          size="small"
          label={t('signup.lastName')}
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.lastname}
          helperText={errors.lastname}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2.075 }}>
        <TextField
          fullWidth
          size="small"
          label={t('signup.username')}
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          size="small"
          label={t('signup.email')}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label={t('signup.password')}
          size="small"
          type={showPassword ? 'password' : 'text'}
          name="password"
          value={formData.password}
          onFocus={isCredsValidated}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          onChange={handleChange}
          error={Boolean(errors.password)}
          variant="outlined"
          // error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControlLabel
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          slotProps={{
            typography: {
              variant: 'body2',
              textAlign: 'left',
              mt: 1,
            },
          }}
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted((e.target as HTMLInputElement).checked)}
          control={<Checkbox />}
          label={
            <Typography
              sx={{ textDecoration: 'underline', fontSize: '0.9rem' }}
              onClick={() => navigate({ to: "/privacy-policy" })}
            >
              {t('signup.termsAgreement')}
            </Typography>
          }
        />
        {errors.signup && (
          <Typography variant="body2" color="error">
            {errors.signup}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: '50px', py: 1.5, whiteSpace: 'nowrap' }}
          onClick={handleSubmit}
          loading={loading}
          disabled={disableSubmit || !termsAccepted}
        >
          {t('signup.signupButton')}
        </Button>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
        {t('signup.loginOptionLabel')}&nbsp;
        <Link
          component={RouterLink}
          to="/login"
          fontWeight={600}
          fontSize={'large'}
          underline="hover"
        >
          {t('signup.loginOption')}
        </Link>
      </Typography>
    </Box>
  );
};
export default Signup;
export const Route = createFileRoute('/signup')({
  component: () => (
    <PublicLayout>
      <Signup />
    </PublicLayout>
  ),
  beforeLoad: ({ context }: { context: IContextType }) => {
    if (context?.auth?.isAuthenticated) {
      throw redirect({
        to: '/',
        search: {},
        replace: true,
      });
    }
  },
});