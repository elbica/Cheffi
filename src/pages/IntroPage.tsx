import React from 'react';
import { Image } from 'react-native';
import { Section, vw } from '../assets/styles/theme';
import styled from 'styled-components/native';
import { ImageButton } from '../components/elements/Buttons';
import { useDispatch } from 'react-redux';
import { LoginButtons } from '../assets/icons/icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CLIENT_ID, IOS_ID } from '../../config';
import { useNavigation } from '@react-navigation/core';
import { GoogleLogin, KakaoLogin } from '../api';
import { userInit, setRefriger, userLogin } from '../redux/modules';

GoogleSignin.configure({
  webClientId: CLIENT_ID,
  iosClientId: IOS_ID,
  offlineAccess: true,
});

export default function IntroPage(): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleFlow = (result: AuthResult, platform: string) => {
    dispatch(userInit(result.info));
    dispatch(setRefriger(result.refriger));
    if (result.auth.newUser) {
      dispatch(
        userLogin({
          isLogin: false,
          platform,
        }),
      );
      navigation.navigate('join1');
    } else {
      dispatch(
        userLogin({
          isLogin: true,
          platform,
        }),
      );
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const AuthResult = await GoogleLogin();
      handleFlow(AuthResult, 'google');
    } catch (e) {
      console.log(e);
    }
  };
  const handleKakaoLogin = async () => {
    try {
      const AuthResult = await KakaoLogin();
      handleFlow(AuthResult, 'kakao');
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
              style={{ width: 84 * vw }}
              resizeMode="contain"
            />
          }
        />
        <ImageButton
          onPress={handleGoogleLogin}
          height="60px"
          radius={0}
          children={
            <Image
              source={LoginButtons.google}
              style={{ width: 84 * vw }}
              resizeMode="contain"
            />
          }
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
