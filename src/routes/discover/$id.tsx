import { createFileRoute, useRouter } from '@tanstack/react-router';
import PrivateLayout from '../../layouts/PrivateLayout';
import useGetSubCategories from '../../hooks/useGetSubCategories';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

type subCategoryProps = {
  imageUrl: string;
  name: string;
}

const subCategoryList:subCategoryProps[] = [
  {
    imageUrl : '/public/fc7e567d2e19f9f007f94793d37726b6ad4d13c5.jpg',
    name : 'burgerservice.firstcard.Name'
  },
  {
    imageUrl : '/public/cd2e01951df3989f64b7f9fc9ae0d7a32bbabfbd.jpg',
    name : 'burgerservice.secondcard.Name'
  },
  {
    imageUrl : '/public/6dc72058b4cfdabcffb29d108023f9b36cfca265.jpg',
    name : 'burgerservice.thirdcard.Name'
  },
  {
    imageUrl : '/public/e7afb9a6c54555b6af2c4f49048ebc48b4cb1d78.png',
    name : 'burgerservice.fourthcard.Name'
  },
  {
    imageUrl : '/public/d079a43a7a4033225c64716d8292924009d3af85.png',
    name : 'burgerservice.fifthcard.Name'
  }
]
const DiscoverById = () => {
  const router = useRouter();
  const { id: categoryId } = Route.useParams();
  const { t } = useTranslation();
  const { subCategoryDetails } = useGetSubCategories();
  return (
    <Box sx={{ px: 6, pb: 6, pt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>
        {t('discover.title')}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '60%', mb: 4 }}>
        {t('discover.description')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {subCategoryList.length > 0 && categoryId==10 ? (
          subCategoryList.map(({ name = '', imageUrl}, id) => (
            <Card
              key={id}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                background: (theme) => theme.palette.common.white,
                width: '250px',
                cursor: 'pointer',
              }}
              onClick={() => router.navigate({ to: `/discover/${categoryId}/${id}` })}
            >
              <Box sx={{ borderRadius: '10px', overflow: 'hidden', p: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${imageUrl}`}
                  alt="event"
                  sx={{ borderRadius: '10px' }}
                />
              </Box>

              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }} textAlign={'center'}>
                  {t(name)}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h5" fontWeight={500} color="primary">
            No SubCategories found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export const Route = createFileRoute('/discover/$id')({
  component: () => (
    <PrivateLayout>
      <DiscoverById />
    </PrivateLayout>
  ),
});
