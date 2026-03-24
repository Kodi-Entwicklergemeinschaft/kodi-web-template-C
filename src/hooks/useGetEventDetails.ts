import { useParams } from '@tanstack/react-router';
import { ApiRoutes, APPROUTES, queryKeys } from '../utilities/routes';
import axiosInstance from '../axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { IEventDetailsSections } from '../types/listing';

const useGetEventDetails = () => {
  const { id } = useParams({ from: APPROUTES.EVENT_BY_ID });
  const { data , isLoading} = useQuery({
    queryKey: [queryKeys.EVENT_BY_ID, id],
    queryFn: async (): Promise<IEventDetailsSections> => {
      return await axiosInstance.get(ApiRoutes.EVENT_BY_ID(id));
    },
  });
  return { eventDetails: data?.data ?? null , isLoading };
};

export default useGetEventDetails;
