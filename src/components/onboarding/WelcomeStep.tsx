import { Box, Button, Fade, Typography } from "@mui/material";
import { userOnboardingContext } from "./StepperWrapper";
import { useTranslation } from "react-i18next";

const WelcomeStep = () => {
  const { step, nextStep, finalSubmit } = userOnboardingContext();
  const { t } = useTranslation();
  return (
    <Fade in={step === 0} key="welcome">
      <Box textAlign="center">

        <Typography variant="h5">{t("onboarding.welcome_step.title")}</Typography>
        <Typography mt={2}>
          {t("onboarding.welcome_step.message")}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={nextStep} sx={{ mt: 4 }}>
            {t("onboarding.welcome_step.get_started")}
          </Button>
          <Button variant="outlined" onClick={finalSubmit} sx={{ mt: 4 }}>
            {t("onboarding.welcome_step.skip")}
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default WelcomeStep;
