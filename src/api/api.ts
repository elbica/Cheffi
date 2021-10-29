import axios, { AxiosResponse, AxiosError } from 'axios';
import { silentLogin } from './auth';
import { API_URL } from '../../config';

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

const onFulfilled = (res: AxiosResponse) => {
  console.log('api response: ', res);
  return res;
};
const onRejected = (err: Error | AxiosError) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const type: API_ERROR_TYPE = err.response?.data.type;
    let ret: API_ERROR | undefined;
    if (status === 401) {
      //자동 로그인하고 retry하기, 무한 루프 방지
      if (!err.config.headers.Loop) {
        console.log('👓자동 로그인 응답: ', err.config.url);
        return silentLogin().then(token => {
          err.config.headers.Authorization = `Bearer ${token}`;
          err.config.headers.Loop = true;
          console.log('바뀐 config: ', err.config, 'token: ', token);
          return API.request(err.config);
        });
      }

      // 상위 함수에서 초기 화면으로 이동해야 함
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
      err.response,
    );
    return Promise.reject(ret);
  }
};
API.interceptors.response.use(onFulfilled, onRejected);

export default API;
