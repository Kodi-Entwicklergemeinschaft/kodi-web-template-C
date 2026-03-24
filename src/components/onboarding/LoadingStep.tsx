import { Fade, Box, CircularProgress, Typography } from "@mui/material";
import { userOnboardingContext } from "./StepperWrapper";
import { useTranslation } from "react-i18next";

const LoadingStep = () => {
    const { step, name } = userOnboardingContext();
    const {t} = useTranslation();
    return <Fade in={step === 5} key="loading">
        <Box textAlign="center" display="flex" flexDirection={"column"} justifyContent={"center"} gap={2}>
            <CircularProgress size="100px" sx={{alignSelf: "center"}}/>
            <Typography variant="h6" fontWeight={600}>
                {t("onboarding.loading_step.title")} {name}!
            </Typography>
            <Typography>
                {t("onboarding.loading_step.sub_title")}
            </Typography>
        </Box>
    </Fade>
};
export default LoadingStep;
