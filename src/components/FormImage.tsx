import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LISTINGSIMAGE from '../assets/ListingsImage.jpg'; // Import the default image

function FormImage(props) {
  const { t } = useTranslation();

  const handleRemoveImage = (imgIndex) => {
    const updatedImages = Array.from(props.image);
    updatedImages.splice(imgIndex, 1);
    props.updateImageList(updatedImages);
    props.handleRemoveImage();
  };

  return Array.from(props.image).map((img, index) => {
    let imageUrl;

    if (typeof img === 'string') {
      // Check if the image is a default admin image
      if (img.includes('admin/')) {
        imageUrl = LISTINGSIMAGE;
      } else {
        imageUrl = import.meta.env.VITE_BUCKET_URL + img;
      }
    } else if (img instanceof File || img instanceof Blob) {
      imageUrl = URL.createObjectURL(img);
    }

    return (
      <Card key={index} sx={{ maxWidth: 345, m: 1 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt="uploaded"
            onLoad={() => {
              if (props.localImageOrPdf && img instanceof Blob) {
                URL.revokeObjectURL(imageUrl); // Prevent memory leaks
              }
            }}
            sx={{
              objectFit: 'cover',
            }}
          />
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemoveImage(index)}
            fullWidth
          >
            {t('removeFile')}
          </Button>
        </CardActions>
      </Card>
    );
  });
}

FormImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]).isRequired,
  localImageOrPdf: PropTypes.bool,
  updateImageList: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default FormImage;
