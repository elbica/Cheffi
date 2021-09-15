import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
import { userLogin } from '../redux/modules/auth';

export const GoogleLogin = async () => {
  try {
    const user = await GoogleSignin.signIn();
    const token = await GoogleSignin.getTokens();
    console.log('user : ', user, '\ntoken : ', token);
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
