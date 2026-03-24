import { Box, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const TermsOfUse: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 , mt:10}}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        {t('terms-of-use.title')}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        {t('terms-of-use.section1_title')}
      </Typography>
      <Typography variant="body1">{t('terms-of-use.section1_content')}</Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        {t('terms-of-use.section2_title')}
      </Typography>
      <Typography variant="body1">{t('terms-of-use.section2_content')}</Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        {t('terms-of-use.section3_title')}
      </Typography>
      <Typography variant="body1">{t('terms-of-use.section3_content')}</Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        {t('terms-of-use.section4_title')}
      </Typography>
      <Typography variant="body1">{t('terms-of-use.section4_content')}</Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        {t('terms-of-use.section5_title')}
      </Typography>
      <Typography variant="body1">{t('terms-of-use.section5_content')}</Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        {t('terms-of-use.section6_title')}
      </Typography>
      <Typography variant="body1">{t('terms-of-use.section6_content')}</Typography>
    </Box>
  );
};

export default TermsOfUse;

export const Route = createFileRoute('/terms')({
  component: () => (
    <HeaderFooterLayout>
      <TermsOfUse />
    </HeaderFooterLayout>
  ),
});
