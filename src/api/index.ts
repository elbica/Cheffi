import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../../config';
import {
  GoogleLogin,
  KakaoLogin,
  GoogleLogout,
  KakaoLogout,
  SilentLogin,
} from './auth';
import { sendForm } from './form';
import { getRecipeInfo, getRecipeList, getRecipeNumber } from './recipe';
import { patchRefriger, patchRecipeCount } from './user';

export enum API_ERROR_TYPE {
  EXPIRE,
  INVALID,
  FORBIDDEN,
}
type API_ERROR = {
  message: string;
  type: API_ERROR_TYPE;
};

const API = axios.create({
  baseURL: API_URL,
});

/**
 * @todo
 * 추후 스플래시 화면 제작 시 default header에
 * 구글,카카오 토큰을 라이브러리 함수로 불러와 저장한다.
 * 플랫폼 구별은 persist storage에 저장된 platform으로 한다.
 *
 * 로그인 시에도 default header를 변경한다.
 *
 * 토큰은 리덕스에 저장하지 않고
 * interceptor는 사용하지 않는다.
 */
// API.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${MOCK_TOKEN}`;
//   return config;
// });

/**
 * @typedef API_ERROR_TYPE
 *    enum { EXPIRE, INVALID, FORBIDDEN }
 */

const onFulfilled = (res: AxiosResponse) => {
  console.log('api response: ', res);
  console.log('api default headers: ', API.defaults.headers);
  return res;
};
// const retryAPI = (config : AxiosRequestConfig)=> new Promise(())
const onRejected = (err: Error | AxiosError) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const type: API_ERROR_TYPE = err.response?.data.type;
    let ret: API_ERROR | undefined;
    if (status === 401) {
      /**
       * @todo type에 따라서 자동 로그인 또는 초기 화면으로 이동하기
       */

      //자동 로그인하고 retry하기
      if (type === API_ERROR_TYPE.EXPIRE) {
        console.log('👓자동 로그인 응답');
        return SilentLogin().then(() => API.request(err.config));
      }

      //상위 함수에서 초기 화면으로 이동해야 함
      ret = {
        message: '❌인증이 필요합니다',
        type,
      };
    } else if (status === 403) {
      /**
       * @todo 사용자에게 권한 없다는 알림창 띄우기
       */

      ret = {
        message: '❗️권한이 필요합니다',
        type: API_ERROR_TYPE.FORBIDDEN,
      };
    } else {
      ret = {
        message: '❓알 수 없는 오류가 발생했습니다',
        type: API_ERROR_TYPE.FORBIDDEN,
      };
    }
    console.log(
      'api err : ',
      ret,
      '\nmessage',
      err,
      '\nconfig ',
      err.config,
      '\nmessage:',
      err.message,
    );
    return Promise.reject(ret);
  }
};
API.interceptors.response.use(onFulfilled, onRejected);

export default API;
export { sendForm };
export { getRecipeInfo, getRecipeList, getRecipeNumber };
export { GoogleLogin, KakaoLogin, GoogleLogout, KakaoLogout };
export { patchRecipeCount, patchRefriger };

/**
 * export const delPhotoCC = async photoIndex => {
  const url = `${API_URL}/ccu/company/photos/${photoIndex}`;
  const token = await AsyncStorage.getItem('token');
  const callback = {
    onSuccess: res => {
      console.log('DelPhotoCC', res.status, url);
      console.log();
      return {data: null, err: null};
    },
    onFail: async res => {
      const err = await res.json();
      console.log('DelPhotoCC', err, url);
      console.log();
      if (res.status === 401)
        return onTokenExpired(() => delPhotoCC(photoIndex));
      return {data: null, err};
    },
    onErr: err => {
      console.log('DelPhotoCC', err, url);
      console.log();
      return {data: null, err};
    },
  };
  return makeDeleteRequest(url, token, null, callback);
};



 */
