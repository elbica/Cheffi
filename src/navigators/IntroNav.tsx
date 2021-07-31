import React from 'react';
import {IntroNavParamList} from './Interface';
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
import {theme, vh} from '../assets/styles/theme';

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
    backgroundColor: theme.color.bgColor,
    height: 10 * vh,
    elevation: 0,
    shadowOpacity: 0,
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

  animationEnabled: true,
};

export default function IntroNav(): JSX.Element {
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
      <Stack.Screen name="join6" component={Join6} />
    </Stack.Navigator>
  );
}
