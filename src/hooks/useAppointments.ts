import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { STORAGE_KEYS } from '../utilities/constants';




const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
export const queryKeys = {
  APPOINTMENTS_USER: 'appointmentsUser',
  USER_BOOKINGS: 'userBookings',
  OWNER_BOOKINGS: 'ownerBookings',
  APPOINTMENT_DETAILS: 'appointmentDetails',
  APPOINTMENT_SERVICES: 'appointmentServices',
  APPOINTMENT_SLOTS: 'appointmentSlots',
};

// GET: Appointments user created
export const useAppointmentsUserCreated = (params: any) =>
  useQuery({
    queryKey: [queryKeys.APPOINTMENTS_USER, params],
    queryFn: async () =>
      (await axiosInstance.get(`/v1/users/${userId}/appointments`, { params }))
        .data,
  });

// GET: User Bookings
export const useUserBookings = (params: any) =>
  useQuery({
    queryKey: [queryKeys.USER_BOOKINGS, params],
    queryFn: async () =>
      (await axiosInstance.get(`/v1/users/${userId}/bookings`, { params })).data,
  });

// GET: Owner Appointments/Bookings
export const useOwnerBookings = (params: any) =>
  useQuery({
    queryKey: [queryKeys.OWNER_BOOKINGS, params],
    queryFn: async () =>
      (
        await axiosInstance.get(`/v1/users/${userId}/owner/bookings`, { params })
      ).data,
  });

// GET: Appointment by ID
export const useAppointmentById = (
  cityId: string,
  listingId: string,
  appointmentId: string
) =>
  useQuery({
    queryKey: [queryKeys.APPOINTMENT_DETAILS, appointmentId],
    queryFn: async () =>
      (
        await axiosInstance.get(
          `/v1/cities/${cityId}/listings/${listingId}/appointments/${appointmentId}`
        )
      ).data,
    enabled: !!appointmentId,
  });

// GET: Appointment Services
export const useAppointmentServices = (
  cityId: string,
  listingId: string,
  appointmentId: string
) =>
  useQuery({
    queryKey: [queryKeys.APPOINTMENT_SERVICES, appointmentId],
    queryFn: async () =>
      (
        await axiosInstance.get(
          `/v1/cities/${cityId}/listings/${listingId}/appointments/${appointmentId}/services`
        )
      ).data,
    enabled: !!appointmentId,
  });

// GET: Appointment Slots
export const useAppointmentSlots = (
  cityId: string,
  listingId: string,
  appointmentId: string,
  date: string,
  serviceId: string
) =>
  useQuery({
    queryKey: [queryKeys.APPOINTMENT_SLOTS, appointmentId, date, serviceId],
    queryFn: async () =>
      (
        await axiosInstance.get(
          `/v1/cities/${cityId}/listings/${listingId}/appointments/${appointmentId}/slots?date=${date}&serviceId[]=${serviceId}`
        )
      ).data,
    enabled: !!date && !!serviceId,
  });

// CREATE: Appointment
export const useCreateAppointment = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingId,
      newDataOb,
    }: {
      cityId: string;
      listingId: string;
      newDataOb: any;
    }) =>
      (
        await axiosInstance.post(
          `/v1/cities/${cityId}/listings/${listingId}/appointments`,
          newDataOb
        )
      ).data,
  });

// UPDATE: Appointment
export const useUpdateAppointment = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingId,
      appointmentId,
      newDataOb,
    }: {
      cityId: string;
      listingId: string;
      appointmentId: string;
      newDataOb: any;
    }) =>
      (
        await axiosInstance.patch(
          `/v1/cities/${cityId}/listings/${listingId}/appointments/${appointmentId}`,
          newDataOb
        )
      ).data,
  });

// DELETE: Appointment
export const useDeleteAppointment = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingId,
      appointmentId,
    }: {
      cityId: string;
      listingId: string;
      appointmentId: string;
    }) =>
      (
        await axiosInstance.delete(
          `/v1/cities/${cityId}/listings/${listingId}/appointments/${appointmentId}`
        )
      ).data,
  });

// CREATE: Booking
export const useCreateBooking = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingId,
      appointmentId,
      bookingData,
    }: {
      cityId: string;
      listingId: string;
      appointmentId: string;
      bookingData: any;
    }) =>
      (
        await axiosInstance.post(
          `/v1/cities/${cityId}/listings/${listingId}/appointments/${appointmentId}/book`,
          bookingData
        )
      ).data,
  });

// DELETE: User Booking
export const useDeleteUserBooking = () =>
  useMutation({
    mutationFn: async ({
      appointmentId,
      bookingId,
    }: {
      appointmentId: string;
      bookingId: string;
    }) =>
      (
        await axiosInstance.delete(
          `/v1/users/${userId}/appointments/${appointmentId}/booking/${bookingId}`
        )
      ).data,
  });

// DELETE: User Booking (Admin)
export const useDeleteUserAppointments = () =>
  useMutation({
    mutationFn: async ({
      userId,
      appointmentId,
      bookingId,
    }: {
      userId: string;
      appointmentId: string;
      bookingId: string;
    }) =>
      (
        await axiosInstance.delete(
          `/v1/users/${userId}/appointments/${appointmentId}/booking/${bookingId}`
        )
      ).data,
  });

// DELETE: My Services
export const useDeleteMyServices = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingId,
      serviceId,
    }: {
      cityId: string;
      listingId: string;
      serviceId: string;
    }) =>
      (
        await axiosInstance.delete(
          `/v1/cities/${cityId}/listings/${listingId}/service/${serviceId}`
        )
      ).data,
  });
