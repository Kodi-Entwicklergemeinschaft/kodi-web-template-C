// import { createFileRoute, useRouter } from '@tanstack/react-router';
// import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
// import PrivateLayout from '../../layouts/PrivateLayout';
// import useCategories from '../../hooks/useCategories';
// import { useTranslation } from 'react-i18next';
// import { APPROUTES } from '../../utilities/routes';

// type DiscoverProps = {
//   ImageUrl: string;
//   Name: string;
//   Content: string;
// }

// const discoveryList: DiscoverProps[] = [
//   {
//     ImageUrl: '/public/55d5affcb5fb003fed041004820754be61ffbca4(1).jpg',
//     Name: 'discoverylist.firstcard.Name',
//     Content: 'discoverylist.firstcard.Content',
//   },
//   {
//     ImageUrl: '/public/ImagePlaceholder.png',
//     Name: 'discoverylist.secondcard.Name',
//     Content: 'discoverylist.secondcard.Content',
//   },
//   {
//     ImageUrl: '/public/f4e49f7bd584b6f85e05be0a588f46cba2ed9e9b.jpg',
//     Name: 'discoverylist.thirdcard.Name',
//     Content: 'discoverylist.thirdcard.Content',
//   },
//   {
//     ImageUrl: 'public/be4f9e5ef07ea2ea01878f6e4dad93bc738937fd.jpg',
//     Name: 'discoverylist.fourthcard.Name',
//     Content: 'discoverylist.fourthcard.Content',
//   },
//   {
//     ImageUrl: 'public/6dc72058b4cfdabcffb29d108023f9b36cfca265.jpg',
//     Name: 'discoverylist.fifthcard.Name',
//     Content: 'discoverylist.fifthcard.Content',
//   },
//   {
//     ImageUrl: 'public/2e635aef4acbd163b3dfc53e2e7cc38c6dfd5b55.jpg',
//     Name: 'discoverylist.sixthcard.Name',
//     Content: 'discoverylist.sixthcard.Content',
//   },
//   {
//     ImageUrl: 'public/af22551b0e7cbe352ba7e78875deab5347462859.png',
//     Name: 'discoverylist.seventhcard.Name',
//     Content: 'discoverylist.seventhcard.Content',
//   },
//   {
//     ImageUrl: 'public/2b544809f8a5b5e0b5ca40c1ae9ef3ae109d37f1.jpg',
//     Name: 'discoverylist.eighthcard.Name',
//     Content: 'discoverylist.eighthcard.Content',
//   },
//   {
//     ImageUrl: 'public/933f50e656818cf06b3279e5b9c8aea79253267b.jpg',
//     Name: 'discoverylist.ninthcard.Name',
//     Content: 'discoverylist.ninthcard.Content',
//   },
//   {
//     ImageUrl: 'public/fc7e567d2e19f9f007f94793d37726b6ad4d13c5.jpg',
//     Name: 'discoverylist.tenthcard.Name',
//     Content: 'discoverylist.tenthcard.Content',
//   },
//   {
//     ImageUrl: 'public/cd2e01951df3989f64b7f9fc9ae0d7a32bbabfbd.jpg',
//     Name: 'discoverylist.eleventhcard.Name',
//     Content: 'discoverylist.eleventhcard.Content',
//   },
// ];

// const Discover = () => {
//   const { categoriesDetails } = useCategories();
//   const { t } = useTranslation();

//   const router = useRouter();
//   return (
//     <Box sx={{ px: 6, pb: 6, pt: 0 }}>
//       <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>
//         {t('discover.title')}
//       </Typography>
//       <Typography variant="body1" sx={{ maxWidth: '60%', mb: 4 }}>
//         {t('discover.description')}
//       </Typography>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           gap: 4,
//         }}
//       >
//         {discoveryList.length > 0 ? (
//           discoveryList.map(({ Name = '', ImageUrl, Content }, id) => (
//             <Card
//               sx={{
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 background: (theme) => theme.palette.common.white,
//                 maxWidth: '280px',
//                 maxHeight: '300px',
//               }}
//               onClick={() => router.navigate({ to: APPROUTES.NAVIGATE_DISCOVER_BY_ID(id) })}
//               key={id}
//             >
//               {(id==2||id==9)&&<Box sx={{ position: 'absolute', bgcolor: '#AADB40',  borderTopLeftRadius: '12px',
//     borderBottomRightRadius: '12px', overflow: 'hidden', p: 1, height: '42px', fontWeight: '600' }}>
//                 {t('discoverylist.new')}
//               </Box>}
//               <Box sx={{ borderRadius: '10px', overflow: 'hidden', p: 1 }}>
//                 <CardMedia
//                   component="img"
//                   height="180"
//                   image={`${ImageUrl}`}
//                   alt="event"
//                   sx={{ borderRadius: '10px' }}
//                 />
//               </Box>

//               <CardContent>
//                 <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                   {t(Name)}
//                 </Typography>

//                 <Typography variant="body2" fontWeight={400} mt={1}>
//                   {t(Content)}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography variant="h5" color="primary">
//             No Discovery List found
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export const Route = createFileRoute('/discover/')({
//   component: () => (
//     <PrivateLayout>
//       <Discover />
//     </PrivateLayout>
//   ),
// });

import { createFileRoute, useRouter } from '@tanstack/react-router';
import PrivateLayout from '../../layouts/PrivateLayout';
import useGetSubCategories from '../../hooks/useGetSubCategories';
import { Box, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

type subCategoryProps = {
  imageUrl: string;
  name: string;
  href: string;
}

const subCategoryList: subCategoryProps[] = [
  {
    imageUrl: '/public/fc7e567d2e19f9f007f94793d37726b6ad4d13c5.jpg',
    name: 'burgerservice.firstcard.Name',
    href: '/virtualtownhall'

  },
  {
    imageUrl: '/public/cd2e01951df3989f64b7f9fc9ae0d7a32bbabfbd.jpg',
    name: 'burgerservice.secondcard.Name',
    href: '/meinort'
  },
  {
    imageUrl: '/public/6dc72058b4cfdabcffb29d108023f9b36cfca265.jpg',
    name: 'burgerservice.thirdcard.Name',
    href: '/tourism'
  },
  {
    imageUrl: '/public/e7afb9a6c54555b6af2c4f49048ebc48b4cb1d78.png',
    name: 'burgerservice.fourthcard.Name',
    href: '/mobility'
  },
  {
    imageUrl: '/public/d079a43a7a4033225c64716d8292924009d3af85.png',
    name: 'burgerservice.fifthcard.Name',
    href: '/mitchmachen'
  }
]

const DiscoverByIdM = () => {
  const router = useRouter();
  // const { id: categoryId } = Route.useParams();
  const { t } = useTranslation();
  // const { subCategoryDetails } = useGetSubCategories();
  return (
    <Box sx={{ px: 6, pb: { xs: 4, md: 6 }, pt: 0, backgroundImage: `linear-gradient(to bottom, #e2ebf7, #ebf0f9, #f3f4fb, #f9fafd, #ffffff)`, }}>
      <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>
        {t('discover.title')}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: { xs: '100%', md: '60%' }, mb: 4 }}>
        {t('discover.description')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: { xs: 3, md: 4 },
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          {subCategoryList.length > 0 ? (
            subCategoryList.map(({ name = '', imageUrl, href }, id) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  title={t(name)}
                  key={id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    background: (theme) => theme.palette.common.white,
                    width: { sm: '18rem', xs: '20rem' },
                    cursor: 'pointer',
                  }}
                  onClick={() => router.navigate({ to: `/${href}/` })}
                >
                  <Box sx={{ borderRadius: '10px', overflow: 'hidden', p: 1 }}>
                    <img src={`${imageUrl}`} alt="discoveryimage" height={200} width={'100%'} style={{ borderRadius: '0.5rem' }} />
                    {/* <CardMedia
                  component="img"
                  height="200"
                  image={`${imageUrl}`}
                  alt="event"
                  sx={{ borderRadius: '10px', backgroundSize: 'contain' }}
                /> */}
                  </Box>
                  <CardContent sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{
                      fontWeight: 600, height: '3rem', wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal'
                    }} textAlign={'center'}>
                      {t(name)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={500} color="primary">
                No SubCategories found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export const Route = createFileRoute('/discover/')({
  component: () => (
    <PrivateLayout>
      <DiscoverByIdM />
    </PrivateLayout>
  ),
});