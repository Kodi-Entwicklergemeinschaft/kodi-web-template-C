import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Switch,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import useCities, {
  useGetCity,
  useUpdateCity,
  useGetCityAdmins,
  useAssignCityAdmin,
  useRemoveCityAdmin,
  useCreateCityAdmin,
  useInviteUser,
  useGetInvitedUsers,
} from '../hooks/useCityServices';
import { STORAGE_KEYS } from '../utilities/constants';
import { useTranslation } from 'react-i18next';
import humanIcon from '../assets/human-icon.png';
import { useGetUsers } from '../hooks/useUserServices';
import useGetUserDetails from '../hooks/useGetUser';
import { Autocomplete } from '@mui/material';

interface CityData {
  id: number;
  name: string;
  type: 'district_admin' | 'municipality' | 'city';
  image: string;
  description: string;
  subtitle: string;
  latitude: string;
  longitude: string;
  openUntil: string;
  isActive: number;
  parentId: number;
  mayor_name?: string | null;
  mayor_description?: string | null;
  mayor_image?: string | null;
}

const CityTable: React.FC = () => {
  const { cityList } = useCities();
  const { userList = [] } = useGetUsers();
  const { t } = useTranslation();
  const { mutate: updateCity, isPending: isUpdating } = useUpdateCity();
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) ?? '';
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [mayorImageFile, setMayorImageFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [mayorImagePreview, setMayorImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CityData>>({});
  const [originalData, setOriginalData] = useState<Partial<CityData>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [editMode, setEditMode] = useState({
    logo: false,
    description: false,
    subtitle: false,
    mayorName: false,
    mayorDescription: false,
    mayorImage: false,
  });
  const [tempDescription, setTempDescription] = useState('');
  const [tempSubtitle, setTempSubtitle] = useState('');
  const [tempMayorName, setTempMayorName] = useState('');
  const [tempMayorDescription, setTempMayorDescription] = useState('');
  const [viewDialog, setViewDialog] = useState({
    open: false,
    content: '',
    title: '',
  });
  const [tabValue, setTabValue] = useState(0);
  const [mayorNameDialog, setMayorNameDialog] = useState({
    open: false,
    name: '',
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [createAdminModal, setCreateAdminModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const selectedItemId = selectedCity || selectedMunicipality || selectedDistrict;
  const {
    data: cityDetails,
    isLoading: isLoadingDetails,
    refetch: refetchCity,
  } = useGetCity(selectedItemId || 0);

  const districts = cityList.filter((city) => city.type === 'district_admin');
  const municipalities = cityList.filter((city) => city.type === 'municipality');
  const cities = cityList.filter((city) => city.type === 'city');

  const filteredMunicipalities = selectedDistrict
    ? municipalities.filter((m) => m.parentId === selectedDistrict)
    : [];

  const filteredCities = selectedMunicipality
    ? cities.filter((c) => c.parentId === selectedMunicipality)
    : [];

  const { data: cityAdmins = [] } = useGetCityAdmins(selectedCity || 0);
  const { mutate: assignAdmin } = useAssignCityAdmin();
  const { mutate: removeAdmin } = useRemoveCityAdmin();
  const { mutate: createCityAdmin, isPending: creatingAdmin } = useCreateCityAdmin();
  const { userData } = useGetUserDetails();
  const { mutate: inviteUser, isPending: inviting } = useInviteUser();
  const { data: invitedUsers = [], isLoading: invitedLoading } = useGetInvitedUsers(
    createAdminModal,
    selectedCity ?? undefined,
  );

  const selectedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE_SELECTED);
  const language = selectedLang === 'en' ? 'en' : 'de';

  const isRoleCityAdmin = userData?.roleId === 5;
  const canViewDetails = isRoleCityAdmin
    ? !!selectedDistrict && !!selectedMunicipality && !!selectedCity
    : !!selectedItemId;

  const roleMap: Record<number, string> = {
    1: t('roles.superAdmin'),
    3: t('roles.citizen'),
    5: t('roles.cityAdmin'),
  };
  useEffect(() => {
    if (cityDetails) {
      setFormData({
        ...cityDetails,
        description: cityDetails.description || '',
        subtitle: cityDetails.subtitle || '',
        mayor_description: cityDetails.mayor_description || '',
        mayor_name: cityDetails.mayor_name || '',
        mayor_image: cityDetails.mayor_image || '',
      });
      setOriginalData({
        ...cityDetails,
        description: cityDetails.description || '',
        subtitle: cityDetails.subtitle || '',
        mayor_description: cityDetails.mayor_description || '',
        mayor_name: cityDetails.mayor_name || '',
        mayor_image: cityDetails.mayor_image || '',
      });
      setLogoPreview(cityDetails.image || null);
      setMayorImagePreview(cityDetails.mayor_image || null);
    }
  }, [cityDetails]);

  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreview);
      }
      if (mayorImagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(mayorImagePreview);
      }
    };
  }, [logoPreview, mayorImagePreview]);

  useEffect(() => {
    if (selectedUserId) {
      const selectedUser = userList.find((u) => u.id === selectedUserId);
      if (selectedUser) {
        setAdminUsername(selectedUser.username);
        setAdminEmail(selectedUser.email);
      }
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (!selectedCity && tabValue === 2) {
      setTabValue(0);
    }
  }, [selectedCity]);

  const handleShowDetailsClick = () => {
    if (!canViewDetails) return;

    setShowDetails(!showDetails);
    setTabValue(0);
  };

  const handleOpenMayorNameDialog = () => {
    setMayorNameDialog({
      open: true,
      name: formData.mayor_name || '',
    });
  };

  const handleCloseMayorNameDialog = () => {
    setMayorNameDialog({
      open: false,
      name: '',
    });
  };

  const handleSaveMayorName = () => {
    setFormData((prev) => ({ ...prev, mayor_name: mayorNameDialog.name }));
    handleCloseMayorNameDialog();
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleMayorImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setMayorImageFile(file);
      setMayorImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditField = (
    field: 'description' | 'subtitle' | 'mayorName' | 'mayorDescription',
  ) => {
    switch (field) {
      case 'description':
        setTempDescription(formData.description || '');
        setEditMode((prev) => ({ ...prev, description: true }));
        break;
      case 'subtitle':
        setTempSubtitle(formData.subtitle || '');
        setEditMode((prev) => ({ ...prev, subtitle: true }));
        break;
      case 'mayorName':
        setTempMayorName(formData.mayor_name || '');
        setEditMode((prev) => ({ ...prev, mayorName: true }));
        break;
      case 'mayorDescription':
        setTempMayorDescription(formData.mayor_description || '');
        setEditMode((prev) => ({ ...prev, mayorDescription: true }));
        break;
    }
  };

  const handleViewField = (field: 'description' | 'subtitle' | 'mayorDescription') => {
    setViewDialog({
      open: true,
      content:
        field === 'description'
          ? formData.description || ''
          : field === 'subtitle'
            ? formData.subtitle || ''
            : formData.mayor_description || '',
      title:
        field === 'description'
          ? 'Description'
          : field === 'subtitle'
            ? 'Subtitle'
            : 'Mayor Description',
    });
  };

  const handleSaveField = (
    field: 'description' | 'subtitle' | 'mayorName' | 'mayorDescription',
  ) => {
    switch (field) {
      case 'description':
        setFormData((prev) => ({ ...prev, description: tempDescription }));
        setEditMode((prev) => ({ ...prev, description: false }));
        break;
      case 'subtitle':
        setFormData((prev) => ({ ...prev, subtitle: tempSubtitle }));
        setEditMode((prev) => ({ ...prev, subtitle: false }));
        break;
      case 'mayorName':
        setFormData((prev) => ({ ...prev, mayor_name: tempMayorName }));
        setEditMode((prev) => ({ ...prev, mayorName: false }));
        break;
      case 'mayorDescription':
        setFormData((prev) => ({ ...prev, mayor_description: tempMayorDescription }));
        setEditMode((prev) => ({ ...prev, mayorDescription: false }));
        break;
    }
  };

  const handleCancelEdit = (
    field: 'description' | 'subtitle' | 'mayorName' | 'mayorDescription',
  ) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
  };

  const hasChanges = () =>
    formData.description !== originalData.description ||
    formData.subtitle !== originalData.subtitle ||
    formData.mayor_name !== originalData.mayor_name ||
    formData.mayor_description !== originalData.mayor_description ||
    logoFile !== null ||
    mayorImageFile !== null;

  const handleSaveCityAdmin = () => {
    if (!selectedItemId || !selectedUserId) return;

    assignAdmin(
      { cityId: selectedItemId, userId: selectedUserId },
      {
        onSuccess: (response: any) => {
          setSnackbar({
            open: true,
            message: response?.message || response?.data?.message || 'Success',
            severity: 'success',
          });
          setSelectedUserId(null);
          setAdminUsername('');
          setAdminEmail('');
        },
        onError: (error: any) => {
          setSnackbar({
            open: true,
            message: error?.response?.data?.message || error?.message || 'Something went wrong',
            severity: 'error',
          });
        },
      },
    );
  };

  const handleDeleteAdmin = (userId: number) => {
    if (!selectedItemId) return;

    removeAdmin(
      { cityId: selectedItemId, userId },
      {
        onSuccess: (response: any) => {
          setSnackbar({
            open: true,
            message: response?.message || response?.data?.message || 'Success',
            severity: 'success',
          });
        },
        onError: (error: any) => {
          setSnackbar({
            open: true,
            message: error?.response?.data?.message || error?.message || 'Something went wrong',
            severity: 'error',
          });
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) return;

    const formDataToSend = new FormData();
    formDataToSend.append('userId', userId);

    if (formData.description !== originalData.description) {
      formDataToSend.append('description', formData.description || '');
    }
    if (formData.subtitle !== originalData.subtitle) {
      formDataToSend.append('subtitle', formData.subtitle || '');
    }
    if (formData.mayor_name !== originalData.mayor_name) {
      formDataToSend.append('mayor_name', formData.mayor_name || '');
    }
    if (formData.mayor_description !== originalData.mayor_description) {
      formDataToSend.append('mayor_description', formData.mayor_description || '');
    }
    if (logoFile) {
      formDataToSend.append('city_image', logoFile);
    }
    if (mayorImageFile) {
      formDataToSend.append('mayor_image', mayorImageFile);
    }

    updateCity(
      { id: formData.id, cityData: formDataToSend },
      {
        onSuccess: () => {
          setSnackbar({ open: true, message: 'City updated successfully!', severity: 'success' });
          setEditMode({
            logo: false,
            description: false,
            subtitle: false,
            mayorName: false,
            mayorDescription: false,
            mayorImage: false,
          });
          setLogoFile(null);
          setMayorImageFile(null);
          refetchCity();
        },
        onError: () => {
          setSnackbar({ open: true, message: 'Failed to update city', severity: 'error' });
        },
      },
    );
  };

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const renderCityDetails = () => (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '90%', lg: '1200px' },
            backgroundColor: '#fff',
            borderRadius: 2,
            p: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxHeight: 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isLoadingDetails ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="h6" mb={2}>
                {t('citytable.cityDetails')}
              </Typography>

              <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', gap: 3 }}>
                {/* Left Column - Image */}
                <Box
                  sx={{
                    width: '35%',
                    height: '100%',
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={
                      logoPreview?.startsWith('blob:') || logoPreview?.startsWith('data:')
                        ? logoPreview
                        : `${import.meta.env.VITE_BUCKET_URL}${logoPreview}`
                    }
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#f5f5f5',
                    }}
                    alt="City logo"
                  />

                  {/* Image controls overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      display: 'flex',
                      gap: 1,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: 1,
                      p: 0.5,
                    }}
                  >
                    <IconButton
                      onClick={() => setEditMode((prev) => ({ ...prev, logo: !prev.logo }))}
                      sx={{ color: 'white' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    {editMode.logo && (
                      <Button
                        component="label"
                        variant="contained"
                        size="small"
                        startIcon={<CloudUploadIcon fontSize="small" />}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                      >
                        Upload
                        <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
                      </Button>
                    )}
                  </Box>
                </Box>

                {/* Right Column - Details */}
                <Box
                  sx={{
                    width: '65%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflow: 'hidden',
                  }}
                >
                  {/* Top row - Name and Status */}
                  <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
                    <TextField
                      label={t('citytable.name')}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                        sx: { backgroundColor: 'action.hover' },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.name || ''}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label={t('citytable.status')}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                        sx: { backgroundColor: 'action.hover' },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.isActive ? t('citytable.active') : t('citytable.inactive')}
                      sx={{ flex: 1 }}
                    />
                  </Box>

                  {/* Middle row - Coordinates */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label={t('citytable.latitude')}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                        sx: { backgroundColor: 'action.hover' },
                      }}
                      value={formData.latitude || ''}
                    />
                    <TextField
                      label={t('citytable.longitude')}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                        sx: { backgroundColor: 'action.hover' },
                      }}
                      value={formData.longitude || ''}
                    />
                  </Box>

                  {/* Subtitle */}
                  <Box
                    sx={{
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        fontWeight: 500,
                        position: 'relative',
                        pr: 4,
                      }}
                    >
                      {t('citytable.subtitle')}
                      <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <IconButton
                          onClick={() => handleEditField('subtitle')}
                          sx={{ color: 'text.secondary' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleViewField('subtitle')}
                          sx={{ color: 'text.secondary' }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      whiteSpace="pre-line"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {formData.subtitle || ''}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Box
                    sx={{
                      flex: 1,
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        fontWeight: 500,
                        position: 'relative',
                        pr: 4,
                      }}
                    >
                      {t('citytable.description')}
                      <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <IconButton
                          onClick={() => handleEditField('description')}
                          sx={{ color: 'text.secondary' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleViewField('description')}
                          sx={{ color: 'text.secondary' }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      whiteSpace="pre-line"
                      sx={{
                        height: 'calc(100% - 40px)',
                        overflow: 'auto',
                        pr: 1,
                      }}
                    >
                      {formData.description || ''}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Action buttons */}
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setShowDetails(false)}
                  sx={{ minWidth: 120 }}
                >
                  {t('citytable.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isUpdating || !hasChanges()}
                  sx={{ minWidth: 120 }}
                >
                  {isUpdating ? <CircularProgress size={24} /> : t('citytable.saveChanges')}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );

  const renderMayorDetails = () => (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '90%', lg: '1200px' },
            backgroundColor: '#fff',
            borderRadius: 2,
            p: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxHeight: '70vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isLoadingDetails ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="h6" mb={2}>
                {t('citytable.mayorDetails')}
              </Typography>

              <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', gap: 3 }}>
                {/* Left Column - Mayor Image */}
                <Box
                  sx={{
                    width: '35%',
                    height: '100%',
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={
                      mayorImagePreview?.startsWith('blob:') ||
                      mayorImagePreview?.startsWith('data:')
                        ? mayorImagePreview
                        : mayorImagePreview
                          ? `${import.meta.env.VITE_BUCKET_URL}${mayorImagePreview}`
                          : humanIcon
                    }
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#f5f5f5',
                    }}
                    alt="Mayor"
                  />

                  {/* Image controls overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      display: 'flex',
                      gap: 1,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: 1,
                      p: 0.5,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        setEditMode((prev) => ({ ...prev, mayorImage: !prev.mayorImage }))
                      }
                      sx={{ color: 'white' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    {editMode.mayorImage && (
                      <Button
                        component="label"
                        variant="contained"
                        size="small"
                        startIcon={<CloudUploadIcon fontSize="small" />}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleMayorImageChange}
                        />
                      </Button>
                    )}
                  </Box>
                </Box>

                {/* Right Column - Mayor Details */}
                <Box
                  sx={{
                    width: '65%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflow: 'hidden',
                  }}
                >
                  {/* Mayor Name */}
                  <Box
                    sx={{
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        fontWeight: 500,
                        position: 'relative',
                        pr: 4,
                      }}
                    >
                      {t('citytable.mayorName')}
                      <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <IconButton
                          onClick={handleOpenMayorNameDialog}
                          sx={{ color: 'text.secondary' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Typography>
                    <Typography variant="body1">{formData.mayor_name}</Typography>
                  </Box>

                  {/* Mayor Description */}
                  <Box
                    sx={{
                      flex: 1,
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        fontWeight: 500,
                        position: 'relative',
                        pr: 4,
                      }}
                    >
                      {t('citytable.mayorDescription')}
                      <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <IconButton
                          onClick={() => handleEditField('mayorDescription')}
                          sx={{ color: 'text.secondary' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleViewField('mayorDescription')}
                          sx={{ color: 'text.secondary' }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      whiteSpace="pre-line"
                      sx={{
                        height: 'calc(100% - 40px)',
                        overflow: 'auto',
                        pr: 1,
                      }}
                    >
                      {formData.mayor_description}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Action buttons */}
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setShowDetails(false)}
                  sx={{ minWidth: 120 }}
                >
                  {t('citytable.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isUpdating || !hasChanges()}
                  sx={{ minWidth: 120 }}
                >
                  {isUpdating ? <CircularProgress size={24} /> : t('citytable.saveChanges')}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
  const renderCityAdmin = () => (
    <Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" mb={2}>
          {t('citytable.cityAdminSectionTitle')}
        </Typography>

        <TextField
          label={t('citytable.cityName')}
          fullWidth
          value={formData.name || ''}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          sx={{ mb: 2 }}
          disabled={!selectedCity}
          onClick={() => setCreateAdminModal(true)}
        >
          {t('citytable.createCityAdmin')}
        </Button>

        <Typography variant="subtitle1" mb={2}>
          {t('citytable.addNewAdmin')}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Autocomplete
              options={userList}
              getOptionLabel={(option) => option.username}
              value={userList.find((u) => u.id === selectedUserId) || null}
              onChange={(_, newValue) => setSelectedUserId(newValue?.id || null)}
              renderInput={(params) => (
                <TextField {...params} label={t('citytable.selectUser')} fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label={t('citytable.username')}
              value={adminUsername}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label={t('citytable.email')}
              value={adminEmail}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
          onClick={handleSaveCityAdmin}
          disabled={!selectedUserId}
        >
          {t('citytable.saveAdmin')}
        </Button>
      </Box>

      <Box
        sx={{
          mt: 4,
          backgroundColor: '#fff',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="subtitle1" mb={2}>
          {t('citytable.administratorDetails')}
        </Typography>

        {cityAdmins.length === 0 ? (
          <Typography color="text.secondary" textAlign="center">
            {t('citytable.noAdminsAssigned')}
          </Typography>
        ) : (
          cityAdmins.map((admin: any) => (
            <Box
              key={admin.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee',
                py: 1,
              }}
            >
              <Box>
                <Typography>{admin.username}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {admin.email}
                </Typography>
              </Box>

              <Button color="error" onClick={() => handleDeleteAdmin(admin.id)}>
                {t('citytable.delete')}
              </Button>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );

  return (
    <Box>
      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2">{t('citytable.district')}</Typography>
          <TextField
            select
            fullWidth
            variant="outlined"
            SelectProps={{ native: true }}
            value={selectedDistrict || ''}
            onChange={(e) => {
              const value = parseInt(e.target.value) || null;
              setSelectedDistrict(value);
              setSelectedMunicipality(null);
              setSelectedCity(null);
              setShowDetails(false);
            }}
          >
            <option value="">{t('citytable.selectDistrict')}</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2">{t('citytable.municipality')}</Typography>
          <TextField
            select
            fullWidth
            variant="outlined"
            SelectProps={{ native: true }}
            disabled={!selectedDistrict}
            value={selectedMunicipality || ''}
            onChange={(e) => {
              const value = parseInt(e.target.value) || null;
              setSelectedMunicipality(value);
              setSelectedCity(null);
              setShowDetails(false);
            }}
          >
            <option value="">{t('citytable.selectMunicipality')}</option>
            {filteredMunicipalities.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2">{t('citytable.city')}</Typography>
          <TextField
            select
            fullWidth
            variant="outlined"
            SelectProps={{ native: true }}
            disabled={!selectedMunicipality}
            value={selectedCity || ''}
            onChange={(e) => {
              const value = parseInt(e.target.value) || null;
              setSelectedCity(value);
              setShowDetails(false);
            }}
          >
            <option value="">{t('citytable.selectCity')}</option>
            {filteredCities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Button variant="outlined" onClick={handleShowDetailsClick} disabled={!canViewDetails}>
        {showDetails ? t('citytable.hideDetails') : t('citytable.showDetails')}
      </Button>

      {showDetails && (
        <Box mt={3}>
          {/* Tabs */}
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label={t('citytable.cityDetails')} />
            <Tab label={t('citytable.mayorDetails')} />
            {selectedCity && userData?.roleId === 1 && <Tab label={t('citytable.cityAdmin')} />}
          </Tabs>

          {/* Content based on selected tab */}
          {tabValue === 0 && renderCityDetails()}
          {tabValue === 1 && renderMayorDetails()}
          {tabValue === 2 && selectedCity && userData?.roleId === 1 && renderCityAdmin()}
        </Box>
      )}

      {/* Edit Dialogs */}
      <Dialog
        open={editMode.description || editMode.subtitle || editMode.mayorDescription}
        onClose={() => {
          if (editMode.description) handleCancelEdit('description');
          else if (editMode.subtitle) handleCancelEdit('subtitle');
          else if (editMode.mayorDescription) handleCancelEdit('mayorDescription');
        }}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            height: '80vh',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#18204f',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '16px 24px',
          }}
        >
          {t('citytable.edit')}{' '}
          {editMode.description
            ? t('citytable.description')
            : editMode.subtitle
              ? t('citytable.subtitle')
              : t('citytable.mayorDescription')}
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: '#ffffff' }}>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            multiline
            rows={20}
            variant="outlined"
            value={
              editMode.description
                ? tempDescription
                : editMode.subtitle
                  ? tempSubtitle
                  : tempMayorDescription
            }
            onChange={(e) => {
              if (editMode.description) setTempDescription(e.target.value);
              else if (editMode.subtitle) setTempSubtitle(e.target.value);
              else if (editMode.mayorDescription) setTempMayorDescription(e.target.value);
            }}
            sx={{
              '& .MuiInputBase-root': {
                alignItems: 'flex-start',
              },
              '& textarea': {
                height: '100% !important',
              },
              height: '100%',
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '16px 24px',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button
            onClick={() => {
              if (editMode.description) handleCancelEdit('description');
              else if (editMode.subtitle) handleCancelEdit('subtitle');
              else if (editMode.mayorDescription) handleCancelEdit('mayorDescription');
            }}
            sx={{
              backgroundColor: '#f44336',
              color: 'white',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              marginRight: '8px',
            }}
          >
            {t('citytable.cancel')}
          </Button>
          <Button
            onClick={() => {
              if (editMode.description) handleSaveField('description');
              else if (editMode.subtitle) handleSaveField('subtitle');
              else if (editMode.mayorDescription) handleSaveField('mayorDescription');
            }}
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
          >
            {t('citytable.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={createAdminModal}
        onClose={() => setCreateAdminModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>{t('citytable.inviteCityAdmin')}</DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label={t('citytable.adminEmail')}
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />

            <Button
              variant="contained"
              disabled={!newAdminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAdminEmail)}
              onClick={() => {
                if (!selectedCity) {
                  setSnackbar({
                    open: true,
                    message: 'Please select a city',
                    severity: 'warning',
                  });
                  return;
                }

                inviteUser(
                  {
                    email: newAdminEmail,
                    roleId: 5,
                    cityIds: [selectedCity],
                    language,
                  },
                  {
                    onSuccess: (response: any) => {
                      setSnackbar({
                        open: true,
                        message: response?.message || response?.data?.message || 'Success',
                        severity: 'success',
                      });
                      setNewAdminEmail('');
                    },
                    onError: (error: any) => {
                      setSnackbar({
                        open: true,
                        message:
                          error?.response?.data?.message ||
                          error?.message ||
                          'Something went wrong',
                        severity: 'error',
                      });
                    },
                  },
                );
              }}
            >
              {inviting ? <CircularProgress size={20} /> : t('citytable.sendInvite')}
            </Button>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {t('citytable.adminList')}
            </Typography>

            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#f5f5f5',
                  px: 3,
                  py: 2,
                  fontWeight: 600,
                }}
              >
                <Box sx={{ flex: 2 }}>{t('citytable.email')}</Box>
                <Box sx={{ flex: 1 }}>{t('citytable.role')}</Box>
                <Box sx={{ flex: 1 }}>{t('citytable.createdAt')}</Box>
                <Box sx={{ flex: 1 }}>{t('citytable.registered')}</Box>
              </Box>

              {/* Rows */}
              {invitedLoading ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : invitedUsers.length === 0 ? (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary">{t('citytable.noInvitedAdmins')}</Typography>
                </Box>
              ) : (
                invitedUsers.map((user: any) => {
                  const formattedDate = (isoString: string) => {
                    if (!isoString) return '';

                    const [year, month, day] = isoString.split('T')[0].split('-');
                    return `${day}.${month}.${year}`;
                  };

                  return (
                    <Box
                      key={user.id}
                      sx={{
                        display: 'flex',
                        px: 3,
                        py: 2,
                        borderTop: '1px solid #eee',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ flex: 2 }}>{user.email}</Box>

                      <Box sx={{ flex: 1 }}>{roleMap[user.roleId] || t('roles.other')}</Box>

                      <Box sx={{ flex: 1 }}> {formattedDate(user.createdAt)}</Box>

                      <Box sx={{ flex: 1 }}>
                        <Switch checked={user.isRegistered} disabled color="success" />
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setCreateAdminModal(false)}> {t('citytable.close')}</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={viewDialog.open}
        onClose={() => setViewDialog((prev) => ({ ...prev, open: false }))}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#ffffff',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#18204f',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '16px 24px',
          }}
        >
          {viewDialog.title}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: '#ffffff',
            padding: '24px 24px 24px 24px', // Explicit padding for all sides
            '&.MuiDialogContent-root': {
              // Ensure higher specificity
              padding: '24px 24px 24px 24px',
            },
          }}
        >
          <Typography
            whiteSpace="pre-line"
            sx={{
              margin: 0, // Reset any default margins
              padding: 0, // Reset any default padding
            }}
          >
            {viewDialog.content}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '16px 24px',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button
            onClick={() => setViewDialog((prev) => ({ ...prev, open: false }))}
            sx={{
              backgroundColor: '#f44336',
              color: 'white',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
            }}
          >
            {t('citytable.close')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mayor Name Dialog */}
      <Dialog
        open={mayorNameDialog.open}
        onClose={handleCloseMayorNameDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#ffffff',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#18204f',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '16px 24px',
          }}
        >
          {t('citytable.editMayorName')}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#ffffff' }}>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            value={mayorNameDialog.name}
            onChange={(e) => setMayorNameDialog((prev) => ({ ...prev, name: e.target.value }))}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '16px 24px',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button
            onClick={handleCloseMayorNameDialog}
            sx={{
              backgroundColor: '#f44336',
              color: 'white',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              marginRight: '8px',
            }}
          >
            {t('citytable.cancel')}
          </Button>
          <Button
            onClick={handleSaveMayorName}
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
          >
            {t('citytable.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: '24px !important',
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as any}
          sx={{ width: '100%' }}
          elevation={6}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CityTable;
