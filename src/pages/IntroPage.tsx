import React, { useState } from 'react';
import { Image } from 'react-native';
import { Section, vw } from '../assets/styles/theme';
import styled from 'styled-components/native';
import { ImageButton } from '../components/elements/Buttons';
import { useDispatch } from 'react-redux';
import { LoginButtons } from '../assets/icons/icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CLIENT_ID, IOS_ID, PRIVACY_POLICY_URL } from '../../config';
import { useNavigation } from '@react-navigation/core';
import { GoogleLogin, KakaoLogin } from '../api';
import { userInit, setRefriger, userLogin } from '../redux/modules';
import Fonts from '../components/elements/Fonts';
import { OpenLinkModal } from '../components/__recipeInfo/OpenLinkModal';
import { TouchableOpacity } from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId: CLIENT_ID,
  iosClientId: IOS_ID,
  offlineAccess: true,
});

export default function IntroPage(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
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
    <>
      <WrapSection flexNumber={1}>
        <Section flexNumber={1.2} justify="flex-end">
          <Image
            source={require('../assets/images/CheffiLogo.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 160, width: 160 }}
            resizeMode="contain"
          />
        </Section>
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
        <Footer>
          <Fonts
            children="© 2021. Cheffi all rights reserved."
            color="tableGray"
            size="small"
          />
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Fonts
              children="  |  개인정보 처리방침"
              color="tableGray"
              size="small"
            />
          </TouchableOpacity>
        </Footer>
      </WrapSection>
      <OpenLinkModal
        setIsOpen={setOpenModal}
        isOpen={openModal}
        URL={PRIVACY_POLICY_URL}
      />
    </>
  );
}

const WrapSection = styled(Section)`
  background: ${({ theme }) => theme.color.bgColor};
`;
const LoginSection = styled(Section)`
  position: relative;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 40px;
`;
