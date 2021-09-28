import axios, { AxiosError } from 'axios';
import { API_URL } from '../../config';
import { GoogleLogin, KakaoLogin, GoogleLogout, KakaoLogout } from './auth';
import { sendForm } from './form';
import { getRecipeInfo, getRecipeList, getRecipeNumber } from './recipe';

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
API.interceptors.response.use(
  res => res,
  (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const type: API_ERROR_TYPE = err.response?.data.type;
      if (status === 401) {
        /**
         * @todo type에 따라서 자동 로그인 또는 초기 화면으로 이동하기
         */

        const ret: API_ERROR = {
          message: '❌인증이 필요합니다',
          type,
        };
        return Promise.reject(ret);
      } else if (status === 403) {
        /**
         * @todo 사용자에게 권한 없다는 알림창 띄우기
         */

        const ret: API_ERROR = {
          message: '❗️권한이 필요합니다',
          type: API_ERROR_TYPE.FORBIDDEN,
        };
        return Promise.reject(ret);
      }
    }
  },
);

export default API;
export { sendForm };
export { getRecipeInfo, getRecipeList, getRecipeNumber };
export { GoogleLogin, KakaoLogin, GoogleLogout, KakaoLogout };
