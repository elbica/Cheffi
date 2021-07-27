/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './assets/styles/theme';
import IntroNav from './navigators/IntroNav';

import MainNav from './navigators/MainNav';

const App: () => JSX.Element = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    ///유저 로그인 처리
    //async storage에 토큰 저장되어 있으면 login true
    //없을 경우 IntroNav로 이동해 회원가입/로그인 처리
  }, []);

  return (
    // <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        {Platform.OS === 'android' ? (
          <StatusBar translucent backgroundColor="transparent" />
        ) : null}
        {login ? <MainNav /> : <IntroNav setLogin={setLogin} />}
      </ThemeProvider>
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default App;
