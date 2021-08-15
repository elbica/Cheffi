import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import RefrigerPage from '../pages/RefrigerPage';
import MyRecipePage from '../pages/MyRecipePage';
import HomePage from '../pages/HomePage';
import RecommendPage from '../pages/RecommnedPage';
import ProfilePage from '../pages/ProfilePage';
import { StackNavFactoryScreenName } from './Interface';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { vh } from '../assets/styles/theme';
import RecipeInfoPage from '../pages/RecipeInfoPage';
import { PrevArrow } from '../components/elements/Images';

const Stack = createStackNavigator();
const Header: StackNavigationOptions = {
  title: '소희님 다이어트 1일차',
  headerTransparent: true,
  headerBackground: () => <CustomStackHeader />,
  headerStyle: {
    height: Platform.OS === 'android' ? 10.5 * vh : 12 * vh,
  },
  headerBackImage: () => <PrevArrow />,

  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleVisible: false,
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
};

export default function StackNavFactory({
  screenName,
}: StackNavFactoryScreenName) {
  return (
    <Stack.Navigator screenOptions={Header} headerMode="float">
      {screenName === 'myRecipe' ? (
        <Stack.Screen name={'myRecipe'} component={MyRecipePage} />
      ) : null}
      {screenName === 'home' ? (
        <>
          <Stack.Screen name={'home'} component={HomePage} />
          <Stack.Screen name={'recommend'} component={RecommendPage} />
        </>
      ) : null}
      {screenName === 'recommend' ? (
        <Stack.Screen name={'recommend'} component={RecommendPage} />
      ) : null}
      {screenName === 'profile' ? (
        <Stack.Screen name={'profile'} component={ProfilePage} />
      ) : null}
      <Stack.Screen name={'refrigerator'} component={RefrigerPage} />
      <Stack.Screen
        name={'recipeInfo'}
        component={RecipeInfoPage}
        options={{
          headerBackground: undefined,
          // headerTransparent: true,
          headerTitleStyle: { color: 'transparent' },
          // headerStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
}

const CustomStackHeader = styled.View`
  background-color: #ff9140;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  flex: 1;
`;
