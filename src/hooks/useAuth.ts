import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import { API_URL } from '../../config';
import { userLogin } from '../redux/modules/auth';
import { UserState } from '../redux/modules/user';
axios.defaults.baseURL = API_URL;

export const GoogleLogin = async () => {
  try {
    const user = await GoogleSignin.signIn();
    const token = await GoogleSignin.getTokens();
    console.log('user : ', user, '\ntoken : ', token);
    console.log(
      (
        await axios.get(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${token.idToken}`,
        )
      ).data,
    );

    return userLogin(user.user.email);
  } catch (e) {
    console.log(e);
    throw new Error('google login failed.');
  }
};

export const KakaoLogin = async () => {
  try {
    const token: KakaoOAuthToken = await login();
    const profile: KakaoProfile = await getProfile();
    console.log(token, '\n', profile);
    return userLogin(profile.email);
  } catch (e) {
    console.log(e);
    throw new Error('kakao login failed.');
  }
};

/**
 *
 * @param token access token or id token
 * @returns data : newUser 여부 및 redux user 정보
 * db에 등록된 유저이면 redis token 갱신 후 바로 로그인 창으로, 없는 유저이면 회원가입 창으로
 */
export const SendToken = async (
  token: string,
): Promise<{ newUser: boolean } & UserState> => {
  const { data } = await axios.post('/user/test', token);
  return data;
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
 * @fail sns 로그인 실패 (token 검증 실패)
 * @returns
 * {
 *    error: string
 * }
 *
 */
