import { useMutation } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import axiosInstance from '../axiosConfig';
import { useRouter } from '@tanstack/react-router';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../utilities/constants';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { ApiRoutes, APPROUTES, queryKeys } from '../utilities/routes';

const useSignup = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const isCredsValidated = () => {
    const errors: Record<string, string> = {};
    if (formData.email && !EMAIL_REGEX.test(formData.email)) {
      errors.email = t('signup.error.validEmail');
    }
    if (!formData.username) {
      errors.username = t('signup.error.validUsername');
    }
    if (!formData.firstname) {
      errors.firstname = t('signup.error.validFirstname');
    }
    if (!formData.lastname) {
      errors.lastname = t('signup.error.validLastname');
    }
    if (formData.password && !PASSWORD_REGEX.test(formData.password)) {
      errors.password = t('resetPassword.error.invalidPasswordFormat');
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const signupMutation = useMutation({
    mutationKey: [queryKeys.SIGNUP],
    mutationFn: async (): Promise<{ message: string }> => {
      return await axiosInstance.post(ApiRoutes.REGISTER, { ...formData, username: formData.username.trim().toLowerCase() });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      setErrors({ signup: e?.response?.data?.message ?? 'something went wrong' })
    },
    onSuccess: () => router.navigate({ to: APPROUTES.LOGIN, reloadDocument: true }),
  });

  const handleSubmit = async () => {
    const isValidated = isCredsValidated();
    if (isValidated) {
      await signupMutation.mutateAsync();
    }
  };
  const disableSubmit = useMemo(() => {
    if (!formData.username || !formData.password) return true;
    return !isCredsValidated();
  }, [formData.username, formData.password]);

  return {
    handleSubmit,
    handleChange,
    errors,
    formData,
    handleClickShowPassword,
    isCredsValidated,
    showPassword,
    disableSubmit,
    loading: signupMutation.isPending,
  };
};

export default useSignup;
