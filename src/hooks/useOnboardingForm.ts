import { useState , useEffect } from "react";
import { ApiRoutes, APPROUTES } from "../utilities/routes";
import { useRouter } from "@tanstack/react-router";
import { useMutation, useQuery} from "@tanstack/react-query";
import { useSearch } from '@tanstack/react-router';
import axiosInstance from "../axiosConfig";
import useGetUserDetails from '../hooks/useGetUser';
import { STORAGE_KEYS } from '../utilities/constants';


export enum MaritalStatus {
    ALONE = 'alone',
    COUPLE = 'married',
    FAMILY = 'with_family'
}

export enum AccommodationPreference {
    DOG = 'dog',
    LOW_BARRIER = 'low_barrier',
    ACCESSIBLE = "accessible",
}

export enum UserType {
    TOURIST = 'tourist',
    CITIZEN = 'citizen'
}
const useOnboardingForm = () => {
    const {userData}  = useGetUserDetails();
    const [step, setStep] = useState(0);
    const [name, setName] = useState(userData?.username);
    const [identity, setIdentity] = useState<UserType | "">("");
    const [region, setRegion] = useState("");
    const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);
    const [accommodationPreference, setAccommodationPreference] = useState<AccommodationPreference[] | []>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { navigate } = useRouter();
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);



    const { data: onboardingData, isSuccess } = useQuery({
      queryKey: ['user-onboarding', userId],
      enabled: !!userId, 
      queryFn: async () => {
        if (!userId) {
          throw new Error("User ID not found.");
        }
    
        const res = await axiosInstance.get(ApiRoutes.GET_USER_ONBOARDING_DETAIL(userId));
        const responseData = res?.data;
    
        if (!responseData) {
          console.warn('🚨 No onboarding data found:', res?.data);
          throw new Error('No onboarding data found.');
        }
        return responseData;
      }
    });
    
      
    useEffect(() => {
        if (userData?.firstname && userData.firstname !== 'Hidden') {
          setName(`${userData.firstname}`);
        }
      }, [userData]);
        

    useEffect(() => {
        if (isSuccess && onboardingData) {
        
            

          setIdentity(onboardingData.userType || "");
          setRegion(onboardingData.cityId?.toString() || "");
          setMaritalStatus(onboardingData.maritalStatus || null);
          setAccommodationPreference((onboardingData.accommodationPreference || []) as AccommodationPreference[]);
          setInterests(onboardingData.interests || []);
        }
    }, [isSuccess, onboardingData]);
    
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const finalSubmit = () => navigate({ to: APPROUTES.HOME, reloadDocument: true });
    const setFinalSubmit = useMutation({
        mutationFn: async () => {
            if (!userId) {
                throw new Error("User ID is null or undefined.");
            }
            return axiosInstance.post(ApiRoutes.SET_USER_ONBOARDING_COMPLETE(userId));
        },
        onSuccess: () => {
            nextStep();
        }
    })

    const setUserType = useMutation({
        mutationFn: async ({ userType }: { userType: UserType }) => {
            if (!userId) {
                throw new Error("User ID is null or undefined.");
            }
            return axiosInstance.post(ApiRoutes.SET_USER_TYPE(userId), {
                userType
            });
        },
        onSuccess: () => {
            nextStep();
        }
    })

    const setUserDemographics = useMutation({
        mutationFn: async ({ maritalStatus, accommodationPreference, cityId }: { maritalStatus: string, accommodationPreference: string, cityId: number }) => {
            if (!userId) {
                throw new Error("User ID is null or undefined.");
            }
            return axiosInstance.post(ApiRoutes.SET_USER_DEMOGRAPHICS(userId), {
                maritalStatus, accommodationPreference, cityId
            });
        },
        onSuccess: () => {
            nextStep();
        }
    })

    const setUserInterest = useMutation({
        mutationFn: async ({ interestIds }: { interestIds: number[] }) => {
            return axiosInstance.post(ApiRoutes.SET_USER_INTEREST
                (userId as string), {
                interestIds
            });
        },
        onSuccess: () => {
            setLoading(true);
            nextStep();
            setFinalSubmit.mutateAsync();
        }
    })

    const setUserName = useMutation({
        mutationFn: async ({ username }: { username: string }) => {
            if (!userId) {
                throw new Error("User ID is null or undefined.");
            }
            return axiosInstance.patch(ApiRoutes.USER_DELETE(userId), {
                firstname: username
            });
        },
        onSuccess: () => {
            nextStep();
        }
    })

    return {
        step,
        setStep,
        name,
        setName,
        identity,
        setIdentity,
        region,
        setRegion,
        interests,
        setInterests,
        loading,
        setLoading,
        nextStep,
        prevStep,
        finalSubmit,
        maritalStatus,
        setMaritalStatus,
        accommodationPreference,
        setAccommodationPreference,
        setUserInterest,
        setUserDemographics,
        setUserType,
        setUserName
    }
};

export default useOnboardingForm;                                        