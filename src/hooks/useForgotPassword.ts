import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { EMAIL_REGEX } from '../utilities/constants';
import axiosInstance from '../axiosConfig';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { ApiRoutes, queryKeys } from '../utilities/routes';

const useForgotPassword = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCredsValidated = (): boolean => {
    const errors: Record<string, string> = {};
    if (username && !EMAIL_REGEX.test(username)) {
      errors.username = t('forgotPassword.error.validusername');
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const forgetPasswordMutation = useMutation({
    mutationKey: [queryKeys.FORGOT_PASSWORD],
    mutationFn: async () => {
      return await axiosInstance.post(ApiRoutes.FORGOT_PASSWORD, { username : username.trim().toLowerCase() });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      setErrors({
        forgotPassword: e?.response?.data?.message ?? t('forgotPassword.error.invalidData'),
      });
    },
  });

  const handleusernameSubmit = async () => {
    const isValidated = isCredsValidated();
    if (!isValidated) return;
    await forgetPasswordMutation.mutateAsync();
  };
  const disableSubmit = useMemo(() => {
    if (!username) return true;
    return !isCredsValidated();
  }, [username]);

  return {
    handleusernameSubmit,
    username,
    errors,
    setUsername,
    loading: forgetPasswordMutation.isPending,
    disableSubmit,
    isSuccess: forgetPasswordMutation.isSuccess,
  };
};

export default useForgotPassword;
