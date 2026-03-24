import { createContext, useContext, useMemo } from "react";
import WelcomeStep from "./WelcomeStep";
import NameStep from "./NameStep";
import IdentityStep from "./IdentityStep";
import InterestsStep from "./InterestsStep";
import LoadingStep from "./LoadingStep";
import SuccessStep from "./SuccessStep";
import LocationStep from "./LocationStep";
import useOnboardingForm from "../../hooks/useOnboardingForm";
import { IUseOnboardingFormReturn } from "../../types/onboarding";
import { Avatar, Box } from "@mui/material";
import onboardingBg from "../../assets/onboardingBg.svg";

export const UserOnboardingContext = createContext<IUseOnboardingFormReturn | null>(null);

export const userOnboardingContext = () => {
    const ctx = useContext(UserOnboardingContext);
    if (!ctx) throw new Error('User onboarding context not found');
    return ctx;
};

const StepperWrapper = () => {
    const userOnboardingData = useOnboardingForm();
    const steps = useMemo(() => [
        { component: <WelcomeStep />, showAvatar: true },
        { component: <NameStep />, showAvatar: true },
        { component: <IdentityStep />, showAvatar: true },
        { component: <LocationStep />, showAvatar: false },
        { component: <InterestsStep />, showAvatar: false },
        { component: <LoadingStep />, showAvatar: true },
        { component: <SuccessStep />, showAvatar: true },
    ], []);

    return (
        <UserOnboardingContext.Provider value={userOnboardingData}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Box
                    width={{ xs: '90%', sm: '80%', md: '60%', lg: '40%' }}
                    maxWidth="480px"
                    p={4}
                    borderRadius={4}
                >
                    {steps[userOnboardingData.step].showAvatar && <Avatar
                        src={onboardingBg}
                        sx={{ width: 200, height: 200, mx: "auto", mb: 2 }}
                    />}
                    {steps[userOnboardingData.step].component}
                </Box>
            </Box>
        </UserOnboardingContext.Provider>
    );
};

export default StepperWrapper;
