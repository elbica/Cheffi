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
import { useNavigation } from '@react-navigation/core';
import { userLogin } from '../redux/modules/auth';
import { userInit } from '../redux/modules/user';
import { GoogleLogin, KakaoLogin } from '../api';

GoogleSignin.configure({
  webClientId: CLIENT_ID,
  iosClientId: IOS_ID,
  offlineAccess: true,
});

export default function IntroPage(): JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleFlow = async (result: AuthResult, platform: string) => {
    /**
     * @todo 임시 유저 데이터 사용
     *
     * 3-1. newUser 여부 따라 navigate로 회원가입 분기, 회원가입 완료 후 auth redux dispatch
     * 3-2. 기존 유저일 경우 바로 auth redux dispatch
     */
    dispatch(userInit({}));
    if (result.newUser) {
      dispatch(
        userLogin({
          token: result.token,
          isLogin: false,
          platform,
        }),
      );
      navigation.navigate('join1');
    } else {
      dispatch(
        userLogin({
          token: result.token,
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

/**
 *   refriger: [
    {
      title: '가공식품',
      data: [
        '스팸',
        '햇반',
        '즉석밥'
      ]
    },
    {
      title: '계란/유제품',
      data: [
        '계란',
        '달걀',
        '버터 무염',
        '버터'
      ]
    },
    {
      title: '과일류',
      data: []
    },
    {
      title: '떡/밥/곡류',
      data: []
    },
    {
      title: '빵/면/만두류',
      data: []
    },
    {
      title: '채소류',
      data: [
        '배추김치',
        '양파',
        '쪽파',
        '무',
        '청양고추',
        '두부',
        '김치',
        '고구마',
        '당근',
        '감자'
      ]
    },
    {
      title: '수산/건어물',
      data: [
        '오징어',
        '김'
      ]
    },
    {
      title: '육류',
      data: []
    },
    {
      title: '음료/주류',
      data: [
        '물'
      ]
    },
    {
      title: '장/양념/소스류',
      data: [
        '소금',
        '후추',
        '설탕',
        '간장',
        '고춧가루',
        '참기름',
        '진간장',
        '깨',
        '꿀',
        '물엿',
        '올리고당',
        '식용유',
        '검은깨',
        '식초',
        '쇠고기다시다',
        '된장',
        '올리브유'
      ]
    },
    {
      title: '초콜릿/과자/견과류',
      data: []
    },
    {
      title: '향신료/가루류',
      data: []
    }
  ],
 */
