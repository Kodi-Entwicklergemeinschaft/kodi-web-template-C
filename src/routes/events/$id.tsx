import { createFileRoute } from '@tanstack/react-router';
// import MayLike from '../../components/events/MayLike';
import MayLike from '../../components/events/MayLike copy';
import Details from '../../components/events/Details';
import EventsLayout from '../../layouts/EventsLayout';
import FilterSidebar from '../../components/Filter';
import useGetEventDetails from '../../hooks/useGetEventDetails';
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper';

const EventByID = () => {

  const { eventDetails, isLoading } = useGetEventDetails()
  return (
    <>
      <DataLoaderWrapper isLoading={isLoading} height={500} width="100%">
        <Details />
      </DataLoaderWrapper>
      {/* <FilterSidebar /> */}
      <MayLike />
      {/* </DataLoaderWrapper> */}
    </>
  );
};

export const Route = createFileRoute('/events/$id')({
  component: () => {
    const { eventDetails } = useGetEventDetails();
    return (
      <EventsLayout imageurl={eventDetails?.logo ?? ''}>
        <EventByID />
      </EventsLayout>
    );
  },
});
