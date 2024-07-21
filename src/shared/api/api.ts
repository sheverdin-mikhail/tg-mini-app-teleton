import axios from 'axios';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';

export const $api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// $api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const tokensJson = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);
//     let tokens: JWTTokenData | null = null;
//     if (tokensJson) {
//       tokens = JSON.parse(tokensJson);
//     }
//     // If the error status is 401 and there is no originalRequest._retry flag,
//     // it means the token has expired and we need to refresh it
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // const response = await axios.post<JWTTokenData>(`${process.env.REACT_APP_API_BASE_URL}/api/auth/`, { refresh: token });
//         // const token = response.data;
//         // if (token) {
//         // const newToken: JWTTokenData = token
//         // localStorage.setItem(USER_LOCALSTORAGE_TOKEN, JSON.stringify(newToken));
//         // Retry the original request with the new token
//         // originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axios(originalRequest);
//         // }
//       } catch (error: any) {
//         localStorage.removeItem(USER_LOCALSTORAGE_TOKEN);
//       }
//     }
//     return Promise.reject(error);
//   },
// );
