import { Box, Button, Chip, Fade, TextField, Typography, useTheme } from "@mui/material";
import { userOnboardingContext } from "./StepperWrapper";
import { useTranslation } from "react-i18next";
import { UserType } from "../../hooks/useOnboardingForm";
const IdentityStep = () => {
    const { step, prevStep, nextStep, identity, setIdentity, setUserType } = userOnboardingContext();
    const { t } = useTranslation();
    const theme = useTheme();
    return <Fade in={step === 2} key="identity">
        <Box textAlign={"center"} display="flex" flexDirection={"column"} gap={2}>
            <Typography variant="h5" fontWeight={700}>{t("onboarding.identity_step.title")}</Typography>
            <Chip
                sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    color: identity === UserType.CITIZEN ? theme.palette.common.white : theme.palette.primary.main,
                    backgroundColor: identity === UserType.CITIZEN ? theme.palette.primary.main : theme.palette.common.white
                }} label={t("onboarding.identity_step.live_here")}
                clickable
                onClick={() => setIdentity(UserType.CITIZEN)}
            ></Chip>
            <Chip sx={{ fontWeight: 500, fontSize: "16px", color: identity === UserType.TOURIST ? theme.palette.common.white : theme.palette.primary.main, backgroundColor: identity === UserType.TOURIST ? theme.palette.primary.main : theme.palette.common.white }} label={t("onboarding.identity_step.spend_free_time")} clickable onClick={() => setIdentity(UserType.TOURIST)}></Chip>
            {setUserType.isError && (
                <Typography variant="body2" color="error">
                    {t('onboarding.user_details.failure_message')}
                </Typography>
            )}
            <Button variant="contained" disabled={!identity} onClick={() => setUserType.mutateAsync({ userType: identity })}>{t("onboarding.name_step.next")}</Button>
            <Box display="flex" flexDirection={"row"} justifyContent={"space-between"}>
                <Button onClick={prevStep}>{t("onboarding.name_step.prev")}</Button>
                <Button onClick={nextStep}>
                    {t("onboarding.name_step.skip")}
                </Button>
            </Box>
        </Box>
    </Fade>
};

export default IdentityStep;
