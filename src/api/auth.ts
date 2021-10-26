import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  KakaoOAuthToken,
  login,
  logout,
  refreshAccessToken,
} from '@react-native-seoul/kakao-login';
import API from './api';
import { store } from '../redux/store';
import debounce from 'debounce-promise';

/**
 * @description,
 *  1. 로그인 시도
 *  2. 토큰 서버에서 검증하고 결과 객체 리턴, 오류 발생 시 throw error
 *  3. user redux dispatch
 *  3-1. newUser 여부 따라 navigate로 회원가입 분기, 회원가입 완료 후 auth redux dispatch
 *  3-2. 기존 유저일 경우 바로 auth redux dispatch
 *
 * @returns AUTH_RESULT | ERROR
 */

/**
 * @function google
 */

const sendToken = async (token: string, platform: string) => {
  const { data } = await API.post<AuthResult>('/Auth', {
    token,
    platform,
  });
  return data;
};

const sendGoogleToken = debounce(
  async (token: string) => await sendToken(token, 'google'),
  1000 * 3,
  { leading: true },
);
const sendKakaoToken = debounce(
  async (token: string) => await sendToken(token, 'kakao'),
  1000 * 3,
  { leading: true },
);

export const GoogleLogin = async (): Promise<AuthResult> => {
  try {
    const user = await GoogleSignin.signIn();
    updateToken(user.idToken as string, 'google');
    console.log('get google token', user.idToken);

    const data = await sendGoogleToken(user.idToken as string);
    console.log('backend: ', data);
    // console.log('axios : ', API);

    return data;
  } catch (e) {
    console.log(e);
    throw new Error('google login failed.');
  }
};
export const GoogleLogout = async () => {
  try {
    await GoogleSignin.signOut();
    deleteToken();
  } catch (e) {
    console.log(e);
    throw new Error('google logout failed.');
  }
};

const silentGoogleLogin = async () => {
  const user = await GoogleSignin.signInSilently();
  updateToken(user.idToken as string, 'google');

  console.log('change axios header :', API.defaults.headers);
  const data = await sendGoogleToken(user.idToken as string);

  console.log('🧳silent google response data: ', data);
  return data;
};

/**
 * @function kakao
 */

export const KakaoLogin = async (): Promise<AuthResult> => {
  try {
    const token: KakaoOAuthToken = await login();
    updateToken(token.accessToken, 'kakao');
    console.log('get kakao token', token.accessToken);

    const data = await sendKakaoToken(token.accessToken as string);

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('kakao login failed.');
  }
};
export const KakaoLogout = async () => {
  try {
    console.log('kakao logout: ', await logout());
    deleteToken();
  } catch (e) {
    console.log(e);
    throw new Error('kakao logout failed.');
  }
};
/**
 *
 * @description
 * kakao 자동로그인은 google과 구조가 다르다.
 * google은 토큰을 새로 발급받는 처음부터 로그인하는 구조라면
 * kakao는 토큰의 유효성을 검증받아 예외처리 하는 구조이다.
 *
 * 기존 라이브러리 함수로는 자동 로그인 구현상 문제가 생겨
 * 라이브러리를 수정했다..
 * 기존 함수로는 갱신된 access token에 접근할 수 없기 때문이었다.
 *
 */
const silentKakaoLogin = async () => {
  const token: KakaoOAuthToken = await refreshAccessToken();
  updateToken(token.accessToken, 'kakao');

  const data = await sendKakaoToken(token.accessToken as string);

  console.log('👑silent kakao response data: ', data);
  return data;
};

export const silentLogin = async () => {
  const { platform } = store.getState().auth;
  console.log(`${platform} 🐹 자동 로그인!`);
  try {
    let token = '';
    if (platform === 'google') {
      token = (await silentGoogleLogin()).auth.token;
    } else if (platform === 'kakao') {
      token = (await silentKakaoLogin()).auth.token;
    }
    return token;
  } catch (e) {
    /**
     * @description
     * 1. native module 오류
     * 2. network error
     * 3.
     */
    return Promise.reject({ message: `${platform} 자동 로그인 실패` });
  }
};

const updateToken = (token: string, platform: string) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
  API.defaults.headers.common.Platform = platform;
};
const deleteToken = () => {
  delete API.defaults.headers.common.Authorization;
  delete API.defaults.headers.common.Platform;
};
