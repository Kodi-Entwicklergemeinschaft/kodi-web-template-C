import {
  Box,
  Link,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useChangePassword from '../hooks/useChangePassword';
import { APPROUTES } from '../utilities/routes';

const ResetPassword = () => {
  const {
    handleChangePassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    loading,
    showPassword,
    setShowPassword,
    isSuccess,
  } = useChangePassword();
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
      <Typography variant="h4" sx={{ mb: 4 }}>
        {t('resetPassword.title')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <TextField
          fullWidth
          label={t('resetPassword.newPasswordLabel')}
          size="small"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleChangePassword();
            }
          }}
          type={showPassword ? 'text' : 'password'}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            label={t('resetPassword.confirmPasswordLabel')}
            size="small"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleChangePassword();
              }
            }}
            type={showPassword ? 'text' : 'password'}
          />
          <FormControlLabel
            control={
              <Checkbox onChange={(e) => setShowPassword(e.target.checked)} value={showPassword} />
            }
            label={t('resetPassword.showPasswordLabel')}
          />
        </Box>
      </Box>
      {errors.newPassword && (
        <Typography variant="body2" color="error">
          {errors.newPassword}
        </Typography>
      )}
      {errors.passwordMatch && (
        <Typography variant="body2" color="error">
          {errors.passwordMatch}
        </Typography>
      )}
      {isSuccess && (
        <Typography variant="body2" color="success">
          {t('resetPassword.successMessage')}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        loading={loading}
        fullWidth
        sx={{ mt: 1, borderRadius: '50px', py: 1 }}
        onClick={() => handleChangePassword()}
      >
        {t('resetPassword.resetPasswordButton')}
      </Button>
      <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
        {t('resetPassword.existingAccountMessage')}
        <Link href={APPROUTES.REGISTER} underline="hover" fontWeight={600} fontSize={'large'}>
          {t('resetPassword.loginOptionLabel')}
        </Link>
      </Typography>
    </Box>
  );
};

export default ResetPassword;
