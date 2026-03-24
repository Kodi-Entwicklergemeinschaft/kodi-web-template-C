import { Fade, Box, Avatar, Typography, Button } from "@mui/material";
import { userOnboardingContext } from "./StepperWrapper";
import { useTranslation } from "react-i18next";

const SuccessStep = () => {
    const { step, finalSubmit } = userOnboardingContext();
    const { t } = useTranslation();

    return <Fade in={step === 6} key="done">
        <Box textAlign={"center"} display="flex" flexDirection={"column"} gap={2}>
            <Typography variant="h5" fontWeight={700}>{t("onboarding.success_step.title")}</Typography>
            <Typography mt={2}>
                {t("onboarding.success_step.sub_title")}
            </Typography>
            <Button variant="contained" onClick={finalSubmit}>
                {t("onboarding.success_step.submit")}
            </Button>
        </Box>
    </Fade>
};

export default SuccessStep;
