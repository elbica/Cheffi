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
import { AddIngredientPage } from '../pages/AddIngredientPage';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const tabHiddenRoutes = ['addIngredient', 'recipeInfo'];
const Stack = createStackNavigator();
const Header: StackNavigationOptions = {
  title: 'Cheffi',
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
    fontSize: 26,
    letterSpacing: 1.3,
  },
  headerBackTitleVisible: false,
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
};

export default function StackNavFactory({
  screenName,
}: StackNavFactoryScreenName) {
  const navigation = useNavigation();
  const route = useRoute();
  React.useLayoutEffect(() => {
    if (
      tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route) as string)
    ) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

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
      <Stack.Screen
        name={'refrigerator'}
        component={RefrigerPage}
        options={{
          headerBackground: undefined,
          headerTitleStyle: { color: 'black', fontSize: 22 },
          headerTitle: '내 냉장고',
          // headerLeft: () => <PrevArrow />,
          // headerRight: () => <Plus />,
        }}
      />
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
      <Stack.Screen
        name={'addIngredient'}
        component={AddIngredientPage}
        options={{
          headerBackground: undefined,
          headerTitleStyle: { color: 'black', fontSize: 22 },
          headerTitle: '재료 추가',
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
