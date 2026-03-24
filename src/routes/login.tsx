import { createFileRoute, redirect, Link as RouterLink } from '@tanstack/react-router';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PublicLayout from '../layouts/Publiclayout';
import useLogin from '../hooks/useLogin';
import { useTranslation } from 'react-i18next';
import { IContextType } from '../types/login';
import { APPROUTES } from '../utilities/routes';
 
const Login: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    disableSubmit,
    handleLogin,
    loading,
    handleClickShowPassword,
    showPassword,
  } = useLogin();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 1, sm: 3, md: 0 },
        '@media (max-width: 399px)': { px:0.01, maxWidth: '80vw'},
      }}
    >
      <Typography variant="h4" sx={{ mb: { xs: 3, sm: 4, md:4 } }}>
        {t('login.title')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column',  gap: { xs: 1.5, sm: 2 }, width: '100%' }}>
        <TextField
          fullWidth
          size="small"
          label={t('login.usernameLabel')}
          variant="outlined"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          label={t('login.passwordLabel')}
          size="small"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          type={showPassword ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Link
        component={RouterLink}
        to="/forgot-password"
        underline="hover"
        color="primary"
        fontSize={'0.875rem'}
        textAlign={'right'}
        mx={2}
        mt={1}
        mb={2}
        sx={{ width: '100%' }}
      >
        {t('login.forgotPassword')}
      </Link>
      {errors.login && (
        <Typography variant="body2" color="error">
          {errors.login}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        loading={loading}
        disabled={disableSubmit}
        fullWidth
        sx={{ mt: 1, borderRadius: '50px', py: 1 }}
        onClick={() => handleLogin()}
      >
        {t('login.loginButton')}
      </Button>
      <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
        {t('login.signupOptionLabel')}&nbsp;
        <Link
          component={RouterLink}
          to={APPROUTES.REGISTER}
          underline="hover"
          fontWeight={600}
          fontSize={'large'}
        >
          {t('login.signUpOption')}
        </Link>
      </Typography>
    </Box>
  );
};
 
export default Login;
 
export const Route = createFileRoute('/login')({
  component: () => (
    <PublicLayout>
      <Login />
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