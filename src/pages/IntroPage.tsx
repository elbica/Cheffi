import React from 'react';
import {Image} from 'react-native';
import {Section} from '../assets/styles/theme';
import {IntroPageProps} from './Interface';
import styled from 'styled-components/native';
import LinkButton from '../components/elements/Buttons';
import {useDispatch} from 'react-redux';
import {userLogin} from '../redux/modules/auth';

const WrapSection = styled(Section)`
  background: ${({theme}) => theme.color.bgColor};
`;
const TestLogoSection = styled(Section)``;
const LoginSection = styled(Section)``;

export default function IntroPage({navigation}: IntroPageProps): JSX.Element {
  const authCheck = () => {
    //카카오 또는 구글 로그인이 됐을 경우
    //asychStroage에 토큰 저장한 후
    //초기 프로필 정보를 입력한 후
    //로그인 처리를 한다
    dispatch(userLogin('sohee'));
  };
  const dispatch = useDispatch();

  return (
    <WrapSection flexNumber={1}>
      <TestLogoSection flexNumber={1.25} justify="flex-end">
        <Image
          source={require('../assets/images/CheffiLogo.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{height: 160, width: 160}}
          resizeMode="contain"
        />
      </TestLogoSection>
      <LoginSection flexNumber={1}>
        <LinkButton
          title="바로 로그인"
          width="100px"
          height="30px"
          onPress={authCheck}
        />
        <LinkButton
          title="프로필 설정"
          width="100px"
          height="30px"
          onPress={() => navigation.navigate('join1')}
        />
      </LoginSection>
    </WrapSection>
  );
}
