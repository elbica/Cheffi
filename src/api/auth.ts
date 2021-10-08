import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAccessToken,
  KakaoAccessTokenInfo,
  KakaoOAuthToken,
  login,
  logout,
} from '@react-native-seoul/kakao-login';
import API from './api';
import { store } from '../redux/store';

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

export const GoogleLogin = async (): Promise<AuthResult> => {
  try {
    const user = await GoogleSignin.signIn();
    updateToken(user.idToken as string, 'google');

    const { data } = await API.post<AuthResult>('/Auth', {
      token: user.idToken,
      platform: 'google',
    });
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
  const { data } = await API.post<AuthResult>('/Auth', {
    token: user.idToken,
    platform: 'google',
  });
  console.log('🧳silent google response data: ', data);
  return data;
};

/**
 * @function kakao
 */

export const KakaoLogin = async (): Promise<AuthResult> => {
  try {
    const token: KakaoOAuthToken = await login();
    console.log('kakao token...', token);
    updateToken(token.accessToken, 'kakao');

    const { data } = await API.post<AuthResult>('/Auth', {
      token: token.accessToken,
      platform: 'kakao',
    });
    // console.log(data);
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
const silentKakaoLogin = async () => {
  const token: KakaoAccessTokenInfo = await getAccessToken();
  console.log('kakao token...', token);

  updateToken(token.accessToken, 'kakao');
  const { data } = await API.post<AuthResult>('/Auth', {
    token: token.accessToken,
    platform: 'kakao',
  });
  console.log('👑silent kakao response data: ', data);
  return data;
};

export const silentLogin = async () => {
  const { platform } = store.getState().auth;
  console.log(`${platform} 🐹 자동 로그인!`);
  try {
    if (platform === 'google') {
      await silentGoogleLogin();
    } else if (platform === 'kakao') {
      await silentKakaoLogin();
    }
    return true;
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

/**
 *
 * @description 401, unauthorized
 * @response
 * {
 *    error: string
 *    type: EXPIRE_TOKEN | INVALID_TOKEN
 * }
 * @flow
 *  expire : 자동 로그인해서 토큰 갱신 후 다시 요청
 *  invalid : 초기 화면으로 이동
 *
 *
 * @description 403, forbidden
 * @response
 * {
 *    error: "권한이 없습니다."
 * }
 *
 *
 */
