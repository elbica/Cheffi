import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../assets/styles/theme';
import IntroNav from './IntroNav';
import MainNav from './MainNav';
import { useIsLogin } from '../hooks/useRedux';

const NavSelect: () => JSX.Element = () => {
  const { isLogin } = useIsLogin();
  return (
    <ThemeProvider theme={theme}>
      {Platform.OS === 'android' ? (
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
      ) : null}
      {isLogin ? <MainNav /> : <IntroNav />}
    </ThemeProvider>
  );
};

export default NavSelect;
