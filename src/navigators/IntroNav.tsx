import React from 'react';
import {IntroNavParamList, IntroNavProps} from './Interface';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import IntroPage from '../pages/IntroPage';
import Join1 from '../pages/ProfileSetting/Join1';
import Join2 from '../pages/ProfileSetting/Join2';
import Join3 from '../pages/ProfileSetting/Join3';
import Join4 from '../pages/ProfileSetting/Join4';
import Join5 from '../pages/ProfileSetting/Join5';
import Join6 from '../pages/ProfileSetting/Join6';
import {Image} from 'react-native';
import {ImageStyle} from 'react-native';
import {vh} from '../assets/styles/theme';

const Stack = createStackNavigator<IntroNavParamList>();
const prevArrowStyle: ImageStyle = {
  margin: 3 * vh,
  width: 36,
  height: 26,
  resizeMode: 'contain',
  opacity: 0.8,
};
const StackNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: 'transparent',
    height: 10 * vh,
    elevation: 0,
  },
  headerTitleStyle: {
    color: 'transparent',
  },
  headerBackTitleStyle: {
    color: 'transparent',
  },
  headerBackImage: () => (
    <Image
      source={require('../assets/icons/prevArrow.png')}
      style={prevArrowStyle}
    />
  ),
};

export default function IntroNav({setLogin}: IntroNavProps): JSX.Element {
  const authCheck = () => {
    //카카오 또는 구글 로그인이 됐을 경우
    //asychStroage에 토큰 저장한 후
    //초기 프로필 정보를 입력한 후
    //로그인 처리를 한다
    setLogin(true);
  };

  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      screenOptions={StackNavOptions}>
      <Stack.Screen
        name="intro"
        component={IntroPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="join1" component={Join1} />
      <Stack.Screen name="join2" component={Join2} />
      <Stack.Screen name="join3" component={Join3} />
      <Stack.Screen name="join4" component={Join4} />
      <Stack.Screen name="join5" component={Join5} />
      <Stack.Screen
        name="join6"
        children={() => <Join6 setLogin={setLogin} />}
      />
    </Stack.Navigator>
  );
}
