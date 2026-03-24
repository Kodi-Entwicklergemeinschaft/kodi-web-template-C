import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { EMAIL_REGEX, STORAGE_KEYS, PASSWORD_REGEX } from '../utilities/constants';
import axiosInstance from '../axiosConfig';
import { useRouter } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { ILoginMutationResponse } from '../types/login';
import { ApiRoutes, APPROUTES, queryKeys } from '../utilities/routes';

const useLogin = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const isCredsValidated = (): boolean => {
    const errors: Record<string, string> = {};
    if (username && !EMAIL_REGEX.test(username)) {
      errors.username = t('login.error.validUsername');
    }

    if (!PASSWORD_REGEX.test(password)) {
      errors.password = t('login.error.validPassword');
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSuccess = ({ data }: ILoginMutationResponse) => {
    const { accessToken, userId, refreshToken } = data;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    router.navigate({ to: data.isOnBoarded ? APPROUTES.HOME : `${APPROUTES.ONBOARDING}?userId=${userId}`, reloadDocument: true });
  };

  const loginMutation = useMutation({
    mutationKey: [queryKeys.LOGIN],
    mutationFn: async (): Promise<ILoginMutationResponse> => {
      return await axiosInstance.post(ApiRoutes.LOGIN, { username: username.trim().toLowerCase(), password });
    },
    onError: (e: AxiosError<{ message?: string }>) => {
      setErrors({ login: e?.response?.data?.message ?? t('login.error.invalidData') });
    },
    onSuccess,
  });

  const handleLogin = async () => {
    const isValidated = isCredsValidated();
    if (!isValidated) return;
    await loginMutation.mutateAsync();
  };
  const disableSubmit = useMemo(() => {
    if (!username || !password) return true;
    return !isCredsValidated();
  }, [username, password]);

  return {
    handleLogin,
    username,
    password,
    errors,
    setUsername,
    setPassword,
    loading: loginMutation.isPending,
    disableSubmit,
    handleClickShowPassword,
    showPassword,
  };
};

export default useLogin;
