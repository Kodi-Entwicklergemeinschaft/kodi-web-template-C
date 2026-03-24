import React, { useState, useEffect, useCallback } from 'react';
import { useMemo } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  useListings,
  useMyListings,
  useListingMutations,
  updateListingsData,
} from '../hooks/useDashboard';
import useCategoryMap from '../hooks/useCategoryMap';
import PdfThumbnail from './pdfThumbnail';
import LISTINGSIMAGE from '../assets/ListingsImage.jpg';
import APPOINTMENTDEFAULTIMAGE from '../assets/Appointments.png';
import { useNavigate } from '@tanstack/react-router';
import { APPROUTES } from '../utilities/routes';
import { isEqual } from 'lodash-es';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import useAdminCities from '../hooks/useAdminCities';
import useGetUserDetails from '../hooks/useGetUser';

const statusByName = {
  Active: 1,
  Pending: 3,
  Inactive: 2,
};

const ListingsTable = ({ selectedTab }) => {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [filteredListings, setFilteredListings] = useState([]);
  const { categoryMap } = useCategoryMap();
  const { deleteListing, updateListingStatus } = useListingMutations();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [cityStatuses, setCityStatuses] = useState<any[]>([]);

  const { cityList } = useAdminCities();
  const { userData } = useGetUserDetails();
  const roleId = userData?.roleId;
  const isCityAdminRole = roleId === 5;
  const adminCityIds = useMemo(() => {
    return cityList.filter((item: any) => item.type === 'city').map((item: any) => item.id);
  }, [cityList]);
  const {
    data: allListings = [],
    isLoading: isAllLoading,
    error: allError,
  } = useListings({
    statusId: statusFilter,
    pageNo,
    ...(isCityAdminRole && {
      cityId: adminCityIds.join(','),
      skipParentCities: true,
    }),
  });

  const statusMap = {
    1: t('dashboard.listingsTable.tabs.active'),
    2: t('dashboard.listingsTable.tabs.inactive'),
    3: t('dashboard.listingsTable.tabs.pending'),
  };

  const openManageStatus = (listing: any) => {
    setSelectedListing(listing);

    const formatted = listing.cityData.map((city: any) => ({
      cityId: city.id,
      cityName: city.name,
      statusId: city.listingStatus,
    }));

    setCityStatuses(formatted);
    setOpenStatusModal(true);
  };

  const handleSaveStatus = async () => {
    try {
      const payload = cityStatuses.map((c) => ({
        cityId: c.cityId,
        statusId: c.statusId,
      }));

      await updateListingStatus.mutateAsync({
        listingsId: selectedListing.id,
        data: payload,
      });

      const updatedListings = filteredListings.map((listing) => {
        if (listing.id !== selectedListing.id) return listing;

        return {
          ...listing,
          cityData: listing.cityData.map((city) => {
            const updatedCity = payload.find((p) => p.cityId === city.id);
            return updatedCity ? { ...city, listingStatus: updatedCity.statusId } : city;
          }),
        };
      });
      setFilteredListings(updatedListings);

      setOpenStatusModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const {
    data: myListings = [],
    isLoading: isMyLoading,
    error: myError,
  } = useMyListings({ statusId: statusFilter, pageNo });

  const statusById = Object.entries(statusByName).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});

  const baseListingsData = useMemo(() => {
    return selectedTab === 'my' ? myListings : allListings;
  }, [selectedTab, myListings, allListings]);

  useEffect(() => {
    const authError = allError || myError;
    if (authError) {
      // navigate({ to: '/login' });
      navigate({ to: APPROUTES.LOGIN, reloadDocument: true });
    }
  }, [allError, myError, navigate]);

  const handleChangeInStatus = (newStatusId: number, listing: any) => {
    updateListingsData(listing.cityId, { statusId: newStatusId }, listing.id)
      .then(() => {
        const updated = filteredListings.map((item) =>
          item.id === listing.id ? { ...item, statusId: newStatusId } : item,
        );
        setFilteredListings(updated);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Only update if the data actually changed
    if (!isEqual(baseListingsData, filteredListings)) {
      setFilteredListings(baseListingsData);
    }
  }, [baseListingsData]);

  const handleStatusChange = (event, newValue) => {
    setStatusFilter(newValue === 'all' ? null : statusByName[newValue]);
    setPageNo(1);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const columns = [
    { id: 'title', label: t('dashboard.listingsTable.columns.title'), width: '50%' },
    { id: 'category', label: t('dashboard.listingsTable.columns.category'), width: '15%' },
    { id: 'date', label: t('dashboard.listingsTable.columns.date'), width: '20%' },
    { id: 'views', label: t('dashboard.listingsTable.columns.views'), width: '15%' },
    {
      id: 'currentStatus',
      label: t('dashboard.listingsTable.columns.currentStatus'),
      width: '20%',
    },
    { id: 'status', label: t('dashboard.listingsTable.columns.status'), width: '15%' },
    { id: 'actions', label: t('dashboard.listingsTable.columns.actions'), width: '20%' },
  ];

  const isLoading = selectedTab === 'my' ? isMyLoading : isAllLoading;
  const error = selectedTab === 'my' ? myError : allError;
  const { trackEvent } = useMatomo();
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          {selectedTab === 'my'
            ? t('dashboard.listingsTable.myEntries')
            : t('dashboard.listingsTable.allListings')}
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={
              statusFilter
                ? Object.keys(statusByName).find((key) => statusByName[key] === statusFilter)
                : 'all'
            }
            onChange={handleStatusChange}
            scrollButtons="auto"
          >
            <Tab label={t('dashboard.listingsTable.tabs.all')} value="all" />
            <Tab label={t('dashboard.listingsTable.tabs.active')} value="Active" />
            <Tab label={t('dashboard.listingsTable.tabs.pending')} value="Pending" />
            <Tab label={t('dashboard.listingsTable.tabs.inactive')} value="Inactive" />
          </Tabs>
        </Box>
        {error && (
          <Typography color="error" variant="body1">
            {t('dashboard.listingsTable.errorLoading')}: {error.message}
          </Typography>
        )}
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredListings.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 1,
          }}
        >
          <Typography variant="h6">{t('dashboard.listingsTable.noListings')}</Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '8px',
            boxShadow: 1,
            backgroundColor: 'transparent',
          }}
        >
          <Table sx={{ tableLayout: 'fixed', border: '2px solid grey' }}>
            <TableHead sx={{ bgcolor: 'transparent' }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ fontWeight: 'bold', width: column.width, border: '1px solid grey' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow
                  key={listing.id}
                  sx={{
                    borderBottom: '1px solid black',
                    backgroundColor: 'transparent', // Ensures no row background
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'transparent',
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 40, height: 40 }}>
                        {listing.pdf ? (
                          <Box sx={{ width: 40, height: 40 }}>
                            <PdfThumbnail
                              pdfUrl={`${import.meta.env.VITE_BUCKET_URL}${listing.pdf}`}
                              size={40}
                            />
                          </Box>
                        ) : listing.logo ? (
                          <img
                            src={
                              listing.sourceId === 1 && listing.logo
                                ? `${import.meta.env.VITE_BUCKET_URL}${listing.logo}`
                                : listing.logo
                            }
                            alt="avatar"
                            onError={(e) => {
                              e.target.src =
                                listing.appointmentId !== null
                                  ? APPOINTMENTDEFAULTIMAGE
                                  : LISTINGSIMAGE;
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: 'cover',
                              borderRadius: '50%',
                            }}
                          />
                        ) : (
                          <img
                            alt="Listing"
                            src={
                              listing.appointmentId !== null
                                ? APPOINTMENTDEFAULTIMAGE
                                : LISTINGSIMAGE
                            }
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: 'cover',
                              borderRadius: '50%',
                            }}
                          />
                        )}
                      </Box>
                      <Typography variant="body2">
                        {listing.title || t('dashboard.listingsTable.na')}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {t(categoryMap[listing.categoryId] || 'dashboard.listingsTable.na')}
                  </TableCell>
                  <TableCell>
                    {listing.createdAt
                      ? new Date(listing.createdAt).toLocaleString('en-GB')
                      : t('dashboard.listingsTable.na')}
                  </TableCell>
                  <TableCell align="center">
                    {listing.viewCount || t('dashboard.listingsTable.na')}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        maxHeight: 120,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        pr: 1,

                        '&::-webkit-scrollbar': {
                          width: 6,
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#bdbdbd',
                          borderRadius: 4,
                        },
                      }}
                    >
                      {listing.cityData?.map((city: any) => (
                        <Typography key={city.id} variant="body2">
                          <strong>{city.name}</strong>: {statusMap[city.listingStatus] || 'Unknown'}
                        </Typography>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ color: '#1976d2', cursor: 'pointer', fontWeight: 500 }}
                      onClick={() => openManageStatus(listing)}
                    >
                      {t('dashboard.listingsTable.manageStatus')}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => {
                        trackEvent({
                          category: 'Dashboard Listing',
                          action: 'Edit Click',
                          name: listing.title,
                          value: listing.id,
                        });
                        navigate({
                          to: '/dashboard/editlisting',
                          search: { listingId: listing.id },
                        });
                      }}
                    >
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedListingId(listing.id);
                        setOpenConfirmDialog(true);
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {filteredListings.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
          {pageNo !== 1 && (
            <Button
              variant="outlined"
              onClick={() => setPageNo(pageNo - 1)}
              sx={{ fontWeight: 'bold' }}
            >
              {'<'} {t('dashboard.listingsTable.previous')}
            </Button>
          )}
          <Typography
            variant="body2"
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
          >
            {t('dashboard.listingsTable.page')} {pageNo}
          </Typography>
          {filteredListings.length >= 9 && (
            <Button
              variant="outlined"
              onClick={() => setPageNo(pageNo + 1)}
              sx={{ fontWeight: 'bold' }}
            >
              {t('dashboard.listingsTable.next')} {'>'}
            </Button>
          )}
        </Box>
      )}

      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'error.lighter',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Delete color="error" />
          </Box>
          {t('dashboard.listingsTable.confirmDialog.title')}
        </DialogTitle>
        <DialogContent>
          <Typography>{t('dashboard.listingsTable.confirmDialog.message')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirmDialog(false)}
            variant="outlined"
            disabled={isDeleting}
          >
            {t('dashboard.listingsTable.confirmDialog.cancel')}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (selectedListingId) {
                trackEvent({
                  category: 'Dashboard Listing',
                  action: 'Delete Confirm',
                  name: selectedListingId,
                });

                setIsDeleting(true);

                deleteListing.mutate(
                  {
                    cityId: localStorage.getItem('cityId') || '',
                    listingsId: selectedListingId,
                  },
                  {
                    onSuccess: () => {
                      setFilteredListings((prev) =>
                        prev.filter((item) => item.id !== selectedListingId),
                      );
                      setIsDeleting(false);
                      setSelectedListingId(null);
                      setOpenConfirmDialog(false);
                    },
                    onError: () => {
                      setIsDeleting(false);
                    },
                  },
                );
              }
            }}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {t('dashboard.listingsTable.confirmDialog.delete')}
                <CircularProgress size={18} sx={{ color: '#fff' }} />
              </Box>
            ) : (
              t('dashboard.listingsTable.confirmDialog.delete')
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openStatusModal} onClose={() => setOpenStatusModal(false)} fullWidth>
        <DialogTitle>{t('dashboard.listingsTable.manageStatus')}</DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {cityStatuses.map((city, index) => (
            <Box key={city.cityId}>
              <Typography sx={{ mb: 1 }}>{city.cityName}</Typography>

              <Select
                fullWidth
                value={city.statusId}
                onChange={(e) => {
                  const updated = [...cityStatuses];
                  updated[index].statusId = e.target.value;
                  setCityStatuses(updated);
                }}
              >
                <MenuItem value={1}>{t('dashboard.listingsTable.tabs.active')}</MenuItem>
                <MenuItem value={2}>{t('dashboard.listingsTable.tabs.inactive')}</MenuItem>
                <MenuItem value={3}>{t('dashboard.listingsTable.tabs.pending')}</MenuItem>
              </Select>
            </Box>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenStatusModal(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSaveStatus}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListingsTable;
