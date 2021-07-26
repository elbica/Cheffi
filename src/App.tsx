/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';

import MainNav from './navigators/MainNav';

const App: () => JSX.Element = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      {Platform.OS === 'android' ? (
        <StatusBar translucent backgroundColor="transparent" />
      ) : null}
      <MainNav />
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default App;
