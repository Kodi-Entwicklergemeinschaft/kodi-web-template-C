import { Delete } from '@mui/icons-material';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useDeleteAccount from '../../hooks/useDeleteAccount';
import { STORAGE_KEYS } from '../../utilities/constants';

const DeleteUserAccount = () => {
  const { t } = useTranslation();
  const { deleteUserAccount } = useDeleteAccount();

return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      sx={{
        px: { xs: 1, sm: 4 },
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      <Typography variant="body1" fontWeight={600}>
        {t('settings.delete_account.promptReason')}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {t('settings.delete_account.warning')}
      </Typography>

      <TextField
        multiline
        minRows={5}
        placeholder={t('settings.delete_account.placeholder')}
        fullWidth
      />

      {deleteUserAccount.isError && (
        <Typography variant="body2" color="error">
          {t('settings.delete_account.error_message')}
        </Typography>
      )}

      <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
        <Button
          variant="contained"
          startIcon={<Delete />}
          color="error"
          sx={{
            width: { xs: '100%', sm: 'fit-content' },
            px: { xs: 2, sm: 6 },
            py: 1.5,
          }}
          onClick={() =>
            deleteUserAccount.mutateAsync(localStorage.getItem(STORAGE_KEYS.USER_ID) ?? '')
          }
          loading={deleteUserAccount.isPending}
        >
          {t('settings.delete_account.button')}
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteUserAccount;
