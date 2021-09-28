import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  KakaoOAuthToken,
  login,
  logout,
} from '@react-native-seoul/kakao-login';
import API from '../api';

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

export const GoogleLogin = async (): Promise<AuthResult> => {
  try {
    const user = await GoogleSignin.signIn();
    const { data } = await API.post<AuthResult>('/Auth/google', {
      it: user.idToken,
    });
    // console.log('user: ', user, '\n backend: ', data);
    API.defaults.headers.Authorization = `Bearer ${data.auth.token}`;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('google login failed.');
  }
};
export const GoogleLogout = async () => {
  try {
    await GoogleSignin.signOut();
    API.defaults.headers.Authorization = '';
  } catch (e) {
    console.log(e);
    throw new Error('google logout failed.');
  }
};

export const KakaoLogin = async (): Promise<AuthResult> => {
  try {
    const token: KakaoOAuthToken = await login();
    const { data } = await API.post<AuthResult>('/Auth/kakao', {
      at: token.accessToken,
    });
    // console.log(data);
    API.defaults.headers.Authorization = `Bearer ${data.auth.token}`;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('kakao login failed.');
  }
};
export const KakaoLogout = async () => {
  try {
    console.log('kakao logout: ', await logout());
    API.defaults.headers.Authorization = '';
  } catch (e) {
    console.log(e);
    throw new Error('kakao logout failed.');
  }
};

/**
 * @success sns 로그인 성공
 * @returns
 * {
 *    newUser : boolean, -> 회원가입 분기
 *    token: string, -> auth
 *    email: string,
 *    nickname : string, -> user
 *    statusMessage : string,
 *    photo: string (s3 url),
 *    dislikeIngredient : string[],
 *    scrapRecipesId : string[], -> query
 *    likeRecipesId : string[], -> query
 *    historyRecipesId : string[], -> query
 *    refriger : [{title: string, data: string[]}] -> refriger
 *    error?: string
 * }
 *
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
