import { Grid, Button, Typography, Box } from '@mui/material';
import EditableField from '../shared/EditableField';
import useSaveUserDetails from '../../hooks/useUserSaveDetails';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

const UserDetails = () => {
  const { formData, isEditing, setIsEditing, handleChange, saveUserDetailsMutation, error, isValidCred } =
    useSaveUserDetails();
  const { t } = useTranslation();
  const navigator = useNavigate();

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 3, md: 6 },
        width: '100%',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <EditableField
            label={t('settings.user_details.username')}
            feildKey="username"
            value={formData.username}
            handleChange={handleChange}
            isEditing={isEditing}
            isValidCred={isValidCred}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditableField
            label={t('settings.user_details.firstname')}
            feildKey="firstname"
            value={formData.firstname}
            handleChange={handleChange}
            isEditing={isEditing}
            isValidCred={isValidCred}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditableField
            label={t('settings.user_details.lastname')}
            feildKey="lastname"
            value={formData.lastname}
            handleChange={handleChange}
            isEditing={isEditing}
            isValidCred={isValidCred}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditableField
            label={t('settings.user_details.phone')}
            feildKey="phoneNumber"
            value={formData.phoneNumber}
            handleChange={handleChange}
            isEditing={isEditing}
            isValidCred={isValidCred}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditableField
            label={"Email"}
            feildKey="email"
            value={formData.email}
            handleChange={handleChange}
            isEditing={isEditing}
            isValidCred={isValidCred}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditableField
            label={t('settings.user_details.website')}
            feildKey="website"
            value={formData.website}
            handleChange={handleChange}
            isEditing={isEditing}
            isValidCred={isValidCred}
          />
        </Grid>
        <Grid item xs={12}>
          <EditableField
            label={t('settings.user_details.description')}
            feildKey="description"
            value={formData.description}
            isMultiline
            handleChange={handleChange}
            isEditing={isEditing}
            isValidCred={isValidCred}
          />
        </Grid>

        {/* Optional image section
        <Grid item xs={12} sm={4}>
          <EditableImageDropzone
            imageUrl={formData.image}
            handleImageChange={(file) => handleChange('image', file)}
            sx={{ alignItems: 'center' }}
            isEditing={isEditing}
          />
        </Grid> */}
      </Grid>

      <Box
        display="flex"
        gap={2}
        flexDirection="column"
        mt={4}
        justifyContent="center"
        width="100%"
        alignItems="center"
      >
        {saveUserDetailsMutation.isError && (
          <Typography variant="body2" color="error">
            {t('settings.user_details.failure_message')}
          </Typography>
        )}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {saveUserDetailsMutation.isSuccess && (
          <Typography variant="body2" color="success">
            {t('settings.user_details.success_message')}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            onClick={() => saveUserDetailsMutation.mutateAsync()}
            loading={saveUserDetailsMutation.isPending}
            disabled={!isEditing}
            fullWidth
            sx={{
              maxWidth: { xs: '100%', sm: '200px' },
              minWidth: 0,
            }}
          >
            {t('settings.user_details.save')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsEditing((prev: boolean) => !prev)}
            fullWidth
            sx={{
              maxWidth: { xs: '100%', sm: '200px' },
              minWidth: 0,
            }}
          >
            {isEditing ? t('settings.user_details.cancel') : t('settings.user_details.edit')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigator({ href: '/editonboarding' })}
            fullWidth
            sx={{
              maxWidth: { xs: '100%', sm: '250px' },
              minWidth: 0,
            }}
          >
            {t('settings.user_details.viewonboarding')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetails;
