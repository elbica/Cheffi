import React from 'react';
import { Image } from 'react-native';
import { Section, vw } from '../assets/styles/theme';
import styled from 'styled-components/native';
import { ImageButton } from '../components/elements/Buttons';
import { useDispatch } from 'react-redux';
import { LoginButtons } from '../assets/icons/icons';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { CLIENT_ID, IOS_ID } from '../../config';
import { GoogleLogin, KakaoLogin } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';
import { userLogin } from '../redux/modules/auth';
import { userInit } from '../redux/modules/user';

GoogleSignin.configure({
  webClientId: CLIENT_ID,
  iosClientId: IOS_ID,
  offlineAccess: true,
});

const MOCK_AUTH_RESULT: AuthResult = {
  auth: {
    newUser: false,
    token: 'test_token',
  },
  info: { email: 'test_email' },
};

export default function IntroPage(): JSX.Element {
  console.log('intro log');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleFlow = async (result: AuthResult) => {
    /**
     * @todo 임시 유저 데이터 사용
     *
     * 3-1. newUser 여부 따라 navigate로 회원가입 분기, 회원가입 완료 후 auth redux dispatch
     * 3-2. 기존 유저일 경우 바로 auth redux dispatch
     */
    dispatch(userInit(MOCK_AUTH_RESULT.info));
    if (MOCK_AUTH_RESULT.auth.newUser) {
      dispatch(
        userLogin({ token: MOCK_AUTH_RESULT.auth.token, isLogin: false }),
      );
      navigation.navigate('join1');
    } else {
      dispatch(
        userLogin({ token: MOCK_AUTH_RESULT.auth.token, isLogin: true }),
      );
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const AuthResult = await GoogleLogin();
      handleFlow(AuthResult);
    } catch (e) {
      console.log(e);
    }
  };
  const handleKakaoLogin = async () => {
    try {
      const AuthResult = await KakaoLogin();
      handleFlow(AuthResult);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WrapSection flexNumber={1}>
      <TestLogoSection flexNumber={1.2} justify="flex-end">
        <Image
          source={require('../assets/images/CheffiLogo.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ height: 160, width: 160 }}
          resizeMode="contain"
        />
      </TestLogoSection>
      <LoginSection>
        <ImageButton
          onPress={handleKakaoLogin}
          height="60px"
          radius={0}
          children={
            <Image
              source={LoginButtons.kakao}
              style={{ width: 80 * vw }}
              resizeMode="contain"
            />
          }
        />
        <GoogleSigninButton
          // style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={handleGoogleLogin}
        />
      </LoginSection>
    </WrapSection>
  );
}

const WrapSection = styled(Section)`
  background: ${({ theme }) => theme.color.bgColor};
`;
const TestLogoSection = styled(Section)``;
const LoginSection = styled(Section)``;
