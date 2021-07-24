/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import styled, {css, ThemeProvider} from 'styled-components/native';
// import {theme} from './assets/styles/theme';
import HomeNav from './navigators/HomeNav';

const App: () => JSX.Element = () => {
  return (
    <NavigationContainer>
      <HomeNav />
    </NavigationContainer>
  );
};

export default App;
