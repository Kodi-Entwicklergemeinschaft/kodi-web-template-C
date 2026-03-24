import {
    Fade,
    Box,
    Typography,
    Button,
    Divider,
    Chip,
    FormControl,
    TextField,
    useTheme,
    Autocomplete,
  } from "@mui/material";
  import { userOnboardingContext } from "./StepperWrapper";
  import { useTranslation } from "react-i18next";
  import useCities from "../../hooks/useCities";
  import { MaritalStatus, AccommodationPreference } from "../../hooks/useOnboardingForm";
  
  const selectSx = { borderRadius: "50px" };
  
  const LocationStep = () => {
    const {
      step,
      prevStep,
      region,
      setRegion,
      maritalStatus,
      setMaritalStatus,
      accommodationPreference,
      setAccommodationPreference,
      nextStep,
      setUserDemographics,
    } = userOnboardingContext();
  
    const { cityList } = useCities();
    const { t } = useTranslation();
    const theme = useTheme();

    const accommodationTranslationKeys: Record<AccommodationPreference, string> = {
        [AccommodationPreference.DOG]: "withDog",
        [AccommodationPreference.ACCESSIBLE]: "accessible",
        [AccommodationPreference.LOW_BARRIER]: "lowBarrier",
      };
      
  
    const toggleAccommodation = (pref: AccommodationPreference) => {
      if (accommodationPreference.includes(pref)) {
        setAccommodationPreference(accommodationPreference.filter(p => p !== pref));
      } else {
        setAccommodationPreference([...accommodationPreference, pref]);
      }
    };
  
    return (
      <Fade in={step === 3} key="region">
        <Box textAlign="center" display="flex" flexDirection="column" gap={2}>
          <Typography variant="h5" fontWeight={700}>
            {t("onboarding.resident_step.title")}
          </Typography>
  
          <FormControl fullWidth margin="normal">
            <Autocomplete
              value={cityList.find((c) => c.id === Number(region)) || null}
              onChange={(e, newValue) => setRegion(newValue?.id?.toString() || "")}
              options={cityList}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              fullWidth
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: (theme) => theme.palette.common.white,
                    color: "#000",
                    borderRadius: "10px",
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("onboarding.resident_step.residenceTitle")}
                  sx={selectSx}
                />
              )}
            />
          </FormControl>
  
          <Divider />
  
          {[MaritalStatus.ALONE, MaritalStatus.COUPLE, MaritalStatus.FAMILY].map((status) => (
            <Chip
              key={status}
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                color: maritalStatus === status ? theme.palette.common.white : theme.palette.primary.main,
                backgroundColor: maritalStatus === status ? theme.palette.primary.main : theme.palette.common.white,
              }}
              label={t(`onboarding.resident_step.${status}`)}
              clickable
              onClick={() => setMaritalStatus(status)}
            />
          ))}
  
          <Divider />
  
          {[AccommodationPreference.DOG, AccommodationPreference.LOW_BARRIER].map((pref) => (
            <Chip
              key={pref}
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                color: accommodationPreference.includes(pref)
                  ? theme.palette.common.white
                  : theme.palette.primary.main,
                backgroundColor: accommodationPreference.includes(pref)
                  ? theme.palette.primary.main
                  : theme.palette.common.white,
              }}
              label={t(`onboarding.resident_step.${accommodationTranslationKeys[pref]}`)}
              clickable
              onClick={() => toggleAccommodation(pref)}
            />
          ))}
  
          {setUserDemographics.isError && (
            <Typography variant="body2" color="error">
              {t("onboarding.user_details.failure_message")}
            </Typography>
          )}
  
          {/* Submit */}
          <Button
            variant="contained"
            disabled={!maritalStatus || !region}
            onClick={() =>
              setUserDemographics.mutateAsync({
                maritalStatus,
                accommodationPreference,
                cityId: Number(region),
              })
            }
          >
            {t("onboarding.resident_step.next")}
          </Button>
  
          {/* Nav Buttons */}
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Button onClick={prevStep}>{t("onboarding.resident_step.prev")}</Button>
            <Button onClick={nextStep}>{t("onboarding.resident_step.skip")}</Button>
          </Box>
        </Box>
      </Fade>
    );
  };
  
  export default LocationStep;
  