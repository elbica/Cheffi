import React from 'react';
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import StackNavFactory from './StackNavFactory';
import { TabScreenDataProps } from './Interface';
import { Image, Platform } from 'react-native';
import { icons } from '../assets/icons/icons';
import { useRecipeList } from '../hooks/useAxios';

const Tabs = createBottomTabNavigator();
const tabBarOption: BottomTabBarOptions = {
  activeTintColor: '#ff9140',
  safeAreaInsets: { bottom: Platform.OS === 'ios' ? 34 : 6 },
  style: {
    height: Platform.OS === 'ios' ? 88 : 62,
  },
  labelStyle: {
    fontSize: 12,
    textAlign: 'justify',
  },
};
const tabScreenData: TabScreenDataProps[] = [
  { name: '내 냉장고', screenName: 'refrigerator', iconName: 'refrigerator' },
  { name: '내 레시피', screenName: 'myRecipe', iconName: 'myRecipe' },
  { name: '홈', screenName: 'home', iconName: 'home' },
  { name: '추천레시피', screenName: 'recommend', iconName: 'recommend' },
  { name: '마이페이지', screenName: 'profile', iconName: 'profile' },
];

export default function MainNav() {
  useRecipeList();

  return (
    <Tabs.Navigator tabBarOptions={tabBarOption} initialRouteName="홈">
      {tabScreenData.map((tabData, idx) => (
        <Tabs.Screen
          key={idx}
          name={tabData.name}
          options={{
            tabBarIcon: ({ focused }) => {
              const source = focused
                ? icons[tabData.iconName].active
                : icons[tabData.iconName].default;
              return (
                <Image
                  source={source}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ height: 28 }}
                  resizeMode="contain"
                />
              );
            },
          }}
          children={() => <StackNavFactory screenName={tabData.screenName} />}
        />
      ))}
    </Tabs.Navigator>
  );
}
