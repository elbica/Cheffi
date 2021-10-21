import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import IntroPage from '../pages/IntroPage';
import Join1 from '../pages/Join/Join1';
import Join2 from '../pages/Join/Join2';
import Join3 from '../pages/Join/Join3';
import Join4 from '../pages/Join/Join4';
import Join5 from '../pages/Join/Join5';
import Join6 from '../pages/Join/Join6';
import { theme, vh } from '../assets/styles/theme';
import { PrevArrow } from '../components/elements/Images';

const Stack = createStackNavigator<IntroNavParamList>();

const StackNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.color.bgColor,
    height: 12 * vh,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    color: 'transparent',
  },

  headerBackTitleStyle: {
    color: 'transparent',
  },
  headerBackImage: () => <PrevArrow />,
  // headerLeft: () => <PrevArrow />,

  animationEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
  headerTransparent: true,
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
        options={{ headerShown: false }}
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
