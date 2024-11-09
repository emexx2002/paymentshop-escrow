import axios from "axios";
import { Config } from "./config";
import { AuthActions, useAuth } from "../zustand/auth.store";

export const createApiClient = (auth = true) => {
  const http = axios.create({
    baseURL: Config.apiUrl,
    // withCredentials: true, // Enables sending cookies
  });

  http.interceptors.request.use(
    function (config: any) {
      const token = useAuth.getState().token;

      if (auth && token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`, // Adds Bearer prefix for Authorization
        };
      }

      return config;
    },
    function (error) {
      // Handle request error
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // Check for token expiration or invalid token message
        if (error.response.data?.message === "Token Expired") {
          AuthActions.logout();
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );

  return http;
};
