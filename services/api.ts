import axios from "axios";
import { Config } from "./config";
import { AuthActions, useAuth } from "../zustand/auth.store";

export const createApiClient = (auth = true) => {
  const http = axios.create({
    baseURL: Config.apiUrl,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  http.interceptors.request.use(
    function (config: any) {
      const token: any = useAuth.getState().token;



      if (auth) {
        if (token) {
          config.headers = {
            ...config.headers, Authorization: `${token}`,

          };

          // config.headers = {...config.headers, 'content-Type':'application/x-www-form-urlencoded'}
        }

      }

      console.log(config.headers, token);
      // console.log(config);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (request) => {
      return request;
    },
    (err) => {
      if (err.response) {
        if (
          err.response.data &&
          err.response.data.message === "Token Expired"
        ) {
          AuthActions.logout();
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );

  return http;
};
