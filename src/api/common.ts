import createHttp from "http-request-fetch";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DEFAULT_CONFIG = { headers: { "Content-Type": "application/json" } };

/**
 * @example
 *   apiFetch
    .get("https://www.na-holo.site/api/recipes")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
 */
export const apiFetch = createHttp(BASE_URL, DEFAULT_CONFIG);

apiFetch.registerInterceptor({
  onRequest: (config) => {
    // request를 보내기 전 수행할 로직
    return config;
  },
  onResponse: (response) => {
    // response를 받고나서 수행할 로직
    return response;
  },
  onRequestError: (reason) => {
    // request 과정에서 에러가 발생할 경우 수행할 로직
    return Promise.reject(reason);
  },
  onResponseError: (reason) => {
    // response 과정에서 에러가 발생할 경우 수행할 로직
    return Promise.reject(reason);
  },
});
