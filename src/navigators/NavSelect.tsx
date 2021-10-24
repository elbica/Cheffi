import React, { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../assets/styles/theme';
import IntroNav from './IntroNav';
import MainNav from './MainNav';
import { useIsLogin } from '../hooks/useRedux';
import { AbsoluteProgressBar } from '../components/elements/Indicators';

const NavSelect: () => JSX.Element = () => {
  const { isLogin } = useIsLogin();
  const [isLoading, setIsLoding] = useState(true);
  useEffect(() => {
    setIsLoding(true);
    setTimeout(() => setIsLoding(false), isLogin ? 3000 : 1500);
  }, [isLogin]);
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
      {isLoading && <AbsoluteProgressBar />}
    </ThemeProvider>
  );
};

export default NavSelect;
