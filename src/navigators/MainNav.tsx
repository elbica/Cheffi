import React from 'react';
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import StackNavFactory from './StackNavFactory';
import { TabScreenDataProps } from './Interface';
import { Image } from 'react-native';
import { icons } from '../assets/icons/icons';
import { isAndroid, theme } from '../assets/styles/theme';
import { StackActions } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const Tabs = createBottomTabNavigator();
const tabBarOption: BottomTabBarOptions = {
  activeTintColor: '#ff9140',
  safeAreaInsets: { bottom: isAndroid || !isIphoneX() ? 6 : 28 },
  style: {
    height: isAndroid || !isIphoneX() ? 62 : 80,
    position: 'absolute',
  },
  labelStyle: {
    fontSize: 12,
    textAlign: 'justify',
  },
  keyboardHidesTabBar: true,
};
const tabScreenData: TabScreenDataProps[] = [
  { name: '내 냉장고', screenName: 'refrigerator', iconName: 'refrigerator' },
  { name: '내 레시피', screenName: 'myRecipe', iconName: 'myRecipe' },
  { name: '홈', screenName: 'home', iconName: 'home' },
  { name: '추천레시피', screenName: 'recommend', iconName: 'recommend' },
  { name: '마이페이지', screenName: 'profile', iconName: 'profile' },
];
const resetHomeStackOnTabPress = ({
  navigation,
}: {
  navigation: ProfileTabProp;
}) => ({
  tabPress: (e: any) => {
    const state = navigation.getState();

    if (state) {
      // Grab all the tabs that are NOT the one we just pressed
      const nonTargetTabs = state.routes.filter(r => r.key !== e.target);

      nonTargetTabs.forEach(tab => {
        // Find the tab we want to reset and grab the key of the nested stack
        const stackKey = tab?.state?.key;
        if (stackKey) {
          // Pass the stack key that we want to reset and use popToTop to reset it
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: stackKey,
          });
        }
      });
    }
  },
});

export default function MainNav() {
  return (
    <Tabs.Navigator tabBarOptions={tabBarOption} initialRouteName="홈">
      {tabScreenData.map((tabData, idx) => (
        <Tabs.Screen
          key={idx}
          name={tabData.name}
          listeners={resetHomeStackOnTabPress}
          options={{
            tabBarIcon: ({ focused }) => {
              const source = focused
                ? icons[tabData.iconName].active
                : icons[tabData.iconName].default;
              return (
                <Image
                  source={source}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    height: 28,
                    ...(!focused &&
                      (tabData.iconName === 'home' ||
                        tabData.iconName === 'myRecipe') && {
                        tintColor: theme.color.tableGray,
                      }),
                  }}
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
