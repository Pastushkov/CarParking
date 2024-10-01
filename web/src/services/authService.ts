import { api } from './api';

export enum AuthenticationState {
  Authenticated = 'Authenticated',
  Unauthorized = 'Unauthorized',
  Error = 'Error',
  Forbidden = 'Forbidden',
  CodeMissing = 'CodeMissing',
}

const ACCESS_TOKEN_KEY = 'access-token';
const USERNAME_KEY = 'username';

export const authenticate = async (values: any): Promise<any> => {
  try {
    const { data } = await api.post('/auth/login', values);
    saveToken(data.token);
    return AuthenticationState.Authenticated;
  } catch (e) {
    clearUserData();
    return AuthenticationState.Error;
  }
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return token?.length! > 0;
};

export const getToken = (): string | null => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getUsername = (): string | null => {
  return sessionStorage.getItem(USERNAME_KEY);
};

export const registerUser = async (): Promise<any | undefined> => {
  try {
    const { data } = await api.post<any>('/oauth/register', {});
    saveToken(data.token);
    return data;
  } catch (e) {
    clearUserData();
    window.location.replace('/login');
  }
};

const saveToken = (token: any) => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const clearUserData = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};
