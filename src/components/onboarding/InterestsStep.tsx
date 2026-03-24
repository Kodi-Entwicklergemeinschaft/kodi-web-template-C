import { Box, Button, Card, CardContent, CardMedia, Fade, Typography } from "@mui/material";
import { userOnboardingContext } from "./StepperWrapper";
import { useTranslation } from "react-i18next";
import useGetInterest from "../../hooks/useGetInterest";
import { imageLoaderUtility } from "../../utilities/getImage";
   
const InterestsStep = () => {
    const { step, setStep, prevStep, interests, setInterests, setUserInterest } = userOnboardingContext();
    const { interestList } = useGetInterest();
    const { t } = useTranslation();
    return <Fade in={step === 4} key="interests">
        <Box textAlign={"center"} display="flex" flexDirection={"column"} gap={2}>
            <Typography variant="h5" fontWeight={700}>
                {t("onboarding.interest_step.title")}
            </Typography>
            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                {interestList.map((list) => (
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            background: (theme) => interests.includes(list.id) ? theme.palette.primary.main : theme.palette.common.white,
                            width: '200px',
                        }}
                        key={list.id}
                        onClick={() =>
                            setInterests((prev: number[]) =>
                              prev.includes(list.id)
                                ? prev.filter(id => id !== list.id) // Unselect
                                : [...prev, list.id]                // Select
                            )
                          }
                          
                    >
                    <Box sx={{ borderRadius: '10px', overflow: 'hidden', p: 1 }}>
                        <CardMedia
                        component="img"
                        height="200"
                        image={list.image}
                        alt={list.name}
                        sx={{ borderRadius: '10px' }}
                      />
                    </Box>

                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, 
                                                            color: (theme) => interests.includes(list.id) ? theme.palette.common.white : theme.palette.primary.main,

                             }}>
                                {list.name}
                            </Typography>

                        </CardContent>
                    </Card>
                ))}
            </Box>
            {setUserInterest.isError && (
                <Typography variant="body2" color="error">
                    {t('onboarding.user_details.failure_message')}
                </Typography>
            )}
            <Button variant="contained" disabled={interests.length === 0} onClick={() => setUserInterest.mutateAsync({ interestIds: interests })}>{t("onboarding.interest_step.complete")}</Button>
            <Box display="flex" flexDirection={"row"} justifyContent={"space-between"}>
                <Button onClick={prevStep}>{t("onboarding.interest_step.prev")}</Button>
                <Button onClick={() => setStep((prev) => prev + 2)}>
                    {t("onboarding.interest_step.skip")}
                </Button>
            </Box>
        </Box>
    </Fade>
}

export default InterestsStep;
