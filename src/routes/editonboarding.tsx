import { createFileRoute, redirect } from '@tanstack/react-router'
import { IContextType } from '../types/login'
import { APPROUTES } from '../utilities/routes'
import StepperWrapper from '../components/onboarding/StepperWrapper'
const EditOnboarding = () => {
  return(
    <StepperWrapper/>
  )
}

export const Route = createFileRoute('/editonboarding')({
  component: EditOnboarding,
  beforeLoad: ({ context }: { context: IContextType }) => {
    if (!context?.auth?.isAuthenticated) {
      throw redirect({
        to: APPROUTES.LOGIN,
        search: {},
        replace: true,
      });
    }
  },
})