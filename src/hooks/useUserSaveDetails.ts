import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import { useUserDetailsContext } from '../routes/users/settings';
import { useState } from 'react';
import { omit } from 'lodash-es';
import { useTranslation } from 'react-i18next';

const useSaveUserDetails = () => {
  const data = useUserDetailsContext();
  const [formData, setFormData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const handleChange = (key: string, value: string | number | File) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const isValidCred = () => {
    if (!formData.username || !formData.firstname) {
      setError(t("settings.tab.usernameReq"));
      return false;
    }
    if (formData.phoneNumber) {
      const phoneStr = formData.phoneNumber.toString();
      if (!/^\d+$/.test(phoneStr)) {
      setError(t("settings.tab.phoneNum"));
      return false;
      }
      if (phoneStr.length > 15) {
      setError(t("settings.tab.phoneLen"));
      return false;
      }
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError(t("settings.tab.emailValid"));
      return false;
    }
    if (formData.website && !/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i.test(formData.website)) {
      setError(t("settings.tab.websiteValid"));
      return false;
    }
    setError(null);
    return true;
  }
  const saveUserDetailsMutation = useMutation<Record<string, string>, Error>({
    mutationFn: async (): Promise<Record<string, string>> => {
      try {
        const response = await axiosInstance.patch(ApiRoutes.USER_DELETE(`${data?.id}`), {
          ...omit(formData, 'image'),
        });
        return response.data;
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred while saving user details');
        throw err;
      }
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: [queryKeys.USER_DETAILS] });
    }
  });

  return { saveUserDetailsMutation, formData, isEditing, setIsEditing, handleChange, error, setError, isValidCred};
};

export default useSaveUserDetails;
