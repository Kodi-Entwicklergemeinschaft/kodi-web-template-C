import { Box, Typography, Stack, Link } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Imprint: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ px: { xs: 2, md: 6}, py: 4, mt:10 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        {t('Impressum.title')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Impressum.section1_title')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
        {t('Impressum.section1_description')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {t('Impressum.section1_provider')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('Impressum.section1_address')}
      </Typography>

      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        {t('Impressum.section1_contact')}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 1 }}>
        <PhoneIcon color="primary" sx={{ mt: 0.5 }} />
        <Typography variant="body1">{t('Impressum.section1_tel')}</Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 1 }}>
        <PhoneIcon color="primary" sx={{ mt: 0.5 }} />
        <Typography variant="body1">{t('Impressum.section1_fax')}</Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <EmailIcon color="primary" />
        <Typography variant="body1">{t('Impressum.section1_email')}</Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <LocationOnIcon color="primary" />
        <Link href="https://www.landkreis-kusel.de" target="_blank" rel="noopener noreferrer" underline="hover">
          {t('Impressum.section1_website')}
        </Link>
      </Stack>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {t('Impressum.section1_vat')}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Impressum.section2_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
        {t('Impressum.section2_content')}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Impressum.section3_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Impressum.section3_description')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t('Impressum.section3_note')}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Impressum.section4_title')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t('Impressum.section4_content')}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Impressum.section5_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
        {t('Impressum.section5_description')}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
        {t('Impressum.section6_title')}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
        {t('Impressum.section6_description')}
      </Typography>
      <Typography variant="body1">
        {t('Impressum.section6_note')}
      </Typography>
    </Box>
  );
};

export default Imprint;

export const Route = createFileRoute('/impressum')({
  component: () => (
    <HeaderFooterLayout>
      <Imprint />
    </HeaderFooterLayout>
  ),
});
