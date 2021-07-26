import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import RefrigerPage from '../pages/RefrigerPage';
import MyRecipePage from '../pages/MyRecipePage';
import HomePage from '../pages/HomePage';
import RecommendPage from '../pages/RecommnedPage';
import ProfilePage from '../pages/ProfilePage';
import {StackNavFactoryScreenName} from './Interface';
import {Platform} from 'react-native';

const Stack = createStackNavigator();
const Header: StackNavigationOptions = {
  title: '소희님 다이어트 1일차',
  headerStyle: {
    backgroundColor: '#FF9140',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    height: Platform.OS === 'android' ? 80 : 100,
  },
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleVisible: false,
};

export default function StackNavFactory({
  screenName,
}: StackNavFactoryScreenName) {
  return (
    <Stack.Navigator screenOptions={Header}>
      {screenName === 'myRecipe' ? (
        <Stack.Screen name={'myRecipe'} component={MyRecipePage} />
      ) : null}
      {screenName === 'home' ? (
        <Stack.Screen name={'home'} component={HomePage} />
      ) : null}
      {screenName === 'recommend' ? (
        <Stack.Screen name={'recommend'} component={RecommendPage} />
      ) : null}
      {screenName === 'profile' ? (
        <Stack.Screen name={'profile'} component={ProfilePage} />
      ) : null}
      <Stack.Screen name={'refrigerator'} component={RefrigerPage} />
    </Stack.Navigator>
  );
}
