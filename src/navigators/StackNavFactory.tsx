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
import styled from 'styled-components/native';
import { isAndroid, vh } from '../assets/styles/theme';
import RecipeInfoPage from '../pages/RecipeInfoPage';
import { PrevArrow } from '../components/elements/Images';
import { AddIngredientPage } from '../pages/AddIngredientPage';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import HistoryRecipePage from '../pages/HistoryRecipePage';

const tabHiddenRoutes = ['addIngredient', 'recipeInfo'];
const Stack = createStackNavigator();
const Header: StackNavigationOptions = {
  title: 'Cheffi',
  headerTransparent: true,
  headerBackground: () => <CustomStackHeader />,
  headerStyle: {
    height: isAndroid ? 12 * vh : Math.min(12.5 * vh, 110),
  },
  headerBackImage: () => <PrevArrow />,
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 1.3,
    paddingBottom: 5,
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
        <Stack.Screen
          name={'myRecipe'}
          component={MyRecipePage}
          options={{
            headerBackground: undefined,
            headerTitleStyle: { color: 'black', fontSize: 22 },
            headerTitle: '??? ?????????',
          }}
        />
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
        <>
          <Stack.Screen
            name={'profile'}
            component={ProfilePage}
            options={{
              headerBackground: undefined,
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name={'myRecipe'}
            component={MyRecipePage}
            options={{
              headerBackground: undefined,
              headerTitleStyle: { color: 'black', fontSize: 22 },
              headerTitle: '??? ?????????',
            }}
          />
          <Stack.Screen
            name={'history'}
            component={HistoryRecipePage}
            options={{
              headerBackground: undefined,
              headerTitleStyle: { color: 'black', fontSize: 22 },
              headerTitle: '?????? ??????',
            }}
          />
        </>
      ) : null}
      <Stack.Screen
        name={'refrigerator'}
        component={RefrigerPage}
        options={{
          headerBackground: undefined,
          headerTitleStyle: { color: 'black', fontSize: 22 },
          headerTitle: '??? ?????????',
        }}
      />
      <Stack.Screen
        name={'recipeInfo'}
        component={RecipeInfoPage}
        options={{
          headerBackground: undefined,
          headerTitleStyle: { color: 'transparent' },
        }}
      />
      <Stack.Screen
        name={'addIngredient'}
        component={AddIngredientPage}
        options={{
          headerBackground: () => (
            <CustomBorderRadiusHeader pointerEvents="none" />
          ),
          headerTitleStyle: { color: 'black', fontSize: 22 },
          headerTitle: '?????? ??????',
        }}
      />
    </Stack.Navigator>
  );
}

const CustomStackHeader = styled.View`
  background-color: #ff9140;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  flex: 1;
`;

const CustomBorderRadiusHeader = styled.View`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: white;
  flex: 1;
`;
