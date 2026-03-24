import { createFileRoute, redirect } from '@tanstack/react-router'
import StepperWrapper from '../components/onboarding/StepperWrapper'
import { IContextType } from '../types/login'
import { APPROUTES } from '../utilities/routes'

const Onboarding = () => {
  return <StepperWrapper />
}

export const Route = createFileRoute('/onboarding')({
  component: Onboarding,
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
