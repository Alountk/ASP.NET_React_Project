import axios from 'axios';
// import getCookie from '../helpers/getCookie';

class Api {
  constructor() {
    // const header = document.cookie.includes('jwt')
    //   ? {
    //       Authorization: `Bearer ${getCookie('jwt')}`,
    //     }
    //   : null;
    const axiosInstance = axios.create({
    //   baseURL: process.env.API_BASE_URL,
      baseURL: "https://localhost:5001/api/",
      // headers: {'Content-Type': 'text/plain'},
      headers: {'Content-Type': 'application/json'},
    });
    axiosInstance.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        if (error.response.status === 401) {
          error.message = 'INVALID TOKEN';
          window.location.replace(process.env.LOGIN_PAGE_URL);
          return Promise.reject(error);
        }
        if (error.response.status === 400) {
          error.message = "S'ha produït un error";
          return Promise.reject(error);
        }
        if (error.response.status === 404) {
          error.message = "S'ha produït un error";
          return Promise.reject(error);
        }
        if (error.response.status === 500) {
          error.message = "S'ha produït un error";
          return Promise.reject(error);
        }
        switch (error.response.data.message) {
          case 'Name can not be empty':
            error.message = 'CLIENT_NAME_EMPTY';
            return Promise.reject(error);
          case 'Provided Number is already in use by another Client':
            error.message = 'CLIENT_NUMBER_EMPTY_OR_IN_USE';
            return Promise.reject(error);
          case "Can't overwrite cause with io.vement.api.client.domain.ClientNumberAlreadyInUse: Provided Number is already in use by another Client; nested exception is java.lang.IllegalStateException: Can't overwrite cause with io.vement.api.client.domain.ClientNumberAlreadyInUse: Provided Number is already in use by another Client":
            error.message = 'CLIENT_ALREADY_EXISTS';
            return Promise.reject(error);
          case "Requested brand doesn't exist":
            error.message = 'BRAND_NOT_EXIST';
            return Promise.reject(error);
          default:
            error.message = 'UNCONTROLLED_ERROR';
            return Promise.reject(error);
        }
      },
    );
    this.api = axiosInstance;
  }

  cleanParams(params) {
    const cleanedParams = JSON.parse(JSON.stringify(params));
    if (cleanedParams) {
      return (
        '?' +
        Object.keys(cleanedParams)
          .map(key => key + '=' + cleanedParams[key])
          .join('&')
      );
    }
    return null;
  }
}
export default Api;
