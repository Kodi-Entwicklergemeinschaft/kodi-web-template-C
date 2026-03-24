import { useState } from 'react';
import { PASSWORD_REGEX } from '../utilities/constants';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../axiosConfig';
import { AxiosError } from 'axios';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { ApiRoutes, APPROUTES, queryKeys } from '../utilities/routes';

const useChangePassword = () => {
  const { t } = useTranslation();
  const { navigate } = useRouter();
  const { token, userId } = useSearch({ from: APPROUTES.PASSWORD_FORGOT, strict: true });
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isCredsValidated = (): boolean => {
    const errors: Record<string, string> = {};
    if (!PASSWORD_REGEX.test(newPassword)) {
      errors.newPassword = t('resetPassword.error.invalidNewPasswordFormat');
    }

    if (!PASSWORD_REGEX.test(confirmPassword)) {
      errors.confirmPassword = t('resetPassword.error.invalidPasswordFormat');
    }
    if (newPassword !== confirmPassword) {
      errors.passwordMatch = t('resetPassword.error.passwordMismatch');
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const changePasswordMutation = useMutation({
    mutationKey: [queryKeys.CHANGE_PASSWORD],
    mutationFn: async () => {
      return await axiosInstance.post(ApiRoutes.RESET_PASSWORD, {
        password: newPassword,
        token,
        userId,
      });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      setErrors({
        passwordMatch: e?.response?.data?.message ?? t('resetPassword.error.fallbackMessage'),
      });
    },
    onSuccess: () => {
      navigate({ to: APPROUTES.LOGIN, reloadDocument: true });
    },
  });

  const handleChangePassword = async () => {
    const isValidated = isCredsValidated();
    if (!isValidated) return;
    await changePasswordMutation.mutateAsync();
  };

  return {
    handleChangePassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    loading: changePasswordMutation.isPending,
    showPassword,
    setShowPassword,
    isCredsValidated,
    isSuccess: changePasswordMutation.isSuccess,
  };
};

export default useChangePassword;
