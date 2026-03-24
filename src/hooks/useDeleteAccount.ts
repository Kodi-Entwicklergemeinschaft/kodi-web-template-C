import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, APPROUTES } from '../utilities/routes';
import { STORAGE_KEYS } from '../utilities/constants';
import { useRouter } from '@tanstack/react-router';

const useDeleteAccount = () => {
  const { navigate } = useRouter();
  const deleteUserAccount = useMutation({
    mutationKey: ['delete-user-account'],
    mutationFn: async (userId: string) => {
      await axiosInstance.delete(ApiRoutes.USER_DELETE(userId));
    },
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      navigate({ to: APPROUTES.LOGIN, reloadDocument: true });
    },
  });

  return { deleteUserAccount };
};

export default useDeleteAccount;
