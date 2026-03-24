import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Chip,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Delete as DeleteIcon, PictureAsPdf } from '@mui/icons-material';
import dayjs from 'dayjs';
import {
  useListingsById,
  usePostListing,
  useUpdateListing,
  useUploadListingImage,
  useUploadListingPDF,
  useDeleteListingImage,
} from '../hooks/useListings';

import useCategories from '../hooks/useCategories';
import useSubcategories from '../hooks/useSubcategories';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import RichTextEditor from './RichTextEditor';
import { PickersActionBar } from '@mui/x-date-pickers/PickersActionBar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useAdminCities from '../hooks/useAdminCities';
import useGetUserDetails from '../hooks/useGetUser';

// Styled component for drag and drop area
const Dropzone = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  border: '2px dashed',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.grey[100],
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));
type FileWithPreview = File & { preview: string };
const CustomActionBar = (props) => {
  return <PickersActionBar {...props} actions={['clear', 'cancel', 'accept']} />;
};
interface Props {
  isEdit: boolean;
  listingId?: string;
  cityIds?: string[];
}

const MAX_IMAGES = 8;
const MAX_FILE_SIZE_MB = 20;
const CHARACTER_LIMIT_TITLE = 255;
const CHARACTER_LIMIT_DESCRIPTION = 65535;

const UploadListings: React.FC<Props> = ({ isEdit, listingId, cityIds }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFieldErrors, setShowFieldErrors] = useState(false);
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [pdf, setPdf] = useState<FileWithPreview | null>(null);
  const [localImageOrPdf, setLocalImageOrPdf] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    title: '',
    description: '',
    categoryId: '',
    subcategoryId: '',
    districts: [],
    municipalities: [],
    cities: [],
    startDate: null,
    endDate: null,
    disableDates: false,
    price: '',
    originalPrice: '',
    discountedPrice: '',
    isPaid: false,
    images: [],
    pdf: null,
    address: '',
    phone: '',
    email: '',
    website: '',
    expiryDate: null,
    appointmentInput: {},
    timeless: false,
    statusId: 1,
    logo: null,
    zipCode: '',
    place: '',
    removeImage: false,
    removePdf: false,
    hasImage: false,
    hasAttachment: false,
  });

  const { cityList } = useAdminCities();
  const { userData } = useGetUserDetails();

  const { categoriesDetails } = useCategories();
  const { data: listingData, isLoading, isError } = useListingsById(cityIds ?? '', listingId ?? '');

  // Mutation hooks
  const postListingMutation = usePostListing();
  const updateListingMutation = useUpdateListing();
  const uploadImageMutation = useUploadListingImage();
  const uploadPdfMutation = useUploadListingPDF();
  const deleteImageMutation = useDeleteListingImage();

  const { t } = useTranslation();
  const districts = cityList.filter((c) => c.type === 'district_admin');
  const municipalities = cityList.filter((c) => c.type === 'municipality');
  const cities = cityList.filter((c) => c.type === 'city');

  // Get municipalities filtered by selected districts
  const filteredMunicipalities =
    form.districts.length > 0
      ? municipalities.filter((m) => form.districts.some((d: CityType) => m.parentId === d.id))
      : municipalities;

  const { subcategories } = useSubcategories(form.categoryId);

  // Get cities filtered by selected municipalities
  const filteredCities =
    form.municipalities.length > 0
      ? cities.filter((c) => form.municipalities.some((m: CityType) => c.parentId === m.id))
      : cities;

  const roleId = userData?.roleId;
  const isCityAdminRole = roleId === 5;

  const getLocationIds = () => {
    if (isCityAdminRole) {
      return form.cities.map((c: CityType) => c.id);
    }
    if (form.cities.length > 0) {
      return form.cities.map((c: CityType) => c.id);
    }
    if (form.municipalities.length > 0) {
      return form.municipalities.map((m: CityType) => m.id);
    }
    if (form.districts.length > 0) {
      return form.districts.map((d: CityType) => d.id);
    }
    return [];
  };

  const locationIds = getLocationIds();

  useEffect(() => {
    if (isEdit && listingData) {
      const disableDates = listingData.categoryId === 1 && !listingData.expiryDate;
      // Extract districts, municipalities, and cities from listingData
      const allLocations = cityList.filter((city) => listingData.allCities?.includes(city.id));
      setImages([]);
      setPdf(null);
      // Separate into districts, municipalities, and cities
      const listingDistricts = allLocations.filter((c) => c.type === 'district_admin');
      const listingMunicipalities = allLocations.filter((c) => c.type === 'municipality');
      const listingCities = allLocations.filter((c) => c.type === 'city');

      const updatedForm = {
        ...listingData,
        disableDates: disableDates,
        timeless: disableDates,
        districts: listingDistricts,
        municipalities: listingMunicipalities,
        cities: listingCities,
        startDate: listingData.startDate ? dayjs(listingData.startDate) : null,
        expiryDate: listingData.expiryDate ? dayjs(listingData.expiryDate) : null,
        endDate: listingData.endDate ? dayjs(listingData.endDate) : null,
      };

      setForm((prev: any) => ({ ...prev, ...updatedForm }));

      const allImages: FileWithPreview[] = [];

      if (listingData.otherLogos && listingData.otherLogos.length > 0) {
        listingData.otherLogos.forEach((logo) => {
          const imageUrl = `${import.meta.env.VITE_BUCKET_URL}${logo.logo}`;
          allImages.push(createFakeImageFile(imageUrl, `image_${logo.imageOrder}.jpg`));
        });
      }

      if (allImages.length > 0) {
        setPdf(null);
        setImages(allImages);
      }

      // Preload PDF if exists
      if (listingData.pdf) {
        const pdfUrl = `${import.meta.env.VITE_BUCKET_URL}${listingData.pdf}`;
        const fakePdf: FileWithPreview = {
          name: 'existing.pdf',
          size: 0,
          type: 'application/pdf',
          preview: pdfUrl,
          lastModified: new Date().getTime(),
          // @ts-ignore
          arrayBuffer: async () => new ArrayBuffer(0),
          slice: () => new Blob(),
          stream: () => new ReadableStream(),
          text: async () => '',
        };
        setPdf(fakePdf);
        setImages([]);
      }
    }
  }, [isEdit, listingData]);

  const createFakeImageFile = (url: string, name: string): FileWithPreview => {
    return {
      name: name,
      size: 0,
      type: 'image/jpeg',
      preview: url,
      lastModified: new Date().getTime(),
      // @ts-ignore - these are just for TypeScript compliance
      arrayBuffer: async () => new ArrayBuffer(0),
      slice: () => new Blob(),
      stream: () => new ReadableStream(),
      text: async () => '',
    };
  };
  const UploadSection = () => {
    return (
      <Box sx={{ mt: 1 }}>
        <Typography variant="h6" gutterBottom>
          {t('upload.uploadLogo')}
        </Typography>
        <Box sx={{ height: 1, width: 1, borderBottom: 1, borderColor: 'divider', mb: 2 }} />

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t('upload.addFileHere')}
        </Typography>
        <Typography variant="body2" color="success.main" gutterBottom>
          {t('upload.maxFileSizeAllert')} & {t('upload.imageNumberAlertListings')}
        </Typography>

        <Dropzone
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {images && images.length > 0 && !isEdit ? (
            <Grid container spacing={2}>
              {images.map((img, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={img.preview}
                      alt={`upload-${index}`}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
              {images.length < MAX_IMAGES && (
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h1" color="text.secondary">
                      +
                    </Typography>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      hidden
                      onChange={handleMultipleInputChange}
                      multiple
                    />
                  </Button>
                </Grid>
              )}
            </Grid>
          ) : images && images.length > 0 && isEdit ? (
            <Grid container spacing={2}>
              {images.map((img, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={img.preview}
                      alt={`upload-${index}`}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
              {images.length < MAX_IMAGES && (
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h1" color="text.secondary">
                      +
                    </Typography>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      hidden
                      onChange={handleMultipleInputChange}
                      multiple
                    />
                  </Button>
                </Grid>
              )}
            </Grid>
          ) : pdf ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PictureAsPdf color="primary" />
                <Typography>
                  <a href={pdf.preview} target="_blank" rel="noopener noreferrer">
                    {pdf.name}
                  </a>
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={handleRemovePDF}
                startIcon={<DeleteIcon />}
              >
                {t('upload.removeFile')}
              </Button>
            </Box>
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {t('upload.dragAndDropImageOrPDF')}
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 2 }}
              >
                {t('upload.upload')}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  hidden
                  onChange={handleInputChange}
                  multiple
                />
              </Button>
            </>
          )}
        </Dropzone>

        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          {t('upload.imagePdfWarning')}
        </Typography>
      </Box>
    );
  };
  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement> | any) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      const name = e.target.name;

      setForm((prev) => {
        const updatedForm = { ...prev, [key]: value };

        // Handle disableDates/timeless checkbox change
        if (key === 'disableDates' || key === 'timeless') {
          updatedForm.disableDates = value;
          updatedForm.timeless = value; // Keep both in sync
          updatedForm.expiryDate = value ? null : getDefaultEndDate();
        }

        return updatedForm;
      });

      // Clear error when user starts typing
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: '' }));
      }
      validateField();
    };

  const handleDistrictChange = (event: any, newValue: CityType[]) => {
    setForm((prev: any) => ({
      ...prev,
      districts: newValue,
      municipalities: prev.municipalities.filter((m: CityType) =>
        newValue.some((d) => m.parentId === d.id),
      ),
      cities: prev.cities.filter((c: CityType) =>
        newValue.some((d) =>
          prev.municipalities.some((m: CityType) => m.parentId === d.id && c.parentId === m.id),
        ),
      ),
    }));

    // Clear city error when user selects something
    if (errors.cities) {
      setErrors((prev) => ({ ...prev, cities: '' }));
    }
  };

  const handleMunicipalityChange = (event: any, newValue: CityType[]) => {
    setForm((prev: any) => ({
      ...prev,
      municipalities: newValue,
      cities: prev.cities.filter((c: CityType) => newValue.some((m) => c.parentId === m.id)),
    }));

    // Clear city error when user selects something
    if (errors.cities) {
      setErrors((prev) => ({ ...prev, cities: '' }));
    }
  };

  const handleCityChange = (event: any, newValue: CityType[]) => {
    setForm((prev: any) => ({ ...prev, cities: newValue }));

    // Clear city error when user selects something
    if (errors.cities) {
      setErrors((prev) => ({ ...prev, cities: '' }));
    }
  };

  const handleDescriptionChange = (htmlString: string) => {
    setForm((prev) => ({
      ...prev,
      description: htmlString,
    }));

    // Clear description error when user starts typing
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: '' }));
    }
  };

  const validateField = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'invalidEmail';
    }

    if (form.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(form.phone)) {
      newErrors.phone = 'invalidPhone';
    }

    // Website validation (basic URL format)
    if (
      form.website &&
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(form.website)
    ) {
      newErrors.website = 'invalidWebsite';
    }

    setErrors(newErrors);
    setShowFieldErrors(Object.keys(newErrors).length > 0);

    // Hide errors after 5 seconds
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setShowFieldErrors(false), 5000);
    }

    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Title validation
    if (!form.title.trim()) {
      newErrors.title = 'titleRequired';
    } else if (form.title.length > CHARACTER_LIMIT_TITLE) {
      newErrors.title = 'titleLength';
    }

    // Category validation
    if (!form.categoryId) {
      newErrors.categoryId = 'categoryRequired';
    }

    // Description validation
    if (!form.description.trim()) {
      newErrors.description = 'descriptionRequired';
    } else if (form.description.length > CHARACTER_LIMIT_DESCRIPTION) {
      newErrors.description = 'descriptionLength';
    }

    if (isCityAdminRole) {
      if (form.districts.length === 0) {
        newErrors.districts = 'districtRequired';
      }
      if (form.municipalities.length === 0) {
        newErrors.municipalities = 'municipalityRequired';
      }
      if (form.cities.length === 0) {
        newErrors.cities = 'cityRequired';
      }
    } else {
      if (
        form.districts.length === 0 &&
        form.municipalities.length === 0 &&
        form.cities.length === 0
      ) {
        newErrors.cities = 'locationRequired';
      }
    }

    // Event date validation (only when category is Events - 3)
    if (form.categoryId == 3) {
      if (!form.startDate) {
        newErrors.startDate = 'startDateRequired';
      }

      if (form.startDate && form.endDate && dayjs(form.endDate).isBefore(dayjs(form.startDate))) {
        newErrors.endDate = 'endDateBeforeStart';
      }
    }
    if (form.categoryId == 1 && !form.disableDates) {
      if (!form.expiryDate) {
        // If no expiry date and not disabled, set disableDates to true
        setForm((prev) => ({
          ...prev,
          disableDates: true,
          timeless: true,
        }));
      } else if (dayjs(form.expiryDate).isBefore(dayjs(), 'day')) {
        newErrors.expiryDate = 'expiryDatePast';
      }
    }
    if (form.categoryId == 1 && !form.disableDates) {
      if (!form.expiryDate) {
        newErrors.expiryDate = 'expiryDateRequired';
      } else if (dayjs(form.expiryDate).isBefore(dayjs())) {
        newErrors.expiryDate = 'expiryDatePast';
      }
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'invalidEmail';
    }

    if (form.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(form.phone)) {
      newErrors.phone = 'invalidPhone';
    }

    // Website validation (basic URL format)
    if (
      form.website &&
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(form.website)
    ) {
      newErrors.website = 'invalidWebsite';
    }

    setErrors(newErrors);
    setShowFieldErrors(Object.keys(newErrors).length > 0);

    // Hide errors after 5 seconds
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setShowFieldErrors(false), 5000);
    }

    return Object.keys(newErrors).length === 0;
  };
  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const categoryId = e.target.value as string;
    setForm((prev) => ({
      ...prev,
      categoryId,
      subcategoryId: '',
      startDate: null,
      endDate: null,
      expiryDate: categoryId == '1' && !prev.disableDates ? getDefaultEndDate() : null,
    }));
  };
  const handleDate = (key: 'startDate' | 'endDate') => (v: dayjs.Dayjs | null) =>
    setForm((prev) => ({ ...prev, [key]: v }));
  const handleSubcategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setForm((prev) => ({ ...prev, subcategoryId: e.target.value as string }));
  };

  const isFormValid = (): boolean => {
    return (
      form.title.trim() !== '' &&
      form.categoryId !== '' &&
      form.description.trim() !== '' &&
      (form.districts.length > 0 || form.municipalities.length > 0 || form.cities.length > 0)
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare the data for API
      const payload = {
        ...form,
        title: form.title,
        description: form.description,
        categoryId: form.categoryId,
        subcategoryId: form.subcategoryId,
        cityIds: locationIds,
        timeless: form.disableDates,
        disableDates: form.disableDates,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
        expiryDate: form.expiryDate ? new Date(form.expiryDate).toISOString() : null,

        price: form.price,
        originalPrice: form.originalPrice,
        discountedPrice: form.discountedPrice,
        isPaid: form.isPaid,
        address: form.address,
        phone: form.phone,
        email: form.email,
        website: form.website,
      };

      let response;

      if (isEdit && listingId) {
        response = await updateListingMutation.mutateAsync({
          cityIds: locationIds,
          listingsId: listingId,
          newData: payload,
        });
      } else {
        response = await postListingMutation.mutateAsync(payload);
      }
      if (form.removeImage) {
        if (images.length === 0) {
          try {
            await deleteImageMutation.mutateAsync({
              cityIds: cityIds || '',
              listingsId: listingId,
            });
          } catch (error) {
            console.error('Error deleting images:', error);
            setErrorMessage(t('upload.error.imageDeleteFailed'));
            return;
          }
        }
      }
      // Handle image uploads
      if (images.length > 0) {
        const imageFormData = new FormData();

        for (const image of images) {
          // Check if it's a new image (File object) or existing image URL
          if (image instanceof File) {
            // New image - append directly
            imageFormData.append('image', image);
          } else if (typeof image === 'object' && image.preview) {
            // Existing image - fetch and convert to blob
            try {
              const response = await fetch(image.preview);
              const blob = await response.blob();
              const file = new File([blob], image.name, { type: blob.type });
              imageFormData.append('image', file);
            } catch (error) {
              console.error('Error converting existing image:', error);
              continue;
            }
          }
        }
        const finalListingId = response?.[0]?.listingId || listingId || '';
        if (imageFormData.has('image')) {
          try {
            await uploadImageMutation.mutateAsync({
              listingsId: finalListingId,
              cityId: cityIds || '',
              formData: imageFormData,
            });
          } catch (err) {
            console.error('Image upload failed:', err);
            setErrorMessage(t('upload.error.imageUploadFailed'));
            return;
          }
        }
      }

      // Handle PDF upload
      if (pdf && pdf instanceof File) {
        const pdfFormData = new FormData();
        pdfFormData.append('pdf', pdf);

        await uploadPdfMutation.mutateAsync({
          cityIds: cityIds || '',
          listingsId: response[0].listingId || listingId || '',
          formData: pdfFormData,
        });
      }

      setSuccessMessage(isEdit ? t('upload.success.updated') : t('upload.success.created'));
      setIsSuccess(true);

      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting listing:', error);
      setErrorMessage(isEdit ? t('upload.error.updateFailed') : t('upload.error.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleImageFiles = (files: FileList | null) => {
    if (!files || pdf) return; // Block if PDF exists

    const selected = Array.from(files).slice(0, MAX_IMAGES - images.length);
    const mapped = selected.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) }),
    );
    setImages([...images, ...mapped]);
  };

  const handlePdfFile = (file: File | null) => {
    if (!file || images.length > 0) return; // Block if images exist

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(t('upload.error.pdfTooLarge', { size: MAX_FILE_SIZE_MB }));
      return;
    }

    const preview = URL.createObjectURL(file);
    setPdf(Object.assign(file, { preview }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const MAX_IMAGE_SIZE_MB = 20;
    let hasImage = false;
    let hasPdf = false;

    if (!fileList) return;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        return t('maxFileSizeAllert');
      }

      if (file.type.startsWith('image/')) {
        hasImage = true;
        setPdf(null);
      } else if (file.type === 'application/pdf') {
        hasPdf = true;
        setImages([]);
      }
    }

    if (hasImage && hasPdf) {
      alert(t('upload.imagePdfWarning'));
      return;
    }

    const filesArray = Array.from(fileList);

    if (hasImage) {
      setLocalImageOrPdf(true);
      setImages(
        filesArray.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      );
      setForm((prev) => ({
        ...prev,
        hasAttachment: false,
      }));
    }

    if (hasPdf) {
      setLocalImageOrPdf(true);
      setPdf(Object.assign(filesArray[0], { preview: URL.createObjectURL(filesArray[0]) }));
      setForm((prev) => ({
        ...prev,
        hasAttachment: true,
      }));
    }
  };

  const handleMultipleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    if (images.length > 0) {
      const validImages = newFiles.filter((file) => file.type.startsWith('image/'));
      const invalidFiles = newFiles.filter((file) => !file.type.startsWith('image/'));
      setPdf(null);
      if (invalidFiles.length > 0) {
        alert(t('upload.imagePdfWarning'));
      } else {
        const totalImages = images.length + validImages.length;

        if (totalImages > MAX_IMAGES) {
          alert(t('listingImageNumberAlert', { limit: MAX_IMAGES }));
        } else {
          setImages((prev) => [
            ...prev,
            ...validImages.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) }),
            ),
          ]);
        }
      }
    } else {
      newFiles.forEach((file) => {
        if (file.type === 'application/pdf') {
          setLocalImageOrPdf(true);
          setPdf(Object.assign(file, { preview: URL.createObjectURL(file) }));
          setForm((prev) => ({
            ...prev,
            hasAttachment: true,
          }));
        } else if (file.type.startsWith('image/')) {
          setImages((prev) => [
            ...prev,
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ]);
        }
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (listingId) {
      setForm((prev) => ({
        ...prev,
        removeImage: true,
        logo: null,
      }));
    }
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleRemovePDF = () => {
    if (listingId) {
      setForm((prev) => ({
        ...prev,
        removePdf: true,
        pdf: null,
      }));
    }
    if (pdf) {
      URL.revokeObjectURL(pdf.preview);
    }
    setPdf(null);
    setForm((prev) => ({
      ...prev,
      hasAttachment: true,
    }));
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handleImageFiles(e.dataTransfer.files);
        setLocalImageOrPdf(true);
        setForm((prev) => ({
          ...prev,

          hasAttachment: true,
        }));
      } else if (file.type === 'application/pdf') {
        handlePdfFile(file);

        setForm((prev) => ({
          ...prev,

          hasAttachment: true,
        }));
      }
    }
  };
  const getDefaultEndDate = () => {
    const now = new Date();
    const twoWeeksLater = new Date(now.getTime() + 2 * 7 * 24 * 60 * 60 * 1000);
    return dayjs(twoWeeksLater);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 900, mx: 'auto', backgroundColor: '#fff' }}>
      <Typography variant="h5" mb={3}>
        {isEdit ? t('upload.updateListing') : t('upload.createListing')}
      </Typography>

      <form onSubmit={submit} noValidate>
        <Grid container spacing={2}>
          {/* Title Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('upload.title')}
              name="title"
              value={form.title}
              onChange={(e) => {
                handleChange('title')(e);
                // Update character count immediately
                setForm((prev) => ({ ...prev, title: e.target.value }));
              }}
              variant="outlined"
              error={showFieldErrors && !!errors.title}
              helperText={showFieldErrors && t(`upload.error.${errors.title}`)}
              InputLabelProps={{ shrink: true, sx: { fontSize: '1.1rem' } }}
              inputProps={{
                style: { padding: '10px 12px', fontSize: '1rem' },
                maxLength: CHARACTER_LIMIT_TITLE,
              }}
              FormHelperTextProps={{
                sx: {
                  color: 'error.main',
                  visibility: showFieldErrors && errors.title ? 'visible' : 'hidden',
                  height: showFieldErrors && errors.title ? 'auto' : 0,
                  margin: showFieldErrors && errors.title ? '4px 0 0' : 0,
                },
              }}
            />
            <Typography variant="caption" display="block" textAlign="right" mt={0.5}>
              {form.title.length}/{CHARACTER_LIMIT_TITLE}
            </Typography>
          </Grid>

          {/* Category Field */}
          <Grid item xs={12}>
            <FormControl
              fullWidth
              variant="outlined"
              error={showFieldErrors && !!errors.categoryId}
            >
              <InputLabel shrink sx={{ fontSize: '1.1rem' }}>
                {t('upload.category')}
              </InputLabel>
              <Select
                label={t('upload.category')}
                value={form.categoryId}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ style: { padding: '10px 12px' } }}
              >
                <MenuItem value="">
                  <em>{t('upload.select')}</em>
                </MenuItem>
                {categoriesDetails.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {showFieldErrors && errors.categoryId && (
                <Typography variant="caption" color="error" display="block" mt={0.5}>
                  {/* {errors.categoryId} */}
                  {t(`upload.error.${errors.categoryId}`)}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Subcategory Field (conditionally shown) */}
          {form.categoryId == 1 && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink sx={{ fontSize: '1.1rem' }}>
                  {t('upload.subcategory')}
                </InputLabel>
                <Select
                  label={t('upload.subcategory')}
                  value={form.subcategoryId}
                  onChange={handleSubcategoryChange}
                  displayEmpty
                  inputProps={{ style: { padding: '10px 12px' } }}
                >
                  <MenuItem value="">
                    <em>{t('upload.select')}</em>
                  </MenuItem>
                  {subcategories?.map((subcat) => (
                    <MenuItem key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* Location Selectors */}
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={districts}
              getOptionLabel={(option) => option.name}
              value={form.districts}
              onChange={handleDistrictChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('upload.districts')}
                  variant="outlined"
                  error={showFieldErrors && !!errors.municipalities}
                  helperText={
                    showFieldErrors && errors.municipalities
                      ? t(`upload.error.${errors.municipalities}`)
                      : ''
                  }
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                ))
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={filteredMunicipalities}
              getOptionLabel={(option) => option.name}
              value={form.municipalities}
              onChange={handleMunicipalityChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`${t('upload.municipalities')} ${isCityAdminRole ? '*' : ''}`}
                  variant="outlined"
                  error={showFieldErrors && !!errors.districts}
                  helperText={
                    showFieldErrors && errors.districts ? t(`upload.error.${errors.districts}`) : ''
                  }
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                ))
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={filteredCities}
              getOptionLabel={(option) => option.name}
              value={form.cities}
              onChange={handleCityChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`${t('upload.cities')} ${isCityAdminRole ? '*' : ''}`}
                  variant="outlined"
                  error={showFieldErrors && !!errors.cities}
                  helperText={
                    showFieldErrors && errors.cities ? t(`upload.error.${errors.cities}`) : ''
                  }
                  FormHelperTextProps={{
                    sx: {
                      color: 'error.main',
                      visibility: showFieldErrors && errors.cities ? 'visible' : 'hidden',
                      height: showFieldErrors && errors.cities ? 'auto' : 0,
                      margin: showFieldErrors && errors.cities ? '4px 0 0' : 0,
                    },
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                ))
              }
            />
          </Grid>

          {/* Event Date Fields (conditionally shown) */}
          {form.categoryId == 3 && (
            <>
              <Grid item xs={6}>
                <DateTimePicker
                  label={t('upload.eventStartDate')}
                  value={form.startDate}
                  onChange={handleDate('startDate')}
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  slots={{
                    actionBar: CustomActionBar,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: showFieldErrors && !!errors.startDate,
                      helperText:
                        showFieldErrors && errors.startDate
                          ? t(`upload.error.${errors.startDate}`)
                          : '',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  label={t('upload.eventEndDate')}
                  value={form.endDate}
                  onChange={handleDate('endDate')}
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  slots={{
                    actionBar: CustomActionBar,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: showFieldErrors && !!errors.endDate,
                      helperText:
                        showFieldErrors && errors.endDate
                          ? t(`upload.error.${errors.endDate}`)
                          : '',
                    },
                  }}
                />
              </Grid>
            </>
          )}

          {/* Expiry Date Field (conditionally shown) */}
          {form.categoryId === 1 && (
            <>
              {/* Show message when dates are disabled */}
              {form.disableDates && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    {t('upload.noExpiryMessage')}
                  </Typography>
                </Grid>
              )}

              {/* Show date picker when dates are enabled */}
              {!form.disableDates && (
                <Grid item xs={12}>
                  <DateTimePicker
                    label={t('upload.expiryDate')}
                    value={form.expiryDate}
                    onChange={(newValue) => {
                      setForm((prev) => ({
                        ...prev,
                        expiryDate: newValue,
                        disableDates: false,
                        timeless: false,
                      }));
                      if (errors.expiryDate) {
                        setErrors((prev) => ({ ...prev, expiryDate: '' }));
                      }
                    }}
                    ampm={false}
                    inputFormat="DD/MM/YYYY HH:mm"
                    slots={{
                      actionBar: CustomActionBar,
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: showFieldErrors && !!errors.expiryDate,
                        helperText:
                          showFieldErrors && errors.expiryDate
                            ? t(`upload.error.${errors.expiryDate}`)
                            : '',
                      },
                    }}
                  />
                </Grid>
              )}

              {/* Disable Dates Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.disableDates}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((prev) => ({
                          ...prev,
                          disableDates: checked,
                          timeless: checked,
                          expiryDate: checked ? null : prev.expiryDate || getDefaultEndDate(),
                        }));
                      }}
                      name="disableDates"
                    />
                  }
                  label={t('upload.disableDates')}
                />
              </Grid>
            </>
          )}

          {/* Address Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('upload.streetAddress')}
              name="address"
              value={form.address}
              onChange={handleChange('address')}
              variant="outlined"
            />
          </Grid>

          {/* Price Fields (conditionally shown) */}
          {(form.categoryId == 12 || form.categoryId == 5) && (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={t('upload.originalPrice')}
                  name="originalPrice"
                  value={form.originalPrice}
                  onChange={handleChange('originalPrice')}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={t('upload.discountedPrice')}
                  name="discountedPrice"
                  value={form.discountedPrice}
                  onChange={handleChange('discountedPrice')}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('upload.telephone')}
              name="phone"
              value={form.phone}
              onChange={handleChange('phone')}
              variant="outlined"
              error={showFieldErrors && !!errors.phone}
              helperText={showFieldErrors && errors.phone ? t(`upload.error.${errors.phone}`) : ''}
              FormHelperTextProps={{
                sx: {
                  color: 'error.main',
                  visibility: showFieldErrors && errors.phone ? 'visible' : 'hidden',
                  height: showFieldErrors && errors.phone ? 'auto' : 0,
                  margin: showFieldErrors && errors.phone ? '4px 0 0' : 0,
                },
              }}
              inputProps={{
                inputMode: 'tel',
                pattern: '[+]?[0-9]{10,15}',
              }}
            />
          </Grid>

          {/* Email Field */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('upload.email')}
              name="email"
              value={form.email}
              onChange={handleChange('email')}
              type="email"
              variant="outlined"
              error={showFieldErrors && !!errors.email}
              helperText={showFieldErrors && errors.email ? t(`upload.error.${errors.email}`) : ''}
              FormHelperTextProps={{
                sx: {
                  color: 'error.main',
                  visibility: showFieldErrors && errors.email ? 'visible' : 'hidden',
                  height: showFieldErrors && errors.email ? 'auto' : 0,
                  margin: showFieldErrors && errors.email ? '4px 0 0' : 0,
                },
              }}
            />
          </Grid>

          {/* Website Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('upload.website')}
              name="website"
              value={form.website}
              onChange={handleChange('website')}
              variant="outlined"
              error={showFieldErrors && !!errors.website}
              helperText={
                showFieldErrors && errors.website ? t(`upload.error.${errors.website}`) : ''
              }
              FormHelperTextProps={{
                sx: {
                  color: 'error.main',
                  visibility: showFieldErrors && errors.website ? 'visible' : 'hidden',
                  height: showFieldErrors && errors.website ? 'auto' : 0,
                  margin: showFieldErrors && errors.website ? '4px 0 0' : 0,
                },
              }}
              inputProps={{
                inputMode: 'url',
                pattern: 'https?://.+',
              }}
            />
          </Grid>
          {/* Description Field */}
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={showFieldErrors && !!errors.description}
              sx={{ mt: 1, mb: 2 }}
            >
              <InputLabel
                shrink
                sx={{
                  position: 'absolute',
                  top: form.description?.length > 0 ? 0 : '0px',
                  left: '1px',
                  fontSize: form.description?.length > 0 ? '0.75rem' : '1rem',
                  transformOrigin: 'top left',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: '#fff',
                  px: 0.5,
                  zIndex: 1,
                }}
              >
                {t('upload.description')}
              </InputLabel>
              <RichTextEditor
                value={form.description}
                onChange={(htmlString) => {
                  setForm((prev) => ({ ...prev, description: htmlString }));
                }}
                error={showFieldErrors && !!errors.description}
                helperText={
                  showFieldErrors && errors.description
                    ? t(`upload.error.${errors.description}`)
                    : ''
                }
              />
              {showFieldErrors && errors.description && (
                <Typography variant="caption" color="error" display="block" mt={0.5}>
                  {t(`upload.error.${errors.description}`)}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Upload Section */}
          <Grid item xs={12}>
            <UploadSection />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || !isFormValid()}
            >
              {loading
                ? t('upload.processing')
                : isEdit
                  ? t('upload.updateListing')
                  : t('upload.createListing')}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setIsSuccess(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UploadListings;
