export interface ILoginMutationResponseData {
  accessToken: string;
  userId: string;
  refreshToken: string;
  isOnBoarded: boolean
}

export interface ILoginMutationResponse {
  data: ILoginMutationResponseData;
  status: string;
}

export interface IContextType {
  auth?: {
    isAuthenticated: boolean;
    removeToken: () => void;
  };
}

export interface IRefreshTokenResponse {
  status: string;
  data:   IRefreshTokenResponseData;
}

export interface IRefreshTokenResponseData {
  accessToken:  string;
  refreshToken: string;
}
