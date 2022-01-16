import axios, { AxiosResponse } from 'axios';
import Cookie from 'js-cookies';
import ApiData from '../dtos/ApiData';
import ApiResponseError from '../dtos/ApiResponseError';

import Router from 'next/router';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

function setHeaders(res: AxiosResponse<any>) {
  if(res.headers['access-token'] && res.headers['access-token'] !== '') {
    const apiData: ApiData = {
      'access-token': res.headers['access-token'],
      client: res.headers.client,
      expiry: res.headers.expiry,
      'token-type': res.headers['token-type'],
      uid: res.headers.uid
    };

    api.defaults.headers = apiData;
    Cookie.set('@api-data', apiData);
  }
}

api.interceptors.response.use(res => {
  setHeaders(res);
  return res;
}
, err => {
  if (err.response) {
    setHeaders(err.response);

    const data = err.response.data;

    if (data && data.errors && data.errors.fields) {
      const errors = data.errors as ApiResponseError;

      const fieldsName = Object.keys(errors.fields)

      fieldsName.forEach(error => {
        toast.error(error + ': ' + errors.fields[error].join(`, `))
      })

      console.log('errors', errors);
    }
  }

  if (err.response && (
      err.response.status === 401 ||
      err.response.status === 403
    )) {
    Router.push('/Auth/Login');
  }

  throw err;
});

api.interceptors.request.use(req => {
  if(req.url.includes('admin')) {
    const apiData: ApiData = JSON.parse(Cookie.get('@api-data'));
    req.headers = apiData;
  }

  return req;
})

export default api;
