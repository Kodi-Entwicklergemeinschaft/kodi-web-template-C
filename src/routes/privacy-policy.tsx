import { Box, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 , mt:10}}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        {t('Datenschutz.title')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Datenschutz.section1_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Datenschutz.section1_content')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Datenschutz.section2_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Datenschutz.section2_content')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Datenschutz.section2.1_content')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Datenschutz.section3_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Datenschutz.section3_content')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Datenschutz.section4_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Datenschutz.section4_content')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Datenschutz.section5_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Datenschutz.section5_content')}
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;

export const Route = createFileRoute('/privacy-policy')({
  component: () => (
    <HeaderFooterLayout>
      <PrivacyPolicy />
    </HeaderFooterLayout>
  ),
});
