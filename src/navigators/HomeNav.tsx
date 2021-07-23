import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import HomePage from '../pages/HomePage';
import TestPage from '../pages/TestPage';

const Stack = createStackNavigator();
const Header: StackNavigationOptions = {
  title: '소희님 다이어트 1일차',
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleVisible: false,
};
export default function HomeNav() {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={Header}>
      <Stack.Screen name="home" component={HomePage} />
      <Stack.Screen
        name="test"
        // options={{headerShown: false}}
        component={TestPage}
      />
      {/*
        냉장고 페이지 라우터 설정
        <Stack.Screen name="refrigerator" options={{headerShown: false}} component={RefrigeratorPage} />

        레시피 추천목록 페이지 라우터 설정
        <Stack.Screen name="recipeList" component={RecipeListPage} />

        나를 위한 레시피 라우터 설정
        <Stack.Screen name="recommend" component={RecommendPage} />

        인기 레시피 라우터 설정
        <Stack.Screen name="hot" component={HotPage} />
      */}
    </Stack.Navigator>
  );
}
