import { createFileRoute } from '@tanstack/react-router'
import { Box} from '@mui/material'  
import useGetAllCitiesById from '../../../hooks/useGetAllCities'
import PrivateLayout from '../../../layouts/PrivateLayout'
import MunicipalCard from '../../../components/kuselaltenglan/Municipality'
export const Route = createFileRoute('/virtualtownhall/viewAllcities/$id')({
  component: ()=> (
    <PrivateLayout>
      <RouteComponent />
    </PrivateLayout>
  ),
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { CitiesList } = useGetAllCitiesById(id)
  if (!CitiesList) return null;
  return(
    <Box sx={{ ml: 4, mr: 4, mt: 2, mb: 2}} >
      <MunicipalCard CardList={CitiesList} button={false} title='All Cities'/>
    </Box>
  )
}
