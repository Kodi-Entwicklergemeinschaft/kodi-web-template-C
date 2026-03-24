import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import useFeedback from '../hooks/usefeedbackForm';
import { useTranslation } from 'react-i18next';
import Footer from '../components/home/Footer';
import NavBar from '../components/NavBar';
import { referenceOptions } from '../utilities/constants';
import { useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/feedback')({
  component: FeedbackPage,
});

function FeedbackPage() {
  const { t } = useTranslation();
  const { navigate } = useRouter()
  const {
    name, setName,
    email, setEmail,
    feedback, setFeedback,
    isPrivacyChecked, setIsPrivacyChecked,
    errors,
    handleSubmit,
    disableSubmit,
    isPending,
    isSuccess,
    isError
  } = useFeedback();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar username="" />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'secondary.main',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            p: 4,
            mt: 15,
            bgcolor: 'common.white',
            borderRadius: 4,
            boxShadow: 6,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Typography
            variant="h4"
            mb={3}
            align="center"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {t('feedback.title')}
          </Typography>

          <FormControl fullWidth margin="normal" size='small'>
            <InputLabel>{t('feedback.referenceLabel')}</InputLabel>
            <Select
              value={name}
              label={t('feedback.referenceLabel')}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'common.white',
                  },
                },
              }}
            >
              {referenceOptions.map((key) => (
                <MenuItem key={key} value={t(`feedback.references.${key}`)}>
                  {t(`feedback.references.${key}`)}
                </MenuItem>
              ))}
            </Select>

            {errors.name && (
              <Typography variant="caption" color="error" mt={1}>
                {errors.name}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            label={t('feedback.emailLabel')}
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            size='small'
          />

          <TextField
            fullWidth
            label={t('feedback.feedbackLabel')}
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            error={!!errors.feedback}
            helperText={errors.feedback}
            sx={{ mb: 2 }}
            size='small'

          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isPrivacyChecked}
                onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                sx={{ pr: 0.5 }}
              />

            }
            label={
              <Typography
                sx={{ textDecoration: 'underline' }}
                onClick={() => navigate({ to: "/privacy-policy" })}
              >
                {t('feedback.privacyPolicyCheckbox')}
              </Typography>
            }
            sx={{ mb: 3 }}
            componentsProps={{
              typography: {
                fontSize: '14px',
              }
            }}
          />
          {isSuccess && <Typography variant="body2" color="success" textAlign='center' mb={2}>
            {t("feedback.successMessage")}
          </Typography>}
          {isError && <Typography variant="body2" color="error" textAlign='center' mb={2}>
            {t("feedback.error_message")}
          </Typography>}

          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={disableSubmit ? undefined : handleSubmit}
              sx={{
                px: 5,
                py: 0.7,
                fontSize: '1.1rem',
                borderRadius: 11,
                textTransform: 'none',
                bgcolor: disableSubmit ? 'grey.400' : 'primary.main',
                cursor: disableSubmit ? 'not-allowed' : 'pointer',
                '&:hover': {
                  bgcolor: disableSubmit ? 'grey.400' : 'primary.dark',
                  boxShadow: disableSubmit ? 'none' : '0 4px 10px rgba(0, 0, 0, 0.2)',
                },
                opacity: disableSubmit ? 0.7 : 1,
                transition: '0.3s',
              }}
            >
              {isPending ? t('feedback.SubmittingLabel') : t('feedback.submitButton')}
            </Button>
          </Box>

        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
