import { createFileRoute } from '@tanstack/react-router';
import MayLike from '../../components/events/MayLike';
import Details from '../../components/events/Details';
import EventsLayout from '../../layouts/EventsLayout';
import FilterSidebar from '../../components/Filter';
import useGetEventDetails from '../../hooks/useGetEventDetails';
export const Route = createFileRoute('/news/$id')({
  component: () => {
    const { eventDetails } = useGetEventDetails();
    return(
    <EventsLayout imageurl={eventDetails?.logo ?? ''}>
      <NewsByID />
    </EventsLayout>
  )}
})

const NewsByID = () => {
  return (
    <>
      <Details />
      <FilterSidebar />
      <MayLike />
    </>
  );
};
