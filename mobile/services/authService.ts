import { api } from "./api";
import storageService from "./storageService";

export enum AuthenticationState {
  Authenticated = "Authenticated",
  Unauthorized = "Unauthorized",
  Error = "Error",
  Forbidden = "Forbidden",
  CodeMissing = "CodeMissing",
  RedirectToRegister = "RedirectToRegister",
}

const ACCESS_TOKEN_KEY = "token";

export const findUser = async (values: any) => {
  try {
    const { data } = await api.post("/auth/find-user", values);
    return data.payload;
  } catch (error: any) {
    if (error?.response?.data?.payload?.redirectToRegister) {
      return AuthenticationState.RedirectToRegister;
    }
    return AuthenticationState.Error;
  }
};

export const authenticate = async (values: any) => {
  try {
    const { data } = await api.post("/auth/login", values);
    saveToken(data.payload);
    return AuthenticationState.Authenticated;
  } catch (error: any) {
    if (error?.response?.data?.payload?.redirectToRegister) {
      return AuthenticationState.RedirectToRegister;
    }
    return AuthenticationState.Error;
  }
};

export const sendSms = async (values: any) => {
  try {
    const { data } = await api.post("/auth/send-sms", values);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const verifySms = async (values: any) => {
  try {
    const { data } = await api.post("/auth/verify-sms", values);
    console.log(data);
    return data.ok;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const register = async (values: any) => {
  try {
    const { data } = await api.post("/auth/register", values);
    console.log(data);
    return data.ok;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const saveToken = (token: any) => {
  storageService.set(ACCESS_TOKEN_KEY, token);
};

export const clearUserData = () => {
  storageService.remove(ACCESS_TOKEN_KEY);
};

export const getToken = (): string | null => {
  return storageService.get(ACCESS_TOKEN_KEY);
};
