import axios, { AxiosRequestConfig } from "axios";
import storageService from "./storageService";
import { API_HOST } from "@env";

export const api = axios.create({
  baseURL: `${API_HOST}`,
});

function enrichHeadersWithContentType(config: AxiosRequestConfig): any {
  if (config.headers) {
    const contentTypeDefined: any = config.headers["Content-Type"];
    if (contentTypeDefined) {
      return config.headers;
    } else {
      return { ...config.headers, "Content-Type": "application/json" };
    }
  }
  return config.headers;
}

api.interceptors.request.use(
  (config) => {
    const token: string = storageService.get("token");

    if (!token) {
      return config;
    }

    const formattedToken = token.replace(/^"|"$/g, "");
    const headers = enrichHeadersWithContentType(config);

    return {
      ...config,
      headers: {
        ...headers,
        Authorization: `Bearer ${formattedToken}`,
      },
    };
  },
  (error) => {
    console.log("error here!!");

    return Promise.reject(error);
  }
);
