import { AccommodationPreference, MaritalStatus } from "../hooks/useOnboardingForm";

export interface IUseOnboardingFormReturn {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;

  name: string;
  setName: Dispatch<SetStateAction<string>>;

  identity: string;
  setIdentity: Dispatch<SetStateAction<string>>;

  region: string;
  setRegion: Dispatch<SetStateAction<string>>;

  interests: string[];
  setInterests: Dispatch<SetStateAction<string[]>>;

  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  maritalStatus: MaritalStatus | null;
  setMaritalStatus: Dispatch<SetStateAction<MaritalStatus | null>>;
  accommodationPreference: AccommodationPreference[];
  setAccommodationPreference: Dispatch<SetStateAction<AccommodationPreference[]>>;

  nextStep: () => void;
  prevStep: () => void;
  finalSubmit: () => void;
  setUserInterest: UseMutationResult<AxiosResponse<any, any>, Error, {
    id: string;
    interestIds: number[];
  }, unknown>, 
  setUserDemographics: UseMutationResult<AxiosResponse<any, any>, Error, {
    id: string;
    maritalStatus: string;
    accommodationPreference: string;
    cityId: number;
  }, unknown>;
  
  setUserType: UseMutationResult<AxiosResponse<any, any>, Error, {
    id: string;
    userType: string;
  }, unknown>;
  
  setUserName: UseMutationResult<AxiosResponse<any, any>, Error, {
    id: string;
    username: string;
  }, unknown>;
}