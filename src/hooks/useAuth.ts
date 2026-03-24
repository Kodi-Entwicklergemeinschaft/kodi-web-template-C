import { STORAGE_KEYS } from '../utilities/constants';
import axiosInstance from '../axiosConfig';
import { ApiRoutes } from '../utilities/routes';

export const getTokenValues = (token: string) => {
  if (!token) return { payload: null, isTokeExpired: true };
  const base64Url = token?.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  const expiryTime = payload.exp * 1000;
  const currentTime = Date.now();
  const isTokeExpired = currentTime > expiryTime;
  return { payload, isTokeExpired }
}
export const fetchUserAccountDetails = async () => {
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) ?? '';
  const oldRefreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ?? ''
  const { data: { accessToken, refreshToken } } = await axiosInstance.post(ApiRoutes.REFRESH_TOKEN_BY_USER_ID(userId), {
    refreshToken: oldRefreshToken
  });
  if (accessToken && refreshToken) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
  return accessToken;
}
const useAuth = () => {
  const removeToken = () => localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  const checkTokenValidity = () => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      try {
        const { payload, isTokeExpired } = getTokenValues(token);

        if (!payload.exp) {
          console.error('Token does not have an expiry claim.');
          return false;
        }
        if (!isTokeExpired) {
          return true;
        } else {
          fetchUserAccountDetails();
          console.error('Token has expired.');
          return false;
        }
      } catch (error) {
        removeToken();
        console.error('Invalid token.', error);
        return false;
      }
    }
    return false;
  };
  return { isAuthenticated: checkTokenValidity(), removeToken };
};

export default useAuth;
