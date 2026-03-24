import { Box, Button, Fade, TextField, Typography } from "@mui/material";
import { userOnboardingContext } from "./StepperWrapper";
import { useTranslation } from "react-i18next";
const NameStep = () => {
    const { step, prevStep, name, setName, nextStep, setUserName } = userOnboardingContext();
    const { t } = useTranslation();
    return <Fade in={step === 1} key="name">
        <Box textAlign={"center"} display="flex" flexDirection={"column"} gap={2}>
            <Typography variant="h5" fontWeight={700}>{t("onboarding.name_step.title")}</Typography>
            <TextField
                fullWidth
                label={t("onboarding.name_step.name_label")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                slotProps={{
                    input: {
                        sx: { borderRadius: '50px' },
                    },
                    htmlInput: {
                        sx: { borderRadius: '50px' },
                    },
                }}
            />
            {setUserName.isError && (
                <Typography variant="body2" color="error">
                    {t('onboarding.user_details.failure_message')}
                </Typography>
            )}
            <Button variant="contained" disabled={!name} onClick={() => setUserName.mutateAsync({ username: name })}>{t("onboarding.name_step.next")}</Button>
            <Box display="flex" flexDirection={"row"} justifyContent={"space-between"}>
                <Button onClick={prevStep}>{t("onboarding.name_step.prev")}</Button>
                <Button onClick={nextStep}>
                    {t("onboarding.name_step.skip")}
                </Button>
            </Box>
        </Box>
    </Fade>
};

export default NameStep;
